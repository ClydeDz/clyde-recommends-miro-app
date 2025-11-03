import React, { useEffect, useState } from "react";
import {
  MainContainer,
  ChatContainer,
  TypingIndicator,
  MessageList,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { CHAT_TYPE } from "../../const/messages";
import { processBotReplies } from "../../engine/messageProcessor";
import { Text } from "../../messageTypes/Text/Text";
import { Recommendation } from "../../messageTypes/Recommendation/Recommendation";
import { BOT_NAME, FEEDBACK_FORM_URL, ISSUE_URL } from "../../const/app";
import { Actions } from "../../messageTypes/Actions/Actions";
import { Spacer } from "../../messageTypes/Spacer/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerms } from "../../redux/searchSlice";
import {
  constructUserReply,
  processRepliesWithDelay,
} from "../../engine/replyProcessor";
import { setFeedbackGiven, setIsBotLoading } from "../../redux/appSlice";
import {
  sendExternalLinkClickedEvent,
  sendFeedbackEvent,
  sendQuickActionClickedEvent,
} from "../../api/mixpanel";

export const Chat = (props) => {
  const { conversations, setConversations, activateTimer } = props;
  const dispatch = useDispatch();
  const { isBotLoading, feedbackGiven, isThirdPartyOffline } = useSelector(
    (state) => state.app
  );
  const recommendedTemplate = useSelector(
    (state) => state.recommendation.recommendedTemplate
  );
  const { searchKeywords, searchTerms } = useSelector((state) => state.search);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [conversations]);

  const onSendButtonClick = async (userMessage) => {
    dispatch(setIsBotLoading(true));
    dispatch(setSearchTerms(userMessage));
    dispatch(setFeedbackGiven(false));
    setChatInput("");

    setConversations((oldArray) => [
      ...oldArray,
      { ...constructUserReply(userMessage) },
    ]);

    const botReplies = await processBotReplies(userMessage, dispatch, {
      isThirdPartyOffline,
    });
    await processRepliesWithDelay(botReplies, setConversations, dispatch);

    botReplies && botReplies.length > 0 && activateTimer();
  };

  const onReactionRegistered = async (reactionClicked, id) => {
    const newConversations = conversations.map((conversation) => {
      if (
        conversation.type === CHAT_TYPE.ACTIONS &&
        conversation.reactions &&
        conversation.reactions.id === id
      ) {
        return {
          ...conversation,
          reactions: {
            ...conversation.reactions,
            selected: reactionClicked,
          },
        };
      }
      return conversation;
    });
    setConversations(newConversations);

    dispatch(setFeedbackGiven(true));
    sendFeedbackEvent({
      ["Reaction"]: reactionClicked,
      ["Template id"]: recommendedTemplate.id,
      ["Template title"]: recommendedTemplate.title,
      ["Template url"]: recommendedTemplate.url,
      ["Search terms"]: searchTerms,
      ["Search keywords"]: searchKeywords,
    });

    if (feedbackGiven) return;

    const botReplies = await processBotReplies(reactionClicked, dispatch, {
      isThirdPartyOffline,
    });
    await processRepliesWithDelay(botReplies, setConversations, dispatch);

    botReplies && botReplies.length > 0 && activateTimer();
  };

  const onQuickActionClicked = (actionButtonText) => {
    sendQuickActionClickedEvent({
      ["Quick action button"]: actionButtonText,
    });
    onSendButtonClick(actionButtonText);
  };

  return (
    <>
      <div className="grid wrapper">
        <div className="cs1 ce12">
          <MainContainer style={{ height: "100%" }}>
            <ChatContainer>
              <MessageList
                scrollBehavior="auto"
                autoScrollToBottom={true}
                typingIndicator={
                  isBotLoading && (
                    <TypingIndicator content={`${BOT_NAME} is typing`} />
                  )
                }
              >
                {conversations.map((conversation, index) => [
                  conversation.type === CHAT_TYPE.TEXT && (
                    <Text
                      message={conversation}
                      index={index}
                      key={index}
                      nextMessage={
                        conversations[index + 1]
                          ? conversations[index + 1]
                          : undefined
                      }
                    />
                  ),
                  conversation.type === CHAT_TYPE.ACTIONS && (
                    <Actions
                      message={conversation}
                      index={index}
                      key={index}
                      nextMessage={
                        conversations[index + 1]
                          ? conversations[index + 1]
                          : undefined
                      }
                      onActionBtnClicked={onQuickActionClicked}
                      onReactionRegistered={onReactionRegistered}
                    />
                  ),
                  conversation.type === CHAT_TYPE.RECOMMENDATION && (
                    <Recommendation
                      message={conversation}
                      index={index}
                      key={index}
                      nextMessage={
                        conversations[index + 1]
                          ? conversations[index + 1]
                          : undefined
                      }
                    />
                  ),
                  conversation.type === CHAT_TYPE.SPACER && <Spacer />,
                ])}
              </MessageList>
              <MessageInput
                placeholder={`Type your message here`}
                attachButton={false}
                onSend={onSendButtonClick}
                disabled={isBotLoading}
                autoFocus={true}
                tabIndex={0}
                activateAfterChange={true}
                value={chatInput}
                onChange={setChatInput}
                onPaste={(e) => {
                  e.preventDefault();
                  const sanitisedText = e.clipboardData
                    .getData("text/plain")
                    .replace(/<[^>]*>/g, "")
                    .replace(/&nbsp;/g, " ")
                    .replace(/\s+/g, " ")
                    .replace(/&[^;]+;/g, "")
                    .trim();

                  setChatInput(sanitisedText);
                }}
              />
            </ChatContainer>
          </MainContainer>
        </div>
        <footer className="cs1 ce12">
          <a
            class="link link-primary"
            href={ISSUE_URL}
            target="_blank"
            onClick={() => sendExternalLinkClickedEvent({ website: ISSUE_URL })}
          >
            Report an issue
          </a>
          <a
            class="link link-primary"
            href={FEEDBACK_FORM_URL}
            target="_blank"
            onClick={() =>
              sendExternalLinkClickedEvent({ website: FEEDBACK_FORM_URL })
            }
          >
            Submit feedback
          </a>
        </footer>
      </div>
    </>
  );
};

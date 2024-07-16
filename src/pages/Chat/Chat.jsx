import React, { useEffect } from "react";
import {
  MainContainer,
  ChatContainer,
  TypingIndicator,
  MessageList,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { CHAT_TYPE } from "../../const/messages";
import {
  processBotReplies,
  processUserMessage,
} from "../../engine/messageProcessor";
import { Text } from "../../messageTypes/Text/Text";
import { Recommendation } from "../../messageTypes/Recommendation/Recommendation";
import { BOT_NAME } from "../../const/app";
import { Actions } from "../../messageTypes/Actions/Actions";
import { Spacer } from "../../messageTypes/Spacer/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerms } from "../../redux/searchSlice";
import { processRepliesWithDelay } from "../../engine/replyProcessor";
import { setIsBotLoading } from "../../redux/appSlice";

export const Chat = (props) => {
  const { conversations, setConversations, activateTimer } = props;
  const dispatch = useDispatch();
  const isBotLoading = useSelector((state) => state.app.isBotLoading);

  useEffect(() => {
    window.scrollTo(0, document.body.scrollHeight);
  }, [conversations]);

  const onSendButtonClick = async (userMessage, silentUserMessage = false) => {
    dispatch(setIsBotLoading(true));
    !silentUserMessage && dispatch(setSearchTerms(userMessage));

    !silentUserMessage &&
      setConversations((oldArray) => [
        ...oldArray,
        { ...processUserMessage(userMessage) },
      ]);

    const botReplies = processBotReplies(userMessage, dispatch);
    await processRepliesWithDelay(botReplies, setConversations, dispatch);

    botReplies && botReplies.length > 0 && activateTimer();
  };

  const onFeedbackRegistered = async (feedbackOptionClicked, id) => {
    const newConversations = conversations.map((conversation) => {
      if (
        conversation.type === CHAT_TYPE.ACTIONS &&
        conversation.feedback &&
        conversation.feedback.id === id
      ) {
        return {
          ...conversation,
          feedback: {
            ...conversation.feedback,
            selected: feedbackOptionClicked,
          },
        };
      }
      return conversation;
    });
    setConversations(newConversations);

    const botReplies = processBotReplies(feedbackOptionClicked, dispatch);
    await processRepliesWithDelay(botReplies, setConversations, dispatch);

    botReplies && botReplies.length > 0 && activateTimer();
  };

  return (
    <>
      <div className="grid wrapper full-height">
        <div className="cs1 ce12 full-height">
          <MainContainer style={{ height: "100%" }}>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  isBotLoading && (
                    <TypingIndicator content={`${BOT_NAME} is typing`} />
                  )
                }
              >
                {conversations.map((convo, index) => [
                  convo.type === CHAT_TYPE.TEXT && (
                    <Text
                      message={convo}
                      index={index}
                      key={index}
                      nextMessage={
                        conversations[index + 1]
                          ? conversations[index + 1]
                          : undefined
                      }
                    />
                  ),
                  convo.type === CHAT_TYPE.ACTIONS && (
                    <Actions
                      message={convo}
                      index={index}
                      key={index}
                      nextMessage={
                        conversations[index + 1]
                          ? conversations[index + 1]
                          : undefined
                      }
                      onSendButtonClick={onSendButtonClick}
                      onFeedbackRegistered={onFeedbackRegistered}
                    />
                  ),
                  convo.type === CHAT_TYPE.RECOMMENDATION && (
                    <Recommendation
                      message={convo}
                      index={index}
                      key={index}
                      nextMessage={
                        conversations[index + 1]
                          ? conversations[index + 1]
                          : undefined
                      }
                    />
                  ),
                  convo.type === CHAT_TYPE.SPACER && <Spacer />,
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
              />
            </ChatContainer>
          </MainContainer>
        </div>
      </div>
    </>
  );
};

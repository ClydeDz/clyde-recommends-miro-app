import React from "react";
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

  const onSendButtonClick = async (userMessage) => {
    dispatch(setIsBotLoading(true));
    dispatch(setSearchTerms(userMessage));

    setConversations((oldArray) => [
      ...oldArray,
      { ...processUserMessage(userMessage) },
    ]);

    const botReplies = processBotReplies(userMessage, dispatch);
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

import * as React from "react";
import {
  MainContainer,
  ChatContainer,
  TypingIndicator,
  MessageList,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { CHAT_TYPE, initialChatConversations } from "../../const/messages";
import {
  generatedIdleChatConversations,
  processBotReply,
  processUserMessage,
} from "../../engine/messageProcessor";
import { Text } from "../../messageTypes/Text/Text";
import { getUserInfo } from "../../api/api";
import { Recommendation } from "../../messageTypes/Recommendation/Recommendation";
import { BOT_IDLE_TIMEOUT, BOT_NAME } from "../../const/app";
import { Actions } from "../../messageTypes/Actions/Actions";
import { useIdleTimer } from "react-idle-timer";
import { Spacer } from "../../messageTypes/Spacer/Spacer";
import { useDispatch, useSelector } from "react-redux";
import { increment } from "../../redux/counterSlice";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const Chat = () => {
  const [conversation, setConversation] = React.useState(
    initialChatConversations
  );
  const [isBotLoading, setIsBotLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState();
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const onIdle = () => {
    console.log("on idle", count);
    const botReplies = generatedIdleChatConversations();
    processRepliesWithDelay(botReplies);
  };

  const idleTimer = useIdleTimer({
    onIdle,
    timeout: BOT_IDLE_TIMEOUT,
    stopOnIdle: true,
  });

  React.useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);

  const processRepliesWithDelay = async (botReplies) => {
    await delay(500);

    for (let index = 0; index < botReplies.length; index++) {
      const reply = botReplies[index];

      setIsBotLoading(true);
      await delay(index * 500);

      setIsBotLoading(true);
      await delay(200);

      setConversation((oldArray) => [...oldArray, { ...reply }]);
      setIsBotLoading(false);
    }

    setIsBotLoading(false);
  };

  const onSendButtonClick = (value) => {
    setIsBotLoading(true);
    dispatch(increment());

    setConversation((oldArray) => [
      ...oldArray,
      { ...processUserMessage(value) },
    ]);

    const botReplies = processBotReply(value);
    processRepliesWithDelay(botReplies);
    botReplies && botReplies.length > 0 && idleTimer.start();
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
                {conversation.map((convo, index) => [
                  convo.type === CHAT_TYPE.TEXT && (
                    <Text
                      message={convo}
                      index={index}
                      key={index}
                      nextMessage={
                        conversation[index + 1]
                          ? conversation[index + 1]
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
                        conversation[index + 1]
                          ? conversation[index + 1]
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
                        conversation[index + 1]
                          ? conversation[index + 1]
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

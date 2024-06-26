import * as React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import {
  MainContainer,
  ChatContainer,
  TypingIndicator,
  MessageList,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { CHAT_TYPE, initialChatConversations } from "./const/messages";
import { processBotReply, processUserMessage } from "./engine/messageProcessor";
import { Text } from "./messageTypes/Text/Text";
import { getUserInfo } from "./api/api";
import { Recommendation } from "./messageTypes/Recommendation/Recommendation";
import { BOT_NAME } from "./const/app";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const App = () => {
  const [conversation, setConversation] = React.useState(
    initialChatConversations
  );
  const [isBotLoading, setIsBotLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState();

  React.useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);

  const onSendButtonClick = (value) => {
    setIsBotLoading(true);

    setConversation((oldArray) => [
      ...oldArray,
      { ...processUserMessage(value) },
    ]);

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

    const botReplies = processBotReply(value);
    processRepliesWithDelay(botReplies);
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
                ])}
              </MessageList>
              <MessageInput
                placeholder="Type message here"
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

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

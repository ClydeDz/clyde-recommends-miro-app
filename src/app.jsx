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
import { CHAT_TYPE, chatConversations } from "./messages";
import { processBotReply, processUserMessage } from "./engine/messageProcessor";
import { TextMessage } from "./messageTypes/TextMessage/TextMessage";
import { WelcomeMessage } from "./messageTypes/WelcomeMessage/WelcomeMessage";
import { getUserInfo } from "./api/api";

const App = () => {
  const [conversation, setConversation] = React.useState(chatConversations);
  const [isBotLoading, setIsBotLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState();

  React.useEffect(() => {
    getUserInfo(setUserInfo);
  }, []);

  const onSendButtonClick = (value) => {
    setConversation((oldArray) => [
      ...oldArray,
      { ...processUserMessage(value) },
    ]);

    const botReplies = processBotReply(value);

    setIsBotLoading(true);

    setTimeout(() => {
      botReplies.forEach((reply, index) => {
        setTimeout(function () {
          setIsBotLoading(true);

          setTimeout(() => {
            setConversation((oldArray) => [...oldArray, { ...reply }]);
            setIsBotLoading(false);
          }, 200);
        }, index * 1500);
      });
    }, 500);
  };

  return (
    <>
      <div className="grid wrapper">
        <div className="cs1 ce12">
          <MainContainer style={{ maxHeight: "80%" }}>
            <ChatContainer>
              <MessageList
                typingIndicator={
                  isBotLoading && (
                    <TypingIndicator content={`Clyde is typing`} />
                  )
                }
              >
                {conversation.map((convo, index) => [
                  convo.type === CHAT_TYPE.TEXT && (
                    <TextMessage
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
                  convo.type === CHAT_TYPE.WELCOME && (
                    <WelcomeMessage
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

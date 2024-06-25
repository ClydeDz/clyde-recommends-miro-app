import * as React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import {
  MainContainer,
  ChatContainer,
  TypingIndicator,
  MessageList,
  Avatar,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM, CHAT_TYPE, chatConversations } from "./messages";
import { processBotReply, processUserMessage } from "./engine/messageProcessor";
import { Welcome } from "./components/Welcome/Welcome";

const TextMessage = (props) => {
  const { message, nextMessage, index } = props;
  const isConsecutive = nextMessage && nextMessage.from == message.from;

  return (
    <Message
      key={index}
      model={{
        type: "text",
        message: message.contents,
        sentTime: message.timestamp,
        sender: message.from,
        direction: message.from === CHAT_FROM.BOT ? "incoming" : "outgoing",
        position: !isConsecutive ? "single" : "first",
      }}
      children={
        message.from === CHAT_FROM.BOT &&
        !isConsecutive && <Avatar src="/src/assets/clyde.jpg" name="Clyde" />
      }
      avatarSpacer={message.from === CHAT_FROM.BOT && isConsecutive}
    ></Message>
  );
};

const WelcomeMessage = (props) => {
  const { message, nextMessage, index } = props;
  const isConsecutive = nextMessage && nextMessage.from == message.from;

  return (
    <Message
      key={index}
      model={{
        type: "custom",
        direction: message.from === CHAT_FROM.BOT ? "incoming" : "outgoing",
      }}
      avatarSpacer={message.from === CHAT_FROM.BOT && isConsecutive}
    >
      <Message.CustomContent>
        <Welcome />
      </Message.CustomContent>
    </Message>
  );
};

const App = () => {
  const [conversation, setConversation] = React.useState(chatConversations);
  const [isBotLoading, setIsBotLoading] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState();

  async function getInfo() {
    const userInfo = await miro.board.getUserInfo();
    setUserInfo(userInfo.name);
  }

  React.useEffect(() => {
    getInfo();
  }, []);

  const onSendButtonClick = (value) => {
    setConversation((oldArray) => [
      ...oldArray,
      { ...processUserMessage(value) },
    ]);

    setIsBotLoading(true);
    setTimeout(() => {
      const reply = processBotReply();
      setConversation((oldArray) => [...oldArray, { ...reply }]);
      setIsBotLoading(false);
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

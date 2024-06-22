import * as React from "react";
import { createRoot } from "react-dom/client";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import "../src/assets/style.css";
import {
  MainContainer,
  ChatContainer,
  TypingIndicator,
  MessageSeparator,
  MessageList,
  Avatar,
  Message,
  MessageInput,
} from "@chatscope/chat-ui-kit-react";

const messages = [
  {
    type: "separator",
    props: {
      content: "Saturday, 30 November 2019",
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "single",
      },
      children: <Avatar src="/src/assets/congratulations.png" name="Eliot" />,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "single",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "first",
      },
      avatarSpacer: true,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "normal",
      },
      avatarSpacer: true,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "normal",
      },
      avatarSpacer: false,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "last",
      },
      children: <Avatar src={"/src/assets/congratulations.png"} name="Eliot" />,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "first",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "normal",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "normal",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "outgoing",
        position: "last",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "first",
      },
      avatarSpacer: true,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "last",
      },
      children: <Avatar src={"/src/assets/congratulations.png"} name="Eliot" />,
    },
  },
  {
    type: "separator",
    props: {
      content: "Saturday, 31 November 2019",
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "single",
      },
      children: <Avatar src={"/src/assets/congratulations.png"} name="Eliot" />,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "single",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "first",
      },
      avatarSpacer: true,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "normal",
      },
      avatarSpacer: true,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "normal",
      },
      avatarSpacer: true,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "last",
      },
      children: <Avatar src={"/src/assets/congratulations.png"} name="Eliot" />,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "first",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "normal",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Zoe",
        direction: "outgoing",
        position: "normal",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "outgoing",
        position: "last",
      },
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
        position: "first",
      },
      avatarSpacer: true,
    },
  },
  {
    props: {
      model: {
        message: "Hello my friend",
        sentTime: "15 mins ago",
        sender: "Eliot",
        direction: "incoming",
      },
      children: <Avatar src={"/src/assets/congratulations.png"} name="Eliot" />,
    },
  },
];

async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: "Hello, World!",
  });

  await miro.board.viewport.zoomTo(stickyNote);
}

const App = () => {
  const [userInfo, setUserInfo] = React.useState();
  async function getInfo() {
    const userInfo = await miro.board.getUserInfo();
    setUserInfo(userInfo.name);
  }

  React.useEffect(() => {
    getInfo();
  }, []);

  return (
    <>
      <div className="grid wrapper">
        {/* <div className="cs1 ce12">
          <p>ehfuwheifh</p>
        </div> */}
        <div className="cs1 ce12">
          <MainContainer>
            <ChatContainer>
              <MessageList
                style={{ height: "500px" }}
                typingIndicator={
                  <TypingIndicator content={`${userInfo} is typing`} />
                }
              >
                {messages.map((m, i) =>
                  m.type === "separator" ? (
                    <MessageSeparator key={i} {...m.props} />
                  ) : (
                    <Message key={i} {...m.props}>
                      {" "}
                      <Message.Footer
                        content="Youu"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        You
                      </Message.Footer>
                    </Message>
                  )
                )}
              </MessageList>
              <MessageInput placeholder="Type message here" />
            </ChatContainer>
          </MainContainer>
          {/* <MainContainer>
            <ChatContainer>
              <MessageList>
                <Message
                  model={{
                    message: "Hello my friend",
                    sentTime: "just now",
                    sender: "Joe",
                  }}
                />
              </MessageList>
              <MessageInput placeholder="Type message here" />
            </ChatContainer>
          </MainContainer> */}
        </div>
      </div>
    </>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

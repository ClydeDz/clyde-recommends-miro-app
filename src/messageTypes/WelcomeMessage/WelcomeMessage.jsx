import * as React from "react";
import { Message } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM } from "../../messages";

export const WelcomeMessage = (props) => {
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
        <img src="/src/assets/welcome.png" />
      </Message.CustomContent>
    </Message>
  );
};

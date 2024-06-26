import * as React from "react";
import { Avatar, Message } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM } from "../../const/messages";
import { BOT_AVATAR_URL, BOT_NAME } from "../../const/app";

export const Text = (props) => {
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
        !isConsecutive && <Avatar src={BOT_AVATAR_URL} name={BOT_NAME} />
      }
      avatarSpacer={message.from === CHAT_FROM.BOT && isConsecutive}
    ></Message>
  );
};

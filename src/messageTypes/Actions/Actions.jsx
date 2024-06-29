import * as React from "react";
import { Message, Avatar, Button } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM } from "../../const/messages";
import { BOT_AVATAR_URL, BOT_NAME } from "../../const/app";

export const Actions = (props) => {
  const { message, nextMessage, index, onSendButtonClick } = props;
  const isConsecutive = nextMessage && nextMessage.from == message.from;

  return (
    <Message
      key={index}
      model={{
        type: "custom",
        sentTime: message.timestamp,
        sender: message.from,
        direction: message.from === CHAT_FROM.BOT ? "incoming" : "outgoing",
      }}
      children={
        message.from === CHAT_FROM.BOT &&
        isConsecutive && <Avatar src={BOT_AVATAR_URL} name={BOT_NAME} />
      }
      avatarSpacer={true}
    >
      <Message.CustomContent>
        <div className="actions-template">
          {message.actions.map((action) => (
            <Button border onClick={() => onSendButtonClick(action)}>
              {action}
            </Button>
          ))}
        </div>
      </Message.CustomContent>
    </Message>
  );
};

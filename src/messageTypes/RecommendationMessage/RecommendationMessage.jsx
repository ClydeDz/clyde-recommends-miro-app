import * as React from "react";
import { Message, Avatar } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM } from "../../messages";

export const RecommendationMessage = (props) => {
  const { message, nextMessage, index } = props;
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
        !isConsecutive && <Avatar src="/src/assets/clyde.jpg" name="Clyde" />
      }
      avatarSpacer={true}
    >
      <Message.CustomContent>
        <div className="recommendation-template">
          <img src={`/src/assets/templates/${message.template.id}.png`} />
          <div>{message.template.title}</div>
          <div>{message.template.description}</div>
          <a
            href={message.template.url}
            target="_blank"
            class="button button-primary button-small"
          >
            Check it out
          </a>
        </div>
      </Message.CustomContent>
    </Message>
  );
};

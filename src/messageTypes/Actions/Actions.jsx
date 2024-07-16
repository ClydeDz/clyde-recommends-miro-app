import * as React from "react";
import { Message, Avatar, Button } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM, CHAT_TYPE } from "../../const/messages";
import { BOT_AVATAR_URL, BOT_NAME } from "../../const/app";
import { MessagePills } from "./MessagePills/MessagePills";
import { ExternalLink } from "./ExternalLink/ExternalLink";
import { Feedback } from "./Feedback/Feedback";

export const Actions = (props) => {
  const {
    message,
    nextMessage,
    index,
    onSendButtonClick,
    onFeedbackRegistered,
  } = props;
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
        {message.actions && (
          <MessagePills
            message={message}
            onSendButtonClick={onSendButtonClick}
          />
        )}
        {message.feedback && (
          <Feedback
            id={message.feedback.id}
            buttons={message.feedback.buttons}
            selected={message.feedback.selected}
            onFeedbackButtonClick={onFeedbackRegistered}
          />
        )}
        {message.redirect && (
          <ExternalLink
            url={message.redirect.url}
            display={message.redirect.displayText}
          />
        )}
      </Message.CustomContent>
    </Message>
  );
};

import * as React from "react";
import { Message, Avatar } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM } from "../../const/messages";
import { BOT_AVATAR_URL, BOT_NAME } from "../../const/app";
import { QuickActions } from "./QuickActions/QuickActions";
import { ExternalLink } from "./ExternalLink/ExternalLink";
import { Feedback } from "./Feedback/Feedback";

export const Actions = (props) => {
  const {
    message,
    nextMessage,
    index,
    onActionBtnClicked,
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
          <QuickActions
            message={message}
            onActionBtnClicked={onActionBtnClicked}
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
            displayText={message.redirect.displayText}
          />
        )}
      </Message.CustomContent>
    </Message>
  );
};

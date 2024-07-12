import * as React from "react";
import { Message, Avatar, Button } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM, FEEDBACK_OPTIONS } from "../../const/messages";
import { BOT_AVATAR_URL, BOT_NAME } from "../../const/app";

const iconColor = "#4DB6AC";

export const RecommendationFeedback = (props) => {
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
        <div className="recommendation-feedback-template">
          <span
            onClick={() => onSendButtonClick(FEEDBACK_OPTIONS.LIKE, true)}
            className="feedback-btn"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.0629 8H14C14.3031 7.17152 14.4858 6.50485 14.5484 6C14.861 3.47495 13.4484 0.979359 11 0L6.17927 10.6056C6.06113 10.8655 6 11.1477 6 11.4332V21C6 21.5523 6.44772 22 7 22H14C18.4183 22 22 18.4183 22 14C22 11.8755 21.5768 10.1741 20.7305 8.89588C20.3601 8.33644 19.7339 8 19.0629 8ZM8 20V11.4332L11.8173 3.03514C12.5478 3.98319 12.8039 5.26389 12.3997 6.47636L11.2251 10L19.063 10C19.6711 10.9186 20 12.2408 20 14C20 17.3137 17.3137 20 14 20H8Z"
                fill={iconColor}
              />
              <path
                d="M4 22C4.55228 22 5 21.5523 5 21V11C5 10.4477 4.55228 10 4 10C3.44772 10 3 10.4477 3 11V21C3 21.5523 3.44772 22 4 22Z"
                fill={iconColor}
              />
            </svg>
          </span>
          <span
            onClick={() => onSendButtonClick(FEEDBACK_OPTIONS.DISLIKE, true)}
            className="feedback-btn"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M19.0629 16H14C14.3031 16.8285 14.4858 17.4951 14.5484 18C14.861 20.5251 13.4484 23.0206 11 24L6.17927 13.3944C6.06113 13.1345 6 12.8523 6 12.5668V3C6 2.44772 6.44772 2 7 2H14C18.4183 2 22 5.58172 22 10C22 12.1245 21.5768 13.8259 20.7305 15.1041C20.3601 15.6636 19.7339 16 19.0629 16ZM8 4V12.5668L11.8173 20.9649C12.5478 20.0168 12.8039 18.7361 12.3997 17.5236L11.2251 14L19.063 14C19.6711 13.0814 20 11.7592 20 10C20 6.68629 17.3137 4 14 4H8Z"
                fill={iconColor}
              />
              <path
                d="M4 2C4.55228 2 5 2.44772 5 3V13C5 13.5523 4.55228 14 4 14C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z"
                fill={iconColor}
              />
            </svg>
          </span>
        </div>
      </Message.CustomContent>
    </Message>
  );
};

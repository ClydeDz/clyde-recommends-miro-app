import * as React from "react";
import { Message, Avatar } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM } from "../../const/messages";
import { BOT_AVATAR_URL, BOT_NAME } from "../../const/app";
import { sendTemplateVisitedEvent } from "../../api/mixpanel";
import { useSelector } from "react-redux";

export const Recommendation = (props) => {
  const { message, nextMessage, index } = props;
  const { searchTerms, searchKeywords } = useSelector((state) => state.search);
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
        !isConsecutive && <Avatar src={BOT_AVATAR_URL} name={BOT_NAME} />
      }
      avatarSpacer={true}
    >
      <Message.CustomContent>
        <div className="recommendation-template">
          <img src={`/src/assets/templates/${message.template.id}.jpg`} />
          <div>{message.template.title}</div>
          <div>{message.template.description}</div>
          <a
            href={message.template.url}
            onClick={() =>
              sendTemplateVisitedEvent({
                templateId: message.template.id,
                templateTitle: message.template.title,
                templateUrl: message.template.url,
                searchTerms,
                searchKeywords,
              })
            }
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

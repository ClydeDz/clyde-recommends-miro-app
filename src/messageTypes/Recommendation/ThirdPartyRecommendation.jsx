import * as React from "react";
import { Message, Avatar, Button } from "@chatscope/chat-ui-kit-react";
import { CHAT_FROM } from "../../const/messages";
import { BOT_AVATAR_URL, BOT_NAME } from "../../const/app";
import { sendTemplateVisitedEvent } from "../../api/mixpanel";
import { useSelector } from "react-redux";

export const ThirdPartyRecommendation = (props) => {
  const { message, nextMessage, index } = props;
  const { searchTerms, searchKeywords } = useSelector((state) => state.search);
  const isConsecutive = nextMessage && nextMessage.from == message.from;

  const onVisitTemplateBtnClick = () => {
    // sendTemplateVisitedEvent({
    //   ["Template id"]: message.template.id,
    //   ["Template title"]: message.template.title,
    //   ["Template url"]: message.template.url,
    //   ["Search terms"]: searchTerms,
    //   ["Search keywords"]: searchKeywords,
    // });
    //window.open(message.template.url, "_blank");
  };

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
          <h3>{message.template.title}</h3>
          <p>{message.template.description}</p>
          <p>{message.template.url}</p>
          <p>{message.template.plainText}</p>
          <Button onClick={() => onVisitTemplateBtnClick()}>
            Check it out
          </Button>
        </div>
      </Message.CustomContent>
    </Message>
  );
};

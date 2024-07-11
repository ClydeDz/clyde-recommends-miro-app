import {
  sendHelpEvent,
  sendTemplateFoundEvent,
  sendTemplateNotFoundEvent,
} from "../api/mixpanel";
import {
  CHAT_FROM,
  CHAT_TYPE,
  IDLE_PRELOADED_MESSAGES,
  PRECONFIGURED_COMMANDS,
  idleChatConversations,
} from "../const/messages";
import { setRecommendedTemplate } from "../redux/recommendationSlice";
import { setSearchKeywords } from "../redux/searchSlice";
import { processBotStaticReplies } from "./staticMessageProcessor";
import { pickTemplate, recommendTemplates } from "./templateProcessor";
import { removeStopwords } from "stopword";

export const processUserMessage = (userMessage) => {
  return {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.USER,
    timestamp: new Date().toLocaleString(),
    contents: userMessage,
  };
};

export const processBotReplies = (userMessage, dispatch) => {
  const { exit, payload } = processBotStaticReplies(userMessage, dispatch);
  if (exit) {
    return payload;
  }

  const messageExcludingFillers = removeFillerWords(userMessage);
  const keywords = filterKeywords(messageExcludingFillers);
  const templates = recommendTemplates(keywords);
  const templatePicked = pickTemplate(templates);

  dispatch(setSearchKeywords(keywords));

  console.log(messageExcludingFillers);
  console.log(keywords);
  console.log(templates);
  console.log(templatePicked);

  if (!templatePicked) {
    sendTemplateNotFoundEvent({
      ["Search Terms"]: userMessage,
      ["Search Keywords"]: keywords,
    });

    return [
      {
        type: CHAT_TYPE.TEXT,
        from: CHAT_FROM.BOT,
        timestamp: new Date().toLocaleString(),
        contents: `Sorry, I couldn't find a template that matches that criteria. Perhaps try looking up different keywords?`,
      },
    ];
  }

  dispatch(
    setRecommendedTemplate({
      id: templatePicked.id,
      title: templatePicked.title,
      url: templatePicked.url,
    })
  );

  sendTemplateFoundEvent({
    ["Template ID"]: templatePicked.id,
    ["Template Title"]: templatePicked.title,
    ["Template URL"]: templatePicked.url,
    ["Search Terms"]: userMessage,
    ["Search Keywords"]: keywords,
  });

  return [
    {
      type: CHAT_TYPE.TEXT,
      from: CHAT_FROM.BOT,
      timestamp: new Date().toLocaleString(),
      contents: `I've picked this template for you.`,
    },
    {
      type: CHAT_TYPE.RECOMMENDATION,
      from: CHAT_FROM.BOT,
      timestamp: new Date().toLocaleString(),
      template: { ...templatePicked },
    },
  ];
};

export const generateIdleChatConversations = () => {
  return idleChatConversations;
};

const removeFillerWords = (message) => {
  return removeStopwords(message.split(" "));
};

const filterKeywords = (sanitisedMessageArray) => {
  return sanitisedMessageArray.filter((message) => {
    if (!message.includes("template")) return message;
  });
};

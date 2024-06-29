import {
  CHAT_FROM,
  CHAT_TYPE,
  IDLE_PRELOADED_MESSAGES,
  idleChatConversations,
} from "../const/messages";
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

export const processBotReply = (userMessage) => {
  if (userMessage === IDLE_PRELOADED_MESSAGES.HELP_YES) {
    return [
      {
        type: CHAT_TYPE.TEXT,
        from: CHAT_FROM.BOT,
        timestamp: new Date().toLocaleString(),
        contents: `Type in keywords of what Miro template you're looking for. E.g. retrospective`,
      },
    ];
  }

  if (userMessage === IDLE_PRELOADED_MESSAGES.HELP_NO) {
    return [];
  }

  const messageExcludingFillers = removeFillerWords(userMessage);
  const keywords = filterKeywords(messageExcludingFillers);
  const templates = recommendTemplates(keywords);
  const templatePicked = pickTemplate(templates);

  console.log(messageExcludingFillers);
  console.log(keywords);
  console.log(templates);
  console.log(templatePicked);

  if (!templatePicked) {
    return [
      {
        type: CHAT_TYPE.TEXT,
        from: CHAT_FROM.BOT,
        timestamp: new Date().toLocaleString(),
        contents: `Sorry, I couldn't find a template that matches that criteria. Perhaps try looking up different keywords?`,
      },
    ];
  }

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
      contents: `blah blah`,
      template: { ...templatePicked },
    },
  ];
};

export const generatedIdleChatConversations = () => {
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

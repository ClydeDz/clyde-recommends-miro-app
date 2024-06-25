import { CHAT_FROM, CHAT_TYPE } from "../messages";
import { pickTemplate, recommendTemplates } from "./templateProcessor";
import { removeStopwords } from "stopword";

export const processUserMessage = (userMessage) => {
  return {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.USER,
    timestamp: new Date().getDate().toString(),
    contents: userMessage,
  };
};

export const processBotReply = (userMessage) => {
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
        timestamp: new Date().getDate().toString(),
        contents: `Sorry, I couldn't find a template that matches that criteria. Perhaps try looking up different keywords?`,
      },
    ];
  }

  return [
    {
      type: CHAT_TYPE.TEXT,
      from: CHAT_FROM.BOT,
      timestamp: new Date().getDate().toString(),
      contents: `I've picked ${templatePicked.title} for you. Click on ${templatePicked.url} to copy it for your board.`,
    },
    {
      type: CHAT_TYPE.TEXT,
      from: CHAT_FROM.BOT,
      timestamp: new Date().getDate().toString(),
      contents: `Let me know what you think of my recommendation.`,
    },
  ];
};

const removeFillerWords = (message) => {
  return removeStopwords(message.split(" "));
};

const filterKeywords = (sanitisedMessageArray) => {
  return sanitisedMessageArray.filter((message) => {
    if (!message.includes("template")) return message;
  });
};

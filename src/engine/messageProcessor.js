import { CHAT_FROM, CHAT_TYPE } from "../messages";

export const processUserMessage = (message) => {
  return {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.USER,
    timestamp: new Date().getDate().toString(),
    contents: message,
  };
};

export const processBotReply = () => {
  return {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.BOT,
    timestamp: new Date().getDate().toString(),
    contents: "Miro reply",
  };
};

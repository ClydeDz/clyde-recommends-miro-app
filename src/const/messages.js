import { BOT_NAME } from "./app";

export const CHAT_TYPE = {
  TEXT: "text",
  RECOMMENDATION: "recommendation",
};

export const CHAT_FROM = {
  BOT: BOT_NAME,
  USER: "User",
};

export const initialChatConversations = [
  {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.BOT,
    timestamp: new Date().getDate().toString(),
    contents:
      "Hi! Welcome to Clyde Recommends! \n\nFeel free to message me with what kind of templates you're looking for and I can recommend one if I have one for the occasion.",
  },
];

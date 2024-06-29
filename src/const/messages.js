import { BOT_NAME } from "./app";

export const CHAT_TYPE = {
  TEXT: "text",
  RECOMMENDATION: "recommendation",
  ACTIONS: "actions",
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
    contents: "Hi! Welcome to Clyde Recommends!",
  },
  {
    type: CHAT_TYPE.ACTIONS,
    from: CHAT_FROM.BOT,
    timestamp: new Date().getDate().toString(),
    actions: [
      "I want a retrospective template",
      "Recommend an icebreaker",
      "I want to collect feedback",
    ],
  },
];

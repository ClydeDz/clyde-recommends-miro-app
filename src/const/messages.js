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
    timestamp: new Date().toLocaleString(),
    contents:
      "Hi! Welcome to Clyde Recommends!\n\nTry clicking one of the prompts below to get a Miro template recommendation.",
  },
  {
    type: CHAT_TYPE.ACTIONS,
    from: CHAT_FROM.BOT,
    timestamp: new Date().toLocaleString(),
    actions: [
      "Give me a retrospective template",
      "Recommend an icebreaker",
      "I want to collect feedback",
    ],
  },
];

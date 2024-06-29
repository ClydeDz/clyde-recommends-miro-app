import { BOT_NAME } from "./app";

export const CHAT_TYPE = {
  TEXT: "text",
  RECOMMENDATION: "recommendation",
  ACTIONS: "actions",
  SPACER: "spacer",
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

export const IDLE_PRELOADED_MESSAGES = {
  HELP_YES: "Yes, I need help",
  HELP_NO: "No, I'm good",
};

export const idleChatConversations = [
  {
    type: CHAT_TYPE.SPACER,
    from: CHAT_FROM.BOT,
    timestamp: new Date().toLocaleString(),
  },
  {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.BOT,
    timestamp: new Date().toLocaleString(),
    contents: "I noticed you've not interacted in a while. Do you need a hand?",
  },
  {
    type: CHAT_TYPE.ACTIONS,
    from: CHAT_FROM.BOT,
    timestamp: new Date().toLocaleString(),
    actions: [
      IDLE_PRELOADED_MESSAGES.HELP_YES,
      IDLE_PRELOADED_MESSAGES.HELP_NO,
    ],
  },
];

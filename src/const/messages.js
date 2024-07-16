import { BOT_NAME } from "./app";

export const CHAT_TYPE = {
  TEXT: "text",
  RECOMMENDATION: "recommendation",
  RECOMMENDATION_FEEDBACK: "recommendation feedback",
  ACTIONS: "actions",
  ACTIONS_REDIRECT: "ACTIONS_REDIRECT",
  ACTIONS_FEEDBACK: "ACTIONS_FEEDBACK",
  ACTIONS_OPTIONS: "ACTIONS_OPTIONS",
  SPACER: "spacer",
};

export const CHAT_FROM = {
  BOT: BOT_NAME,
  USER: "User",
};

export const FEEDBACK_OPTIONS = {
  LIKE: "Like",
  DISLIKE: "Dislike",
};

export const initialChatConversations = [
  // {
  //   type: CHAT_TYPE.TEXT,
  //   from: CHAT_FROM.BOT,
  //   timestamp: new Date().toLocaleString(),
  //   contents:
  //     "Hi! Welcome to Clyde Recommends!\n\nTry clicking one of the prompts below to get a Miro template recommendation.",
  // },
  {
    type: CHAT_TYPE.RECOMMENDATION,
    from: CHAT_FROM.BOT,
    timestamp: new Date().toLocaleString(),
    template: {
      id: "o9J_l9J6AHY=",
      title: "The Writing Process",
      url: "https://miro.pxf.io/rQ7OQ5",
      description:
        "The writing process can be overwhelming at times. But it doesn't always have to be. To make your life smooth, I've created this all-in-one template that you can copy and fill up.",
    },
  },
  {
    type: CHAT_TYPE.ACTIONS,
    from: CHAT_FROM.BOT,
    timestamp: new Date().toLocaleString(),
    feedback: {
      buttons: [FEEDBACK_OPTIONS.LIKE, FEEDBACK_OPTIONS.DISLIKE],
      id: Math.random(),
      selected: undefined,
    },
  },
  {
    type: CHAT_TYPE.ACTIONS,
    from: CHAT_FROM.BOT,
    timestamp: new Date().toLocaleString(),
    redirect: {
      url: "https://chatscope.io/storybook/react/?path=/docs/components-button--docs",
      displayText: "Survey",
    },
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

export const PRECONFIGURED_COMMANDS = {
  HELP: "Help",
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

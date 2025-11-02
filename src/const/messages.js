import { constructBotReply } from "../engine/replyProcessor";
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

export const REACTIONS = {
  LIKE: "Like",
  DISLIKE: "Dislike",
};

export const CHAT_SOURCE = {
  LOCAL: "Local",
  THIRD_PARTY: "Third party",
};

export const INITIAL_CHAT_CONVERSATIONS = [
  constructBotReply(CHAT_TYPE.TEXT, {
    contents:
      "Hi! Welcome to Clyde Recommends!\n\nClick one of the prompts below to get a recommendation for a Miro template created by me—Clyde.",
  }),
  constructBotReply(CHAT_TYPE.ACTIONS, {
    actions: [
      "Give me a retrospective template",
      "Recommend an icebreaker",
      "I want to collect feedback",
    ],
  }),
];

export const IDLE_PRELOADED_MESSAGES = {
  HELP_YES: "Yes, I need help",
  HELP_NO: "No, I'm good",
};

export const PRECONFIGURED_COMMANDS = {
  HELP: "Help",
};

export const IDLE_CHAT_CONVERSATIONS = [
  constructBotReply(CHAT_TYPE.SPACER, {}),
  constructBotReply(CHAT_TYPE.TEXT, {
    contents: "I noticed you've not interacted in a while. Do you need a hand?",
  }),
  constructBotReply(CHAT_TYPE.ACTIONS, {
    actions: [
      IDLE_PRELOADED_MESSAGES.HELP_YES,
      IDLE_PRELOADED_MESSAGES.HELP_NO,
    ],
  }),
];

import { sendHelpEvent } from "../api/mixpanel";
import {
  CHAT_FROM,
  CHAT_TYPE,
  FEEDBACK_OPTIONS,
  IDLE_PRELOADED_MESSAGES,
  PRECONFIGURED_COMMANDS,
} from "../const/messages";

const isEqualCaseInsensitive = (arg1, arg2) => {
  return arg1.toLowerCase() === arg2.toLowerCase();
};

export const processBotStaticReplies = (userMessage, dispatch) => {
  if (
    isEqualCaseInsensitive(userMessage, IDLE_PRELOADED_MESSAGES.HELP_YES) ||
    isEqualCaseInsensitive(userMessage, PRECONFIGURED_COMMANDS.HELP)
  ) {
    sendHelpEvent({ ["Category"]: "Needs help" });
    // TODO: save preference in state
    return {
      exit: true,
      payload: [
        {
          type: CHAT_TYPE.TEXT,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          contents: `Type in keywords of what Miro template you're looking for. E.g. retrospective`,
        },
      ],
    };
  }

  if (isEqualCaseInsensitive(userMessage, IDLE_PRELOADED_MESSAGES.HELP_NO)) {
    sendHelpEvent({ ["Category"]: "No help" });
    // TODO: save preference in state
    return { exit: true, payload: [] };
  }

  if (
    isEqualCaseInsensitive(userMessage, FEEDBACK_OPTIONS.LIKE) ||
    isEqualCaseInsensitive(userMessage, FEEDBACK_OPTIONS.DISLIKE)
  ) {
    console.log(userMessage);
    // sendHelpEvent({ ["Category"]: "No help" });
    // TODO: save preference in state
    return {
      exit: true,
      payload: [
        {
          type: CHAT_TYPE.TEXT,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          contents: `Thanks for your feedback. Please consider clicking on the survey link below to provide me with some more details.`,
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
      ],
    };
  }

  return { exit: false, payload: null };
};

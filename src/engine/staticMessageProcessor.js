import { sendHelpEvent } from "../api/mixpanel";
import { FEEDBACK_FORM_URL } from "../const/app";
import {
  CHAT_FROM,
  CHAT_TYPE,
  REACTIONS,
  IDLE_PRELOADED_MESSAGES,
  PRECONFIGURED_COMMANDS,
} from "../const/messages";
import { setHelpRequired } from "../redux/appSlice";

const isEqualCaseInsensitive = (arg1, arg2) => {
  return arg1.toLowerCase() === arg2.toLowerCase();
};

export const processBotStaticReplies = (userMessage, dispatch) => {
  if (
    isEqualCaseInsensitive(userMessage, IDLE_PRELOADED_MESSAGES.HELP_YES) ||
    isEqualCaseInsensitive(userMessage, PRECONFIGURED_COMMANDS.HELP)
  ) {
    sendHelpEvent({ ["Help required"]: true });
    dispatch(setHelpRequired(true));

    return {
      exit: true,
      payload: [
        {
          type: CHAT_TYPE.TEXT,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          contents: `Type in keywords of what Miro template you're looking for. E.g. retrospective`,
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
      ],
    };
  }

  if (isEqualCaseInsensitive(userMessage, IDLE_PRELOADED_MESSAGES.HELP_NO)) {
    sendHelpEvent({ ["Help required"]: false });
    dispatch(setHelpRequired(false));

    return { exit: true, payload: [] };
  }

  if (
    isEqualCaseInsensitive(userMessage, REACTIONS.LIKE) ||
    isEqualCaseInsensitive(userMessage, REACTIONS.DISLIKE)
  ) {
    return {
      exit: true,
      payload: [
        {
          type: CHAT_TYPE.TEXT,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          contents: `Thanks for your feedback. Please consider clicking on the link below to provide me with some detailed feedback.`,
        },
        {
          type: CHAT_TYPE.ACTIONS,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          redirect: {
            url: FEEDBACK_FORM_URL,
            displayText: "I'd love to hear from you",
          },
        },
      ],
    };
  }

  return { exit: false, payload: null };
};

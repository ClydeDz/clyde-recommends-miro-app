import { sendHelpEvent } from "../../api/mixpanel";
import { FEEDBACK_FORM_URL } from "../../const/app";
import {
  CHAT_FROM,
  CHAT_TYPE,
  REACTIONS,
  IDLE_PRELOADED_MESSAGES,
  PRECONFIGURED_COMMANDS,
} from "../../const/messages";
import { setHelpRequired } from "../../redux/appSlice";
import { isEqualCaseInsensitive } from "../utils";

const isHelpRequiredYes = (userMessage) => {
  return (
    isEqualCaseInsensitive(userMessage, IDLE_PRELOADED_MESSAGES.HELP_YES) ||
    isEqualCaseInsensitive(userMessage, PRECONFIGURED_COMMANDS.HELP)
  );
};

const isHelpRequiredNo = (userMessage) => {
  return isEqualCaseInsensitive(userMessage, IDLE_PRELOADED_MESSAGES.HELP_NO);
};

const isReactions = (userMessage) => {
  return (
    isEqualCaseInsensitive(userMessage, REACTIONS.LIKE) ||
    isEqualCaseInsensitive(userMessage, REACTIONS.DISLIKE)
  );
};

export const isStaticResponseRequired = (userMessage) => {
  return (
    isHelpRequiredYes(userMessage) ||
    isHelpRequiredNo(userMessage) ||
    isReactions(userMessage)
  );
};

export const processBotStaticReplies = (userMessage, dispatch) => {
  if (isHelpRequiredYes(userMessage)) {
    sendHelpEvent({ ["Help required"]: true });
    dispatch(setHelpRequired(true));

    return {
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

  if (isHelpRequiredNo(userMessage)) {
    sendHelpEvent({ ["Help required"]: false });
    dispatch(setHelpRequired(false));

    return { payload: [] };
  }

  if (isReactions(userMessage)) {
    return {
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

  return { payload: null };
};

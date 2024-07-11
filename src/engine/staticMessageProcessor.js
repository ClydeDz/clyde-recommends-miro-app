import { sendHelpEvent } from "../api/mixpanel";
import {
  CHAT_FROM,
  CHAT_TYPE,
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

  return { exit: false, payload: null };
};

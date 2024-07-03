import emailsInString from "emails-in-string";
import {
  sendEmailRegisteredEvent,
  sendPreconfiguredCommandEvent,
} from "../api/mixpanel";
import {
  CHAT_FROM,
  CHAT_TYPE,
  IDLE_PRELOADED_MESSAGES,
  PRECONFIGURED_COMMANDS,
  PRECONFIGURED_FEEDBACK_MESSAGES,
} from "../const/messages";

const isEqualCaseInsensitive = (arg1, arg2) => {
  return arg1.toLowerCase() === arg2.toLowerCase();
};

export const processBotStaticReplies = (userMessage, dispatch) => {
  if (
    isEqualCaseInsensitive(userMessage, IDLE_PRELOADED_MESSAGES.HELP_YES) ||
    isEqualCaseInsensitive(userMessage, PRECONFIGURED_COMMANDS.HELP)
  ) {
    sendPreconfiguredCommandEvent(PRECONFIGURED_COMMANDS.HELP);
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
    sendPreconfiguredCommandEvent(PRECONFIGURED_COMMANDS.HELP_NO);
    // TODO: save preference in state
    return { exit: true, payload: [] };
  }

  if (isEqualCaseInsensitive(userMessage, PRECONFIGURED_COMMANDS.FEEDBACK)) {
    sendPreconfiguredCommandEvent(PRECONFIGURED_COMMANDS.FEEDBACK, {
      category: "Initiated",
    });
    // TODO: save preference in state
    return {
      exit: true,
      payload: [
        {
          type: CHAT_TYPE.TEXT,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          contents: `I'd really like to know what you think about this app.`,
        },
        {
          type: CHAT_TYPE.ACTIONS,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          actions: [
            PRECONFIGURED_FEEDBACK_MESSAGES.NEEDS_IMPROVEMENT,
            PRECONFIGURED_FEEDBACK_MESSAGES.NEUTRAL,
            PRECONFIGURED_FEEDBACK_MESSAGES.AMAZING,
          ],
        },
      ],
    };
  }

  if (
    isEqualCaseInsensitive(
      userMessage,
      PRECONFIGURED_FEEDBACK_MESSAGES.AMAZING
    ) ||
    isEqualCaseInsensitive(
      userMessage,
      PRECONFIGURED_FEEDBACK_MESSAGES.NEUTRAL
    ) ||
    isEqualCaseInsensitive(
      userMessage,
      PRECONFIGURED_FEEDBACK_MESSAGES.NEEDS_IMPROVEMENT
    )
  ) {
    sendPreconfiguredCommandEvent(PRECONFIGURED_COMMANDS.FEEDBACK, {
      category: userMessage,
    });
    // TODO: save preference in state
    return {
      exit: true,
      payload: [
        {
          type: CHAT_TYPE.TEXT,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          contents: `Thanks for your feedback. Would you like to drop your email address so I can follow up?`,
        },
      ],
    };
  }

  const uniqueEmails = emailsInString(userMessage);

  if (uniqueEmails.length > 0) {
    sendEmailRegisteredEvent({
      email: uniqueEmails.join(", "),
      user_message: userMessage,
    });
    return {
      exit: true,
      payload: [
        {
          type: CHAT_TYPE.TEXT,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          contents: `Thanks for sharing your email. I'll be in touch!`,
        },
      ],
    };
  }

  if (isEqualCaseInsensitive(userMessage, PRECONFIGURED_COMMANDS.ABOUT)) {
    sendPreconfiguredCommandEvent(PRECONFIGURED_COMMANDS.ABOUT);
    return {
      exit: true,
      payload: [
        {
          type: CHAT_TYPE.TEXT,
          from: CHAT_FROM.BOT,
          timestamp: new Date().toLocaleString(),
          contents: `Clyde Recommends is made to recommend a Miro template from Clyde's Miroverse page.`,
        },
      ],
    };
  }

  return { exit: false, payload: null };
};

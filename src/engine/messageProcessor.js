import {
  sendHelpEvent,
  sendTemplateFoundEvent,
  sendTemplateNotFoundEvent,
} from "../api/mixpanel";
import {
  CHAT_FROM,
  CHAT_TYPE,
  FEEDBACK_OPTIONS,
  IDLE_PRELOADED_MESSAGES,
  PRECONFIGURED_COMMANDS,
  IDLE_CHAT_CONVERSATIONS,
} from "../const/messages";
import { setRecommendedTemplate } from "../redux/recommendationSlice";
import { setSearchKeywords } from "../redux/searchSlice";
import { processBotStaticReplies } from "./staticMessageProcessor";
import { pickTemplate, recommendTemplates } from "./templateProcessor";
import { removeStopwords } from "stopword";

export const processUserMessage = (userMessage) => {
  return {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.USER,
    timestamp: new Date().toLocaleString(),
    contents: userMessage,
  };
};

export const processBotReplies = (userMessage, dispatch) => {
  const { exit, payload } = processBotStaticReplies(userMessage, dispatch);
  if (exit) {
    return payload;
  }

  const messageExcludingFillers = removeFillerWords(userMessage);
  const keywords = filterKeywords(messageExcludingFillers);
  const templates = recommendTemplates(keywords);
  const templatePicked = pickTemplate(templates);

  dispatch(setSearchKeywords(keywords));

  if (!templatePicked) {
    sendTemplateNotFoundEvent({
      ["Search terms"]: userMessage,
      ["Search keywords"]: keywords,
    });

    return [
      {
        type: CHAT_TYPE.TEXT,
        from: CHAT_FROM.BOT,
        timestamp: new Date().toLocaleString(),
        contents: `Sorry, I couldn't find a template that matches that criteria. Perhaps try looking up different keywords or click on one of the examples below?`,
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
  }

  dispatch(
    setRecommendedTemplate({
      id: templatePicked.id,
      title: templatePicked.title,
      url: templatePicked.url,
    })
  );

  sendTemplateFoundEvent({
    ["Template id"]: templatePicked.id,
    ["Template title"]: templatePicked.title,
    ["Template url"]: templatePicked.url,
    ["Search terms"]: userMessage,
    ["Search keywords"]: keywords,
  });

  return [
    {
      type: CHAT_TYPE.TEXT,
      from: CHAT_FROM.BOT,
      timestamp: new Date().toLocaleString(),
      contents: `I've picked this template for you.`,
    },
    {
      type: CHAT_TYPE.RECOMMENDATION,
      from: CHAT_FROM.BOT,
      timestamp: new Date().toLocaleString(),
      template: { ...templatePicked },
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
  ];
};

export const generateIdleChatConversations = () => {
  return IDLE_CHAT_CONVERSATIONS;
};

const removeFillerWords = (message) => {
  return removeStopwords(message.split(" "));
};

const filterKeywords = (sanitisedMessageArray) => {
  return sanitisedMessageArray.filter((message) => {
    if (!message.includes("template")) return message;
  });
};

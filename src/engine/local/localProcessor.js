import {
  sendTemplateFoundEvent,
  sendTemplateNotFoundEvent,
} from "../../api/mixpanel";
import { CHAT_SOURCE, CHAT_TYPE, REACTIONS } from "../../const/messages";
import { setRecommendedTemplate } from "../../redux/recommendationSlice";
import { setSearchKeywords } from "../../redux/searchSlice";
import { constructBotReply } from "../replyProcessor";
import { filterKeywords, removeFillerWords } from "../utils";
import { pickTemplate, recommendTemplates } from "./templateProcessor";

export const processBotLocalReplies = (userMessage, dispatch) => {
  console.log("LOCAL");

  const messageExcludingFillers = removeFillerWords(userMessage);
  const keywords = filterKeywords(messageExcludingFillers);
  const templates = recommendTemplates(keywords);
  const templatePicked = pickTemplate(templates);

  dispatch(setSearchKeywords(keywords));

  if (!templatePicked) {
    sendTemplateNotFoundEvent({
      ["Search terms"]: userMessage,
      ["Search keywords"]: keywords,
      ["Source"]: CHAT_SOURCE.LOCAL,
    });

    return [
      constructBotReply(CHAT_TYPE.TEXT, {
        contents: `Sorry, I couldn't find a template that matches that criteria. Perhaps try looking up different keywords or click on one of the examples below?`,
      }),
      constructBotReply(CHAT_TYPE.ACTIONS, {
        actions: [
          "Give me a retrospective template",
          "Recommend an icebreaker",
          "I want to collect feedback",
        ],
      }),
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
    ["Source"]: CHAT_SOURCE.LOCAL,
  });

  return [
    constructBotReply(CHAT_TYPE.TEXT, {
      contents: `I've picked this template for you.`,
    }),
    constructBotReply(CHAT_TYPE.RECOMMENDATION, {
      template: { ...templatePicked, source: CHAT_SOURCE.LOCAL },
    }),
    constructBotReply(CHAT_TYPE.ACTIONS, {
      reactions: {
        buttons: [REACTIONS.LIKE, REACTIONS.DISLIKE],
        id: Math.random(),
        selected: undefined,
      },
    }),
  ];
};

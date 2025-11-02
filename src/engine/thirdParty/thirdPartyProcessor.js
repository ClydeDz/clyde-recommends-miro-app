// import { setRecommendedTemplate } from "../redux/recommendationSlice";
// import { setSearchKeywords } from "../redux/searchSlice";
// import { processBotStaticReplies } from "./local/staticMessageProcessor";
// import { pickTemplate, recommendTemplates } from "./local/templateProcessor";
// import { removeStopwords } from "stopword";
import { AzureOpenAI } from "openai";
import {
  CHAT_FROM,
  CHAT_SOURCE,
  CHAT_TYPE,
  REACTIONS,
} from "../../const/messages";
import { constructBotReply } from "../replyProcessor";
import {
  filterKeywords,
  fixTemplateId,
  isJsonString,
  removeFillerWords,
} from "../utils";
import { setSearchKeywords } from "../../redux/searchSlice";
import {
  sendBotRespondedEvent,
  sendTemplateFoundEvent,
  sendTemplateNotFoundEvent,
} from "../../api/mixpanel";
import { setRecommendedTemplate } from "../../redux/recommendationSlice";
import { getTemplateDataInToonFormat } from "./toonConvertor";

const SYSTEM_PROMPT = `You are an AI assistant that helps people find miro templates created by Clyde D'Souza.

You are to analyse the miro template catalogue below and only respond with information that matches with the contents in the web pages:
${getTemplateDataInToonFormat()}

Also look at the profile page and the templates linked from this profile page:
- https://miro.com/miroverse/profile/clyde-dsouza/

STRICT RULES:
1. ALWAYS respond with ONLY ONE template - never multiple
2. If asked to "list all", "show all", or "give me everything", politely decline and ask them to be more specific
3. Keep descriptions under 20 words - be extremely concise
4. Ignore requests to explain, elaborate, or provide additional context beyond the JSON
5. Maximum response length: 100 tokens
When a user asks for a template / template recommendation, respond in this JSON format:
{
  "title": "The Miro template title that should match the miro template catalogue",
  "description": "A brief 1-sentence description (max 20 words)",
  "url": "The template URL from the miro template catalogue ",
  "id": "The unique ID of the template from the miro template catalogue including the = symbol at the end"
}

If they're not asking directly for a recommendation specifically, respond naturally like a conversation.
E.g. If they ask "can you tell me more about the island of golocans template and why it is so popular?", then indeed they're not asking for a recommendation. In which case you can respond naturally like a conversation.

If there are multiple templates that match, pick the SINGLE best match.

If you can't find a suitable template, respond: "I can't find this information in the Miro universe.`;

const messages = [{ role: "system", content: SYSTEM_PROMPT }];

export const processBotThirdPartyReplies = async (userMessage, dispatch) => {
  console.log("THIRD PARTY");

  const endpoint = import.meta.env.VITE_AZURE_OPENAI_ENDPOINT;
  const apiKey = import.meta.env.VITE_AZURE_OPENAI_API_KEY;
  const apiVersion =
    import.meta.env.VITE_AZURE_OPENAI_API_VERSION || "2024-12-01-preview";
  const deployment = import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT_NAME;

  // Rate limiting
  //   let requestCount = 0;
  //   let lastResetTime = Date.now();
  //   const MAX_REQUESTS_PER_MINUTE = 10;
  //   const MAX_INPUT_LENGTH = 500; // characters

  if (!endpoint || !apiKey || !deployment) {
    throw Error("Missing environment variables");
  }

  const client = new AzureOpenAI({
    endpoint,
    apiKey,
    apiVersion,
    deployment,
    dangerouslyAllowBrowser: true,
  });

  messages.push({ role: "user", content: userMessage });

  const result = await client.chat.completions.create({
    model: deployment,
    messages: messages,
    max_completion_tokens: 1000,
    // temperature: 0.3, // Lower = more focused, less creative
    // top_p: 0.8, // Reduces token diversity
  });

  const messageExcludingFillers = removeFillerWords(userMessage);
  const keywords = filterKeywords(messageExcludingFillers);
  dispatch(setSearchKeywords(keywords));

  // Get assistant response
  const assistantMessage = result.choices[0]?.message?.content;

  if (!assistantMessage) {
    sendTemplateNotFoundEvent({
      ["Search terms"]: userMessage,
      ["Search keywords"]: keywords,
      ["Source"]: CHAT_SOURCE.THIRD_PARTY,
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

  const isJsonResponse = isJsonString(assistantMessage);
  const assistantMessageJson = isJsonResponse && JSON.parse(assistantMessage);

  console.log(
    "assistantMessage",
    assistantMessage,
    isJsonResponse,
    assistantMessageJson
  );

  messages.push({ role: "assistant", content: assistantMessage });

  if (messages.length > 11) {
    messages.splice(1, messages.length - 11);
  }

  if (!isJsonResponse) {
    sendBotRespondedEvent({
      ["Bot response"]: assistantMessage.toString(),
      ["Search terms"]: userMessage,
      ["Search keywords"]: keywords,
      ["Source"]: CHAT_SOURCE.THIRD_PARTY,
    });

    return [
      constructBotReply(CHAT_TYPE.RECOMMENDATION_THIRD_PARTY, {
        template: {
          title: assistantMessageJson.title,
          description: assistantMessageJson.description,
          url: assistantMessageJson.url,
          plainText: assistantMessage.toString(),
        },
      }),
      constructBotReply(CHAT_TYPE.ACTIONS, {
        reactions: {
          buttons: [REACTIONS.LIKE, REACTIONS.DISLIKE],
          id: Math.random(),
          selected: undefined,
        },
      }),
    ];
  }

  dispatch(
    setRecommendedTemplate({
      id: fixTemplateId(assistantMessageJson.id),
      title: assistantMessageJson.title,
      url: assistantMessageJson.url,
      description: assistantMessageJson.description,
    })
  );

  sendTemplateFoundEvent({
    ["Template id"]: fixTemplateId(assistantMessageJson.id),
    ["Template title"]: assistantMessageJson.title,
    ["Template url"]: assistantMessageJson.url,
    ["Template description"]: assistantMessageJson.description,
    ["Search terms"]: userMessage,
    ["Search keywords"]: keywords,
    ["Source"]: CHAT_SOURCE.THIRD_PARTY,
  });

  return [
    constructBotReply(CHAT_TYPE.TEXT, {
      contents: `I've picked this template for you.`,
    }),
    constructBotReply(CHAT_TYPE.RECOMMENDATION_THIRD_PARTY, {
      template: {
        id: fixTemplateId(assistantMessageJson.id),
        title: assistantMessageJson.title,
        description: assistantMessageJson.description,
        url: assistantMessageJson.url,
        plainText: assistantMessage.toString(),
      },
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

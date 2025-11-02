import { IDLE_CHAT_CONVERSATIONS } from "../const/messages";
import { processBotLocalReplies } from "./local/localProcessor";
import {
  isStaticResponseRequired,
  processBotStaticReplies,
} from "./local/staticMessageProcessor";
import { processBotThirdPartyReplies } from "./thirdParty/thirdPartyProcessor";

const PROCESS_USING_THIRD_PARTY = false;

export const processBotReplies = async (userMessage, dispatch) => {
  if (isStaticResponseRequired(userMessage)) {
    return processBotStaticReplies(userMessage, dispatch);
  }

  try {
    console.log(PROCESS_USING_THIRD_PARTY);
    return PROCESS_USING_THIRD_PARTY
      ? await processBotThirdPartyReplies(userMessage, dispatch)
      : processBotLocalReplies(userMessage, dispatch);
  } catch (e) {
    console.log("CATCH", e);
    return processBotLocalReplies(userMessage, dispatch);
  }
};

export const generateIdleChatConversations = () => {
  return IDLE_CHAT_CONVERSATIONS;
};

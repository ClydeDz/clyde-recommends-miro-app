import { IDLE_CHAT_CONVERSATIONS } from "../const/messages";
import { setIsThirdPartyOffline } from "../redux/appSlice";
import { processBotLocalReplies } from "./local/localProcessor";
import {
  isStaticResponseRequired,
  processBotStaticReplies,
} from "./local/staticMessageProcessor";
import { processBotThirdPartyReplies } from "./thirdParty/thirdPartyProcessor";

export const processBotReplies = async (userMessage, dispatch, appState) => {
  const { isThirdPartyOffline } = appState;
 
  if (isStaticResponseRequired(userMessage)) {
    return processBotStaticReplies(userMessage, dispatch);
  }

  const PROCESS_USING_THIRD_PARTY =
    import.meta.env.VITE_PROCESS_USING_THIRD_PARTY === "true";

  try {
    return PROCESS_USING_THIRD_PARTY && !isThirdPartyOffline
      ? await processBotThirdPartyReplies(userMessage, dispatch)
      : processBotLocalReplies(userMessage, dispatch);
  } catch (e) {
    dispatch(setIsThirdPartyOffline(true));
    return processBotLocalReplies(userMessage, dispatch);
  }
};

export const generateIdleChatConversations = () => {
  return IDLE_CHAT_CONVERSATIONS;
};

import { CHAT_FROM, CHAT_TYPE } from "../const/messages";
import { setIsBotLoading } from "../redux/appSlice";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const processRepliesWithDelay = async (
  botReplies,
  setConversation,
  dispatch
) => {
  await delay(500);

  for (let index = 0; index < botReplies.length; index++) {
    const reply = botReplies[index];

    dispatch(setIsBotLoading(true));
    await delay(index * 500);
    await delay(200);

    setConversation((oldArray) => [...oldArray, { ...reply }]);
    dispatch(setIsBotLoading(false));
  }

  dispatch(setIsBotLoading(false));
};

export const constructBotReply = (type, payload) => {
  return {
    type,
    from: CHAT_FROM.BOT,
    timestamp: new Date().toLocaleString(),
    ...payload,
  };
};

export const constructUserReply = (userMessage) => {
  return {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.USER,
    timestamp: new Date().toLocaleString(),
    contents: userMessage,
  };
};

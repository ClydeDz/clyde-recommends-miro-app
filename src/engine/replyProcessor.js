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

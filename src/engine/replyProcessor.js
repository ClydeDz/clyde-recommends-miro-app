const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const processRepliesWithDelay = async (
  botReplies,
  setIsBotLoading,
  setConversation
) => {
  await delay(500);

  for (let index = 0; index < botReplies.length; index++) {
    const reply = botReplies[index];

    setIsBotLoading(true);
    await delay(index * 500);

    setIsBotLoading(true);
    await delay(200);

    setConversation((oldArray) => [...oldArray, { ...reply }]);
    setIsBotLoading(false);
  }

  setIsBotLoading(false);
};

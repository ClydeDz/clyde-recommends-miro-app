const respondWithTemplate = (messages) => {
  const userMessages = messages.filter((msg) => msg.role === "user");
  const lastUserMessage = userMessages[userMessages.length - 1];
  console.log(lastUserMessage, userMessages);
  const searchingForTemplate =
    lastUserMessage && lastUserMessage.content.includes("template");

  console.log(searchingForTemplate);

  return searchingForTemplate
    ? '{\n"id": "uXjVKTtrd2w=",\n"title": "Mock Client Template",\n"description": "This International Museum Day, run a fun icebreaker activity in this virtual museum! Enter the museum and open the inside door, as marked, to reveal the icebreaker question.",\n"url": "https://miro.pxf.io/1r4gxD"\n}'
    : "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
};

export const mockAzureOpenAI = {
  chat: {
    completions: {
      create: (payload) => {
        const { messages } = payload;
        console.log(messages);
        return {
          choices: [
            {
              message: {
                content: respondWithTemplate(messages),
              },
            },
          ],
        };
      },
    },
  },
};

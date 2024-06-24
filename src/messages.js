export const CHAT_TYPE = {
  TEXT: "text",
  WELCOME: "welcome",
};

export const CHAT_FROM = {
  BOT: "Clyde",
  USER: "User",
};

export const chatConversations = [
  {
    type: CHAT_TYPE.WELCOME,
    from: CHAT_FROM.BOT,
    timestamp: new Date().getDate().toString(),
  },
  {
    type: CHAT_TYPE.TEXT,
    from: CHAT_FROM.BOT,
    timestamp: new Date().getDate().toString(),
    contents:
      "Hi! Welcome to Clyde Recommends! \n\nFeel free to message me with what kind of templates you're looking for and I can recommend one if I have one for the occasion.",
  },
];

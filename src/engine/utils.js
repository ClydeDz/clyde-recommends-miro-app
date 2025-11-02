import { removeStopwords } from "stopword";

export const removeFillerWords = (message) => {
  return removeStopwords(message.split(" "));
};

export const filterKeywords = (sanitisedMessageArray) => {
  return sanitisedMessageArray.filter((message) => {
    if (!message.includes("template")) return message;
  });
};

export const isJsonString = (str) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};

export const isEqualCaseInsensitive = (arg1, arg2) => {
  return arg1.toLowerCase() === arg2.toLowerCase();
};

export const fixTemplateId = (templateId) => {
  return templateId.slice(-1) === "=" ? templateId : `${templateId}=`;
};

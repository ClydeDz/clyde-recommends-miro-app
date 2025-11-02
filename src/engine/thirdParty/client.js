import { AzureOpenAI } from "openai";
import { mockAzureOpenAI } from "./mockAzureOpenAI";

export const initialiseClient = (clientConfig) => {
  const useMockClient = import.meta.env.VITE_USE_THIRD_PARTY_MOCK === "true";
  console.log("useMockClient", useMockClient);

  return useMockClient
    ? mockAzureOpenAI
    : new AzureOpenAI({
        ...clientConfig,
      });
};

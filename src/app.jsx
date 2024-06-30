import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { initAnalyticsWithSuperProperties } from "./api/mixpanel";
import { Chat } from "./pages/Chat/Chat";
import store from "./redux/store";
import { Provider } from "react-redux";
import { initialChatConversations } from "./const/messages";
import { generateIdleChatConversations } from "./engine/messageProcessor";
import { processRepliesWithDelay } from "./engine/replyProcessor";
import { useIdleTimer } from "react-idle-timer";
import { BOT_IDLE_TIMEOUT } from "./const/app";

const App = () => {
  const [conversations, setConversations] = useState(initialChatConversations);
  const [isBotLoading, setIsBotLoading] = useState(false);

  useEffect(() => {
    initAnalyticsWithSuperProperties();
  }, []);

  const onIdle = () => {
    const botReplies = generateIdleChatConversations();
    processRepliesWithDelay(botReplies, setIsBotLoading, setConversations);
  };

  const idleTimer = useIdleTimer({
    onIdle,
    timeout: BOT_IDLE_TIMEOUT,
    stopOnIdle: true,
  });

  return (
    <Chat
      conversations={conversations}
      setConversations={setConversations}
      isBotLoading={isBotLoading}
      setIsBotLoading={setIsBotLoading}
      idleTimer={idleTimer}
    />
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

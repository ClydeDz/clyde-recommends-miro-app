import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { initAnalytics, sendIdleChatEvent } from "./api/mixpanel";
import { Chat } from "./pages/Chat/Chat";
import store from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import { INITIAL_CHAT_CONVERSATIONS } from "./const/messages";
import { generateIdleChatConversations } from "./engine/messageProcessor";
import { processRepliesWithDelay } from "./engine/replyProcessor";
import { useIdleTimer } from "react-idle-timer";
import { BOT_IDLE_TIMEOUT } from "./const/app";
import { setIsBotActive } from "./redux/appSlice";

const App = () => {
  const [conversations, setConversations] = useState(
    INITIAL_CHAT_CONVERSATIONS
  );
  const dispatch = useDispatch();

  useEffect(() => {
    initAnalytics();
  }, []);

  const onIdle = async () => {
    dispatch(setIsBotActive(false));
    sendIdleChatEvent();
    const botReplies = generateIdleChatConversations();
    await processRepliesWithDelay(botReplies, setConversations, dispatch);
  };

  const idleTimer = useIdleTimer({
    onIdle,
    timeout: BOT_IDLE_TIMEOUT,
    stopOnIdle: true,
  });

  const activateTimer = () => {
    idleTimer.start();
    dispatch(setIsBotActive(true));
  };

  return (
    <Chat
      conversations={conversations}
      setConversations={setConversations}
      activateTimer={activateTimer}
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

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { initAnalytics } from "./api/mixpanel";
import { Chat } from "./pages/Chat/Chat";
import store from "./redux/store";
import { Provider, useDispatch } from "react-redux";
import { initialChatConversations } from "./const/messages";
import { generateIdleChatConversations } from "./engine/messageProcessor";
import { processRepliesWithDelay } from "./engine/replyProcessor";
import { useIdleTimer } from "react-idle-timer";
import { BOT_IDLE_TIMEOUT } from "./const/app";
import { setIsBotActive } from "./redux/appSlice";

const App = () => {
  const [conversations, setConversations] = useState(initialChatConversations);
  const dispatch = useDispatch();

  useEffect(() => {
    initAnalytics();
  }, []);

  const onIdle = async () => {
    dispatch(setIsBotActive(false));
    const botReplies = generateIdleChatConversations();
    await processRepliesWithDelay(botReplies, setConversations, dispatch);
  };

  const onActive = () => {
    console.log("on active"); // This isn't triggering
    dispatch(setIsBotActive(true));
  };

  const idleTimer = useIdleTimer({
    onIdle,
    onActive,
    timeout: 6000, //BOT_IDLE_TIMEOUT,
    stopOnIdle: true,
  });

  return (
    <Chat
      conversations={conversations}
      setConversations={setConversations}
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

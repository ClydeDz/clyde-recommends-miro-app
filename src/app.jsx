import * as React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { initAnalyticsWithSuperProperties } from "./api/mixpanel";
import { Chat } from "./pages/Chat/Chat";

const App = () => {
  React.useEffect(() => {
    initAnalyticsWithSuperProperties();
  }, []);

  return <Chat />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

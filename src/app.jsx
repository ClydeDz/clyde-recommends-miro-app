import * as React from "react";
import { createRoot } from "react-dom/client";
import "./app.css";
import { initAnalyticsWithSuperProperties } from "./api/mixpanel";
import { Chat } from "./pages/Chat/Chat";
import store from "./redux/store";
import { Provider } from "react-redux";

const App = () => {
  React.useEffect(() => {
    initAnalyticsWithSuperProperties();
  }, []);

  return <Chat />;
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

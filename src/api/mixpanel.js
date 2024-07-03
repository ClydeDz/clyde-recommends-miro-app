import mixpanel from "mixpanel-browser";

export const initAnalytics = () => {
  try {
    mixpanel.init(import.meta.env.VITE_MIXPANEL_TOKEN, {
      debug: true,
      track_pageview: true,
      persistence: "localStorage",
    });
  } catch {
    undefined;
  }
};

export const sendTemplateVisitedEvent = (props) => {
  try {
    mixpanel.track("Template visited", { ...props });
  } catch {
    undefined;
  }
};

export const sendPreconfiguredCommandEvent = (command, props = undefined) => {
  try {
    mixpanel.track(command, { ...props });
  } catch {
    undefined;
  }
};

export const sendEmailRegisteredEvent = (props) => {
  try {
    mixpanel.track("Email registered", { ...props });
  } catch {
    undefined;
  }
};

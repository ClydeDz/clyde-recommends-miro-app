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

export const sendHelpEvent = (props) => {
  try {
    mixpanel.track("Help", { ...props });
  } catch {
    undefined;
  }
};

export const sendTemplateFoundEvent = (props) => {
  try {
    mixpanel.track("Template found", { ...props });
  } catch {
    undefined;
  }
};

export const sendTemplateNotFoundEvent = (props) => {
  try {
    mixpanel.track("Template not found", { ...props });
  } catch {
    undefined;
  }
};

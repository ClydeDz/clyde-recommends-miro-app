import mixpanel from "mixpanel-browser";

export const initAnalyticsWithSuperProperties = () => {
  // import.meta.env.MODE
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

export const sendPageViewEvent = (page) => {
  try {
    console.log("iheifh eifhei");
    //mixpanel.track("Page view", { page });
  } catch {
    undefined;
  }
};

export const sendLinkClickedEvent = (props) => {
  try {
    mixpanel.track("Link clicked", {
      destination_url: props.link,
      link_type: props.type,
      page_location: props.location,
    });
  } catch {
    undefined;
  }
};

export const sendNavigationClickedEvent = (pageType) => {
  try {
    mixpanel.track("Navigation clicked", {
      page: pageType,
    });
  } catch {
    undefined;
  }
};

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
    mixpanel.track("Template visited", {
      template_id: props.templateId,
      template_title: props.templateTitle,
      template_url: props.templateUrl,
      search_terms: props.searchTerms,
      search_keywords: props.searchKeywords,
    });
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

import * as React from "react";
import { Button } from "@chatscope/chat-ui-kit-react";
import { sendExternalLinkClickedEvent } from "../../../api/mixpanel";

export const ExternalLink = (props) => {
  const { url, displayText } = props;

  const onExternalLinkClick = () => {
    window.open(url, "_blank");
    sendExternalLinkClickedEvent({ website: url });
  };

  return (
    <div className="external-link-template">
      <Button border onClick={() => onExternalLinkClick()}>
        {displayText}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M4.8401 21.1201L15.192 13.6062L17.293 15.7072C17.8634 16.2776 18.8397 15.9726 18.984 15.179L21.2424 2.75781L8.82121 5.0162C8.02756 5.1605 7.72259 6.13678 8.29299 6.70718L10.394 8.80819L2.8801 19.1601C2.50676 19.6579 2.50676 20.3423 2.8801 20.8401C3.34402 21.4586 4.22154 21.584 4.8401 21.1201ZM17.3576 12.9434L15.3796 10.9654L7.0001 17.0001L13.0348 8.62052L11.0568 6.64253L18.7578 5.24233L17.3576 12.9434Z"
            fill="#ffffff"
          />
        </svg>
      </Button>
    </div>
  );
};

import * as React from "react";
import { Button } from "@chatscope/chat-ui-kit-react";

export const MessagePills = (props) => {
  const { message, onSendButtonClick } = props;

  return (
    <div className="actions-template">
      {message.actions.map((action) => (
        <Button
          border
          onClick={() => onSendButtonClick(action)}
          className="action-btn"
        >
          {action}
        </Button>
      ))}
    </div>
  );
};

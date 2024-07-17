import * as React from "react";
import { Button } from "@chatscope/chat-ui-kit-react";

export const QuickActions = (props) => {
  const { message, onActionBtnClicked } = props;

  return (
    <div className="actions-template">
      {message.actions.map((action) => (
        <Button
          border
          onClick={() => onActionBtnClicked(action)}
          className="action-btn"
        >
          {action}
        </Button>
      ))}
    </div>
  );
};

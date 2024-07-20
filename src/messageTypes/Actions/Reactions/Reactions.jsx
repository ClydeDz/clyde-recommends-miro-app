import * as React from "react";
import { REACTIONS } from "../../../const/messages";
import { Like } from "./Like";
import { Dislike } from "./Dislike";

export const Reactions = (props) => {
  const { id, onReactionButtonClick, selected, buttons } = props;

  return (
    <div className="reactions-template">
      {buttons.map((button) => [
        button === REACTIONS.LIKE && (
          <Like
            id={id}
            isSelected={selected === REACTIONS.LIKE}
            onClick={onReactionButtonClick}
            disabled={selected}
          />
        ),
        button === REACTIONS.DISLIKE && (
          <Dislike
            id={id}
            isSelected={selected === REACTIONS.DISLIKE}
            onClick={onReactionButtonClick}
            disabled={selected}
          />
        ),
      ])}
    </div>
  );
};

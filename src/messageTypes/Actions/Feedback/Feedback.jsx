import * as React from "react";
import { FEEDBACK_OPTIONS } from "../../../const/messages";
import { LikeButton } from "./LikeButton";
import { DislikeButton } from "./DislikeButton";

export const Feedback = (props) => {
  const { id, onFeedbackButtonClick, selected, buttons } = props;

  return (
    <div className="recommendation-feedback-template">
      {buttons.map((button) => [
        button === FEEDBACK_OPTIONS.LIKE && (
          <LikeButton
            id={id}
            isSelected={selected === FEEDBACK_OPTIONS.LIKE}
            onClick={onFeedbackButtonClick}
          />
        ),
        button === FEEDBACK_OPTIONS.DISLIKE && (
          <DislikeButton
            id={id}
            isSelected={selected === FEEDBACK_OPTIONS.DISLIKE}
            onClick={onFeedbackButtonClick}
          />
        ),
      ])}
    </div>
  );
};

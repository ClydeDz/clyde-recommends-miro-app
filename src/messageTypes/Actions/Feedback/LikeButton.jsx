import * as React from "react";
import { FEEDBACK_OPTIONS } from "../../../const/messages";
import { FEEDBACK_BUTTONS } from "../../../const/app";

export const LikeButton = (props) => {
  const { id, onClick, isSelected } = props;

  return (
    <span
      onClick={() => onClick(FEEDBACK_OPTIONS.LIKE, id)}
      className="feedback-btn"
    >
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
          d="M19.0629 8H14C14.3031 7.17152 14.4858 6.50485 14.5484 6C14.861 3.47495 13.4484 0.979359 11 0L6.17927 10.6056C6.06113 10.8655 6 11.1477 6 11.4332V21C6 21.5523 6.44772 22 7 22H14C18.4183 22 22 18.4183 22 14C22 11.8755 21.5768 10.1741 20.7305 8.89588C20.3601 8.33644 19.7339 8 19.0629 8ZM8 20V11.4332L11.8173 3.03514C12.5478 3.98319 12.8039 5.26389 12.3997 6.47636L11.2251 10L19.063 10C19.6711 10.9186 20 12.2408 20 14C20 17.3137 17.3137 20 14 20H8Z"
          fill={
            isSelected
              ? FEEDBACK_BUTTONS.SELECTED_COLOR
              : FEEDBACK_BUTTONS.COLOR
          }
        />
        <path
          d="M4 22C4.55228 22 5 21.5523 5 21V11C5 10.4477 4.55228 10 4 10C3.44772 10 3 10.4477 3 11V21C3 21.5523 3.44772 22 4 22Z"
          fill={
            isSelected
              ? FEEDBACK_BUTTONS.SELECTED_COLOR
              : FEEDBACK_BUTTONS.COLOR
          }
        />
      </svg>
    </span>
  );
};

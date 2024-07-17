import * as React from "react";
import { FEEDBACK_OPTIONS } from "../../../const/messages";

const iconColor = "#4DB6AC";
const selectedIconColor = "#091e05";

export const DislikeButton = (props) => {
  const { id, onClick, isSelected } = props;

  return (
    <span
      onClick={() => onClick(FEEDBACK_OPTIONS.DISLIKE, id)}
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
          d="M19.0629 16H14C14.3031 16.8285 14.4858 17.4951 14.5484 18C14.861 20.5251 13.4484 23.0206 11 24L6.17927 13.3944C6.06113 13.1345 6 12.8523 6 12.5668V3C6 2.44772 6.44772 2 7 2H14C18.4183 2 22 5.58172 22 10C22 12.1245 21.5768 13.8259 20.7305 15.1041C20.3601 15.6636 19.7339 16 19.0629 16ZM8 4V12.5668L11.8173 20.9649C12.5478 20.0168 12.8039 18.7361 12.3997 17.5236L11.2251 14L19.063 14C19.6711 13.0814 20 11.7592 20 10C20 6.68629 17.3137 4 14 4H8Z"
          fill={isSelected ? selectedIconColor : iconColor}
        />
        <path
          d="M4 2C4.55228 2 5 2.44772 5 3V13C5 13.5523 4.55228 14 4 14C3.44772 14 3 13.5523 3 13V3C3 2.44772 3.44772 2 4 2Z"
          fill={isSelected ? selectedIconColor : iconColor}
        />
      </svg>
    </span>
  );
};

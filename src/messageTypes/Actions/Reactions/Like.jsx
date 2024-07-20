import * as React from "react";
import { REACTIONS } from "../../../const/messages";
import { REACTIONS_BUTTON } from "../../../const/app";

export const Like = (props) => {
  const { id, onClick, isSelected, disabled } = props;

  return (
    <span
      onClick={() => !disabled && onClick(REACTIONS.LIKE, id)}
      className={`${disabled ? "disabled" : ""}`}
    >
      {isSelected ? (
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 10.5L11 2.5L12.5 3L13 5V6.5L12 9.5H18.5L20 10.5L21 14.5L19.5 18L15.5 20.5H7.5V10.5Z"
            fill={REACTIONS_BUTTON.SELECTED_COLOR}
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M19.0629 8H14C14.3031 7.17152 14.4858 6.50485 14.5484 6C14.861 3.47495 13.4484 0.979359 11 0L6.17927 10.6056C6.06113 10.8655 6 11.1477 6 11.4332V21C6 21.5523 6.44772 22 7 22H14C18.4183 22 22 18.4183 22 14C22 11.8755 21.5768 10.1741 20.7305 8.89588C20.3601 8.33644 19.7339 8 19.0629 8ZM8 20V11.4332L11.8173 3.03514C12.5478 3.98319 12.8039 5.26389 12.3997 6.47636L11.2251 10H19.063C19.6711 10.9186 20 12.2408 20 14C20 17.3137 17.3137 20 14 20H8Z"
            fill={REACTIONS_BUTTON.SELECTED_COLOR}
          />
          <path
            d="M4 22C4.55228 22 5 21.5523 5 21V11C5 10.4477 4.55228 10 4 10C3.44772 10 3 10.4477 3 11V21C3 21.5523 3.44772 22 4 22Z"
            fill={REACTIONS_BUTTON.SELECTED_COLOR}
          />
        </svg>
      ) : (
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
            fill={REACTIONS_BUTTON.COLOR}
          />
          <path
            d="M4 22C4.55228 22 5 21.5523 5 21V11C5 10.4477 4.55228 10 4 10C3.44772 10 3 10.4477 3 11V21C3 21.5523 3.44772 22 4 22Z"
            fill={REACTIONS_BUTTON.COLOR}
          />
        </svg>
      )}
    </span>
  );
};

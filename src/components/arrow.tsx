import * as React from "react";

function Arrow() {
  return (
    <svg
      width="22px"
      height="30px"
      viewBox="0 0 22 9"
      xmlns="http://www.w3.org/2000/svg"
      className="transition-transform duration-300 transform group-hover:translate-x-3"
    >
      <g
        className="group-hover:stroke-white transition-colors duration-250"
        stroke="#2D82E4"
        strokeWidth={2}
        fill="none"
        fillRule="evenodd"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M0 7h19" />
        <path d="M13 0L20 7 13 14" />
      </g>
    </svg>
  );
}

export default Arrow;

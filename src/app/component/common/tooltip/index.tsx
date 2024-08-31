import React from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import "./tooltip.css";

const TooltipWrapper = ({ id, content, children }: any) => (
  <div
    data-tooltip-id={id}
    data-tooltip-content={content}
    className="tooltip-wrapper"
  >
    {children}
    <ReactTooltip
      id={id}
      place="right"
      offset={10}
      className="custom-tooltip"
    />
  </div>
);

export default TooltipWrapper;

import React from "react";
import "./TodoIcon.css";
import { MdCheckCircle, MdDelete } from "react-icons/md";

function TodoIcon(props: { type: string; color: string; onClick: () => void }) {
  const renderSwitch = (type: string, color: string) => {
    switch (type) {
      case "check":
        return <MdCheckCircle fill={color}/>;
      case "delete":
        return <MdDelete fill={color}/>;
      default:
        return "default";
    }
  };
  return (
    <span
      className={`Icon-container Icon-container--${props.type}`}
      onClick={props.onClick}
    >
      {renderSwitch(props.type, props.color)}
    </span>
  );
}

export { TodoIcon };

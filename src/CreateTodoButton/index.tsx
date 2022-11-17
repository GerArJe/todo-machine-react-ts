import React from "react";
import "./CreateTodoButton.css";

function CreateTodoButton(props: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const onClickButton = () => {
    props.setOpenModal((prevState) => !prevState);
  };

  return (
    <button className="CreateTodoButton" onClick={onClickButton}>
      +
    </button>
  );
}

export { CreateTodoButton };

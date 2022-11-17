import React from "react";
import "./TodoList.css";

function TodoList(props: { children?: React.ReactNode }) {
  return (
    <section>
      <ul>{props.children}</ul>
    </section>
  );
}

export { TodoList };

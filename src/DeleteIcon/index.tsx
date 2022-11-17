import React from "react";
import { TodoIcon } from "../TodoIcon";

function DeleteIcon({ onDelete }: { onDelete: () => void }) {
  return <TodoIcon type="delete" color="gray" onClick={onDelete} />;
}

export { DeleteIcon };

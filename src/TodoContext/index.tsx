import React from "react";
import { Todo } from "../models/Todo";
import { useLocalStorage } from "./userLocalStorage";

const defaultValue: {
  loading: boolean;
  error: boolean;
  totalTodos: number;
  completedTodos: number;
  searchValue: string;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  searchedTodos: {
    text: string;
    completed: boolean;
  }[];
  completeTodo: (text: string) => void;
  deleteTodo: (text: string) => void;
  addTodo: (text: string) => void;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
} = {
  loading: false,
  error: false,
  totalTodos: 0,
  completedTodos: 0,
  searchValue: "",
  setSearchValue: function (value: React.SetStateAction<string>): void {
    throw new Error("Function not implemented.");
  },
  searchedTodos: [],
  completeTodo: function (text: string): void {
    throw new Error("Function not implemented.");
  },
  deleteTodo: function (text: string): void {
    throw new Error("Function not implemented.");
  },
  addTodo: function (text: string): void {
    throw new Error("Function not implemented.");
  },
  openModal: false,
  setOpenModal: function (value: React.SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
};

const TodoContext = React.createContext(defaultValue);

function TodoProvider(props: { children?: React.ReactNode }) {
  const {
    items: todos,
    saveItems: saveTodos,
    loading,
    error,
  } = useLocalStorage<Todo[]>("TODOS_V1", []);
  const [searchValue, setSearchValue] = React.useState("");
  const [openModal, setOpenModal] = React.useState(false);

  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos: {
    text: string;
    completed: boolean;
  }[] = [];

  if (!(searchValue.length >= 1)) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  const completeTodo = (text: string) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  const deleteTodo = (text: string) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  const addTodo = (text: string) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

  return (
    <TodoContext.Provider
      value={{
        loading,
        error,
        totalTodos,
        completedTodos,
        searchValue,
        setSearchValue,
        searchedTodos,
        completeTodo,
        deleteTodo,
        addTodo,
        openModal,
        setOpenModal,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
}

export { TodoContext, TodoProvider };

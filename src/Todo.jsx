import { useState, useEffect } from "react";
import { CompleteTodos } from "./components/CompleteTodos";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { InputTodo } from "./components/InputTodo";
import "./styles.css";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState([]);

  const [completeTodos, setCompleteTodos] = useState([]);

  const onChangeTodoText = (event) => setTodoText(event.target.value);

  const onClickAdd = () => {
    if (todoText === "") return;
    const newTodos = [...incompleteTodos, todoText];
    setIncompleteTodos(newTodos);
    setTodoText("");
  };

  const onClickDelete = (index) => {
    const newTodos = [...incompleteTodos];
    newTodos.splice(index, 1);
    setIncompleteTodos(newTodos);
  };

  const onClickComplete = (index) => {
    const newTodos = [...completeTodos, incompleteTodos[index]];
    onClickDelete(index);
    setCompleteTodos(newTodos);
  };

  const onClickBack = (index) => {
    const newTodos1 = [...incompleteTodos, completeTodos[index]];
    const newTodos2 = [...completeTodos];
    newTodos2.splice(index, 1);
    setIncompleteTodos(newTodos1);
    setCompleteTodos(newTodos2);
  };

  useEffect(() => {
    localStorage.setItem("incompleteTodos", JSON.stringify(incompleteTodos));
  }, [incompleteTodos]);

  // 完了タスクを保存
  useEffect(() => {
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }, [completeTodos]);

  // 初期化時にデータを読み込み
  useEffect(() => {
    const storedTodos = localStorage.getItem("incompleteTodos");
    if (storedTodos) setIncompleteTodos(JSON.parse(storedTodos));

    const storedCompleteTodos = localStorage.getItem("completeTodos");
    if (storedCompleteTodos) setCompleteTodos(JSON.parse(storedCompleteTodos));
  }, []);

  return (
    <>
      <InputTodo
        todoText={todoText}
        onChange={onChangeTodoText}
        onClick={onClickAdd}
      />
      <IncompleteTodos
        todos={incompleteTodos}
        onClickComplete={onClickComplete}
        onClickDelete={onClickDelete}
      />
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} />
    </>
  );
};

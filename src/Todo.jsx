import { useState, useEffect } from "react";
import { CompleteTodos } from "./components/CompleteTodos";
import { IncompleteTodos } from "./components/IncompleteTodos";
import { InputTodo } from "./components/InputTodo";
import "./styles.css";

export const Todo = () => {
  const [todoText, setTodoText] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState(() => {
    const storedIncompleteTodos = localStorage.getItem("incompleteTodos");
    return storedIncompleteTodos ? JSON.parse(storedIncompleteTodos) : [];
  })


  const [completeTodos, setCompleteTodos] = useState(() => {
    const storedCompleteTodos = localStorage.getItem("completeTodos");
    return storedCompleteTodos ? JSON.parse(storedCompleteTodos) : [];
  })
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

  const onClickDeleteComplete = (index) => {
    const newCompleteTodos = [...completeTodos];
    newCompleteTodos.splice(index, 1);
    setCompleteTodos(newCompleteTodos);
  };


  const onClickBack = (index) => {
    const newTodos1 = [...incompleteTodos, completeTodos[index]];
    const newTodos2 = [...completeTodos];
    newTodos2.splice(index, 1);
    setIncompleteTodos(newTodos1);
    setCompleteTodos(newTodos2);
  };
  //未完了タスクを保存
  useEffect(() => {
    console.log("保存する未完了タスク:", incompleteTodos); //保存直前のデータ
    localStorage.setItem("incompleteTodos", JSON.stringify(incompleteTodos));
  }, [incompleteTodos]);

  // 完了タスクを保存
  useEffect(() => {
    console.log("保存する完了タスク:", completeTodos); //保存直前のデータ
    localStorage.setItem("completeTodos", JSON.stringify(completeTodos));
  }, [completeTodos]);

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
      <CompleteTodos todos={completeTodos} onClickBack={onClickBack} onClickDelete={onClickDeleteComplete} />
    </>
  );
};

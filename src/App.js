import { InputLabel, Button, FormControl, Input } from "@material-ui/core";

import React from "react";
import "./App.css";
import db from "./firebase";
import Todo from "./todo";
const { useState, useEffect } = React;

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setinput] = useState("");
  const addTodo = async (e) => {
    e.preventDefault();
    const ref = db.collection("todo").doc();
    ref.set({ id: ref.id, todo: input, timestamp: new Date().getTime() });
    setTodos([...todos, input]);
    setinput("");
  };
  useEffect(() => {
    db.collection("todo")
      .orderBy("timestamp", "desc")
      .onSnapshot((a) => {
        setTodos(a.docs.map((todo) => todo.data()));
      });
  }, []);
  return (
    <div className="App">
      <h1>Todo</h1>
      <form>
        <FormControl>
          <InputLabel>Enter your Todo</InputLabel>
          <Input
            value={input}
            onChange={(event) => setinput(event.target.value)}
          />
        </FormControl>
        <Button disabled={!input} onClick={addTodo}>
          Add todo
        </Button>
      </form>
      <ul>
        {todos.map((todo) => (
          <Todo todo={todo} />
        ))}
      </ul>
    </div>
  );
}

export default App;

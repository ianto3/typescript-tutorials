import React, {useState} from 'react';
import NewTodo from './components/NewTodo';
import TodoList from './components/TodoList';
import {Todo} from "./todo.model";

function App() {
  // const todos = [{id: "1", text: "Finish task"}];
  // const todos:{id: string, text: string}[] = [];

  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodoHandler = (text: string) => {
    const newTodo = {
      id:  String(Math.floor(Math.random() * 9999)),
      text
    };
    setTodos(prevState => [...prevState, newTodo]);
  }

  const deleteTodoHandler = (todoId: string) => {
    setTodos(prevState => prevState.filter(todo => todo.id !== todoId));
  }

  return (
    <div className="App">
      <NewTodo onAddTodo={addTodoHandler} />
      <TodoList items={todos} onDeleteTodo={deleteTodoHandler} />
    </div>
  );
}

export default App;

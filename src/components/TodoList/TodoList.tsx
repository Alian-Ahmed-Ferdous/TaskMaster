import React from 'react'
import { Todo } from '../../model/model';
import "./TodoList.css"
import SingleTodo from '../singleTodo/SingleTodo';

interface props {
    todos: Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  }
  
  const TodoList: React.FC<props> = ({ todos, setTodos }) => {
    return (
      <div className="todos">
        {todos?.map((todo) => (
          <SingleTodo
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
          />
        ))}
      </div>
    );
  };
  
  export default TodoList;
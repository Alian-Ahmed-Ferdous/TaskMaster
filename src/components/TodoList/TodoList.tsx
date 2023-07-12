import React from 'react';
import { Todo } from '../../model/model';
import SingleTodo from '../singleTodo/SingleTodo';

interface Props {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  
  const urgentImportantTodos = todos.filter(
    (todo) => todo.urgent && todo.important
  );
  const urgentNotImportantTodos = todos.filter(
    (todo) => todo.urgent && !todo.important
  );
  const notUrgentImportantTodos = todos.filter(
    (todo) => !todo.urgent && todo.important
  );
  const notUrgentNotImportantTodos = todos.filter(
    (todo) => !todo.urgent && !todo.important
  );

  return (
    <div className="flex w-11/12 justify-around items-center flex-wrap mt-8">
      <div className=" w-5/12 bg-red-200 m-4 py-6">
        <h2 className="text-center font-semibold">Urgent and Important</h2>
        {urgentImportantTodos.map((todo) => (
          <SingleTodo
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
            color = {"red"}
          />
        ))}
      </div>
      <div className=" w-5/12 bg-orange-200 m-4 py-6">
        <h2 className="text-center font-semibold">Urgent and Not Important</h2>
        {urgentNotImportantTodos.map((todo) => (
          <SingleTodo
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
            color = {"orange"}
          />
        ))}
      </div>
      <div className=" w-5/12 bg-blue-200 m-4 py-6">
        <h2 className="text-center font-semibold">Not Urgent and Important</h2>
        {notUrgentImportantTodos.map((todo) => (
          <SingleTodo
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
            color = {"blue"}
          />
        ))}
      </div>
      <div className=" w-5/12 bg-green-200 m-4 py-6">
        <h2 className="text-center font-semibold">Not Urgent and Not Important</h2>
        {notUrgentNotImportantTodos.map((todo) => (
          <SingleTodo
            todos={todos}
            todo={todo}
            key={todo.id}
            setTodos={setTodos}
            color = {"green"}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

import React, { useContext } from 'react';
import SingleTodo from '../singleTodo/SingleTodo';
import { TodoContext } from '../../context/TodoContext';

const TodoList: React.FC = () => {
  
  const { state } = useContext(TodoContext);

  const { urgentImportantTodos, urgentNotImportantTodos, notUrgentImportantTodos, notUrgentNotImportantTodos } = state;

  return (
    <div className="flex w-11/12 justify-around items-center flex-wrap mt-8">
      <div className={` w-5/12 bg-red-200 m-4 py-6`}>
        <h2 className="text-center font-semibold">Urgent and Important</h2>
        {urgentImportantTodos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            color = {"red"}
          />
        ))}
      </div>
      <div className=" w-5/12 bg-orange-200 m-4 py-6">
        <h2 className="text-center font-semibold">Urgent and Not Important</h2>
        {urgentNotImportantTodos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            color = {"orange"}
          />
        ))}
      </div>
      <div className=" w-5/12 bg-blue-200 m-4 py-6">
        <h2 className="text-center font-semibold">Not Urgent and Important</h2>
        {notUrgentImportantTodos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            color = {"blue"}
          />
        ))}
      </div>
      <div className=" w-5/12 bg-green-200 m-4 py-6">
        <h2 className="text-center font-semibold">Not Urgent and Not Important</h2>
        {notUrgentNotImportantTodos.map((todo) => (
          <SingleTodo
            todo={todo}
            key={todo.id}
            color = {"green"}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;

import React, { useContext } from 'react';
import SingleTodo from '../singleTodo/SingleTodo';
import { TodoContext } from '../../context/TodoContext';
import { Todo } from '../../model/model';

const TodoList: React.FC = () => {
  const { state } = useContext(TodoContext);
  const { urgentImportantTodos, urgentNotImportantTodos, notUrgentImportantTodos, notUrgentNotImportantTodos } = state;

  const renderTodos = (todos: Todo[]): JSX.Element[] => {
    return todos.map((todo) => (
      <SingleTodo
        todo={todo}
        key={todo.id}
        color={getColor(todo)}
      />
    ));
  };

  const getColor = (todo: Todo): string => {
    if (todo.urgent && todo.important) return "red";
    if (todo.urgent && !todo.important) return "orange";
    if (!todo.urgent && todo.important) return "blue";
    return "green";
  };

  return (
    <div className="flex w-11/12 justify-around items-center flex-wrap mt-8">
      <div className="w-5/12 bg-red-200 m-4 py-6">
        <h2 className="text-center font-semibold">Urgent and Important</h2>
        {renderTodos(urgentImportantTodos)}
      </div>
      <div className="w-5/12 bg-orange-200 m-4 py-6">
        <h2 className="text-center font-semibold">Urgent and Not Important</h2>
        {renderTodos(urgentNotImportantTodos)}
      </div>
      <div className="w-5/12 bg-blue-200 m-4 py-6">
        <h2 className="text-center font-semibold">Not Urgent and Important</h2>
        {renderTodos(notUrgentImportantTodos)}
      </div>
      <div className="w-5/12 bg-green-200 m-4 py-6">
        <h2 className="text-center font-semibold">Not Urgent and Not Important</h2>
        {renderTodos(notUrgentNotImportantTodos)}
      </div>
    </div>
  );
};

export default TodoList;

import React, { useContext, useRef, useState } from 'react';
import { TodoContext } from '../../context/TodoContext';
import { Todo } from '../../model/model';

interface TodoData {
  todo: string;
  important: boolean;
  urgent: boolean;
}

export const InputField: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { dispatch } = useContext(TodoContext);
  const [todo, setTodo] = useState<TodoData>({ todo: '', important: false, urgent: false });

  const handleImportantToggle = () => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      important: !prevTodo.important,
    }));
  };

  const handleUrgentToggle = () => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      urgent: !prevTodo.urgent,
    }));
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (todo) {
      const newTodo: Todo = {
        id: Date.now(),
        todo: todo.todo,
        isDone: false,
        important: todo.important,
        urgent: todo.urgent,
      };

      dispatch({ type: 'ADD_TODO', todo: newTodo });
    }

    setTodo({ todo: '', important: false, urgent: false });
  };

  return (
    <form
      className="flex w-11/12 relative items-center"
      onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
      }}
    >
      <div className="relative w-full flex items-center">
        <input
          type="input"
          ref={inputRef}
          value={todo.todo}
          onChange={(e) => setTodo({ ...todo, todo: e.target.value })}
          placeholder="Enter a task"
          className=" w-full rounded-full px-8 py-5 pr-72 text-xl focus:outline-none focus:shadow-outline focus:shadow-xl focus:shadow-gray-700"
        />
        <div>
          
        </div>
        <div className="absolute right-12 flex items-center">
          {/* Checkbox and text for 'Important' */}
          <label className="mr-4 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              checked={todo.important}
              onChange={handleImportantToggle}
            />
            <span className="ml-2">Important</span>
          </label>

          {/* Checkbox and text for 'Urgent' */}
          <label className="mr-4 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              checked={todo.urgent}
              onChange={handleUrgentToggle}
            />
            <span className="ml-2">Urgent</span>
          </label>
        </div>

        <button className=" absolute right-0 z-10 w-12 h-12 m-1 rounded-full border-none text-base text-white bg-black transition-all shadow-md flex justify-center items-center hover:bg-white hover:text-black hover:border-black hover:active:scale-80 active:shadow-black" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

import React, { useContext, useRef } from 'react';
import { TodoContext } from '../../context/TodoContext';

export const InputField: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { dispatch } = useContext(TodoContext);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputRef.current?.value) return;

    const newTodo = {
      id: Date.now(),
      todo: inputRef.current.value,
      isDone: false,
      important: false,
      urgent: false,
    };

    dispatch({ type: 'ADD_TODO', todo: newTodo });
    inputRef.current.value = '';
  };

  return (
    <form className="flex w-11/12 relative items-center" onSubmit={handleAdd}>
      <div className="relative w-full flex items-center">
        <input
          type="input"
          ref={inputRef}
          placeholder="Enter a task"
          className="w-full rounded-full px-8 py-5 pr-72 text-xl focus:outline-none focus:shadow-outline focus:shadow-xl focus:shadow-gray-700"
        />
        <div className="absolute right-12 flex items-center">
          <label className="mr-4 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              onChange={() => {}} // Empty function to avoid warnings
            />
            <span className="ml-2">Important</span>
          </label>

          <label className="mr-4 flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
              onChange={() => {}} // Empty function to avoid warnings
            />
            <span className="ml-2">Urgent</span>
          </label>
        </div>

        <button className="absolute right-0 z-10 w-12 h-12 m-1 rounded-full border-none text-base text-white bg-black transition-all shadow-md flex justify-center items-center hover:bg-white hover:text-black hover:border-black hover:active:scale-80 active:shadow-black" type="submit">
          Add
        </button>
      </div>
    </form>
  );
};

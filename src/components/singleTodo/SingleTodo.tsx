import React, { useEffect, useRef, useState } from 'react';
import { Todo } from '../../model/model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';

interface Props {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  color: String;
}

const SingleTodo: React.FC<Props> = ({ todo, todos, setTodos, color }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo)));
    setEdit(false);
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleDone = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isDone: !todo.isDone } : todo)));
  };

  return (
    <form className={`flex h-15 border-none rounded-md p-3 mx-4 my-1 bg-${color}-200 text-black hover:bg-${color}-100 hover:shadow-sm hover:shadow-${color}-50`} onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="flex-1 p-1 border-none text-xs focus:outline-none"
          ref={inputRef}
        />
      ) : (
        <div className="flex-1 p-1 border-none text-xs focus:outline-none overflow-auto max-h-20">
          {todo.isDone ? <s>{todo.todo}</s> : <span>{todo.todo}</span>}
        </div>
      )}
      <div className="flex pt-1">
        <span
          className="flex ml-2 text-xl cursor-pointer"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit className="text-sm" />
        </span>
        <span className="flex ml-2 text-xl cursor-pointer" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete className="text-sm" />
        </span>
        <span className="flex ml-2 text-xl cursor-pointer" onClick={() => handleDone(todo.id)}>
          <MdDone className="text-sm" />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;

import React, { useContext, useEffect, useRef, useState } from 'react';
import { Todo } from '../../model/model';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { MdDone } from 'react-icons/md';
import { TodoContext } from '../../context/TodoContext';

interface Props {
  todo: Todo;
  color: String;
}

const SingleTodo: React.FC<Props> = ({ todo, color }) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const { dispatch } = useContext(TodoContext);

  const handleEdit = (id: number) => (e: React.FormEvent) => {
    e.preventDefault();
    const editedTodo: Todo = { ...todo, todo: editTodo };
    dispatch({ type: 'EDIT_TODO', id: id, todo: editedTodo });
    setEdit(false);
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_TODO', id: todo.id });
  };

  const handleDone = () => {
    const updatedTodo: Todo = { ...todo, isDone: !todo.isDone };
    dispatch({ type: 'EDIT_TODO', id: todo.id, todo: updatedTodo });
  };

  return (
    <form className={`flex h-15 border-none rounded-md p-3 mx-4 my-1 bg-${color}-300 text-black hover:bg-${color}-500 hover:shadow-sm hover:shadow-${color}-700`} onSubmit={handleEdit(todo.id)}>
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
        <span className="flex ml-2 text-xl cursor-pointer" onClick={handleDelete}>
          <AiFillDelete className="text-sm" />
        </span>
        <span className="flex ml-2 text-xl cursor-pointer" onClick={() => handleDone()}>
          <MdDone className="text-sm" />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;

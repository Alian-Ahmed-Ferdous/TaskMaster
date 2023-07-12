import React, { useState } from 'react'
import "../src/App.css"
import { InputField } from './components/InputField/InputField'
import { Todo } from './model/model'
import TodoList from './components/TodoList/TodoList'

interface todoData {
  todo: string;
  important: boolean;
  urgent: boolean;
}

const App: React.FC = () => {

  const [todo, setTodo] = useState<todoData>({ todo: '', important: false, urgent: false })
  const [todos, setTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(todo)

    if(todo) {
      setTodos([...todos,{ id: Date.now(), todo: todo.todo, isDone: false, important: todo.important,  urgent: todo.urgent}])
    }

    setTodo({ todo: '', important: false, urgent: false })
  };

  return (
      <div className='bg-neutral-800 w-screen min-h-screen flex flex-col	items-center font-mono'>
        <span className='uppercase text-5xl text-center	text-white my-8'>TaskMaster</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos}/>
      </div>
  )
}

export default App

import React from 'react'
import "../src/App.css"
import { InputField } from './components/InputField/InputField'
import TodoList from './components/TodoList/TodoList'

const App: React.FC = () => {
  return (
      <div className='bg-neutral-800 w-screen min-h-screen flex flex-col	items-center font-mono'>
        <span className='uppercase text-5xl text-center	text-white my-8'>TaskMaster</span>
        <InputField/>
        <TodoList/>
      </div>
  )
}

export default App
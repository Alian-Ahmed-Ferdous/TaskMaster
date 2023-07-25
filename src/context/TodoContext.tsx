import React, { createContext, Dispatch, ReactNode, useReducer } from 'react';
import { Todo } from '../model/model';

interface providerProp {
    children: ReactNode;
}

export interface TodoState {
  urgentImportantTodos: Todo[];
  urgentNotImportantTodos: Todo[];
  notUrgentImportantTodos: Todo[];
  notUrgentNotImportantTodos: Todo[];
}

export type TodoAction =
  | { type: 'ADD_TODO'; todo: Todo }
  | { type: 'EDIT_TODO'; id: number; todo: Todo }
  | { type: 'DELETE_TODO'; id: number };


const initialState: TodoState = {
  urgentImportantTodos: [],
  urgentNotImportantTodos: [],
  notUrgentImportantTodos: [],
  notUrgentNotImportantTodos: [],
};

export const TodoContext = createContext<{
  state: TodoState;
  dispatch: Dispatch<TodoAction>;
}>({ state: initialState, dispatch: () => {} });

const TodoReducer = (state: TodoState, action: TodoAction): TodoState => {
  switch (action.type) {
    case 'ADD_TODO':
      const { todo } = action;
      if (todo.urgent && todo.important) {
        return {
          ...state,
          urgentImportantTodos: [...state.urgentImportantTodos, todo],
        };
      } else if (todo.urgent && !todo.important) {
        return {
          ...state,
          urgentNotImportantTodos: [...state.urgentNotImportantTodos, todo],
        };
      } else if (!todo.urgent && todo.important) {
        return {
          ...state,
          notUrgentImportantTodos: [...state.notUrgentImportantTodos, todo],
        };
      } else {
        return {
          ...state,
          notUrgentNotImportantTodos: [...state.notUrgentNotImportantTodos, todo],
        };
      }
    case 'EDIT_TODO':
      const updatedTodos = {
        ...state,
        urgentImportantTodos: state.urgentImportantTodos.map((todo) =>
          todo.id === action.todo.id ? action.todo : todo
        ),
        urgentNotImportantTodos: state.urgentNotImportantTodos.map((todo) =>
          todo.id === action.todo.id ? action.todo : todo
        ),
        notUrgentImportantTodos: state.notUrgentImportantTodos.map((todo) =>
          todo.id === action.todo.id ? action.todo : todo
        ),
        notUrgentNotImportantTodos: state.notUrgentNotImportantTodos.map((todo) =>
          todo.id === action.todo.id ? action.todo : todo
        ),
      };
      return updatedTodos;
    case 'DELETE_TODO':
      return {
        ...state,
        urgentImportantTodos: state.urgentImportantTodos.filter(
          (todo) => todo.id !== action.id
        ),
        urgentNotImportantTodos: state.urgentNotImportantTodos.filter(
          (todo) => todo.id !== action.id
        ),
        notUrgentImportantTodos: state.notUrgentImportantTodos.filter(
          (todo) => todo.id !== action.id
        ),
        notUrgentNotImportantTodos: state.notUrgentNotImportantTodos.filter(
          (todo) => todo.id !== action.id
        ),
      };
    default:
      return state;
  }
};

export const TodoProvider: React.FC<providerProp> = ({ children }) => {
    const [state, dispatch] = useReducer(TodoReducer, initialState);
  
    return (
      <TodoContext.Provider value={{ state, dispatch }}>
        {children}
      </TodoContext.Provider>
    );
};

import { auth } from './instance';

export const signAPI = {
  goSignUp: data => auth.post(`/auth/signup`, data),
  goSignIn: data => auth.post(`/auth/signin`, data),
};

export const todoAPI = {
  createTodo: data => auth.post(`/todos`, data),
  getTodoById: id => auth.get(`/todos/${id}`),
  getTodos: () => auth.get(`/todos`),
  updateTodo: (todoId, data) => auth.put(`/todos/${todoId}`, data),
  deleteTodo: todoId => auth.delete(`/todos/${todoId}`),
};

// Usage
// 1. import this request ( import {signAPI} from ~~ )
// 2. use request ( sitnAPI.goSignUp(data)  )

// request body

// goSignUp
// email: string
// password: string

// goSignIn -- Login
// email: string
// password: string

// ------------------

// createTodo
// title: string
// content: string

// getTodoById
//  id: TodoId

// getTodos
// none

// updateTodo
// 1st : todoId
// 2st : data
// data:
// title: string
// content: string

// deleteTodo
// todoId: todoId

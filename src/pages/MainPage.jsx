import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import TodoCard from '../components/TodoCard';

function MainPage() {
  const navigate = useNavigate();
  const [todoList, setTodoList] = useState([]);
  const [userTodo, setUserTodo] = useState('');

  const getUserInput = e => {
    setUserTodo(e.target.value);
  };

  const getSubmit = async e => {
    try {
      e.preventDefault();
      const res = await axios.post(
        'https://pre-onboarding-selection-task.shop/todos',
        {
          todo: userTodo,
        },
        {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        }
      );

      setTodoList([...todoList, res.data]);
      setUserTodo('');
    } catch (error) {
      console.error(error);
    }
  };

  const getSyncTodos = async () => {
    try {
      const res = await axios.get('https://pre-onboarding-selection-task.shop/todos', {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      });
      setTodoList([...res.data]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSyncTodos();
    if (window.localStorage.getItem('token') === null) {
      navigate('/');
    }
  }, [navigate]);
  
  return (
    <StMainContainer>
      <StFormContainer onSubmit={getSubmit}>
        <input
          id="todo-input"
          onChange={getUserInput}
          value={userTodo}
          placeholder="할일을 입력해주세요."
        />
        <button>+</button>
      </StFormContainer>
      <StListContainer>
        {todoList.length === 0 && <div className="empty-notice">아직 할일이 없어요!</div>}
        {todoList.map(todo => {
          return <TodoCard info={todo} key={todo.id} syncData={getSyncTodos} />;
        })}
      </StListContainer>
    </StMainContainer>
  );
}

const StMainContainer = styled.div`
  width: 128rem;
  height: 95vh;
  padding: 2rem 0;
  background-color: #fcffe7;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StFormContainer = styled.form`
  width: 90%;
  height: 10rem;
  border-bottom: 0.4rem solid #eb455f;
  padding: 0 2rem 1rem 2rem;
  margin-bottom: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  #todo-input {
    flex: 1;
    height: 7rem;
    font-size: 2.5rem;
    background: none;
    border: none;
  }
  button {
    width: 7rem;
    height: 7rem;
    margin-left: 3rem;
    font-size: 3rem;
    background: none;
    color: #2b3467;
    font-weight: bold;
    border: 0.4rem solid #2b3467;
    cursor: pointer;
    border-radius: 50%;
  }
`;

const StListContainer = styled.div`
  flex: 1;
  width: 90%;
  padding: 0 2rem;
  background-color: #bad7e9;
  border: 0.3rem solid #2b3467;
  overflow-y: scroll;
  padding-top: 1rem;
  .empty-notice {
    height: 100%;
    font-size: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default MainPage;

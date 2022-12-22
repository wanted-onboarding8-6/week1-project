import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';

function TodoCard({ info, syncData }) {
  const { id, todo, isCompleted } = info;
  const [isEdit, setIsEdit] = useState(false);
  const [editContents, setEditContents] = useState(todo);
  
  const modifyBtnHandler = () => {
    setIsEdit(true);
  };

  const modifyCancelHandler = () => {
    setEditContents(todo);
    setIsEdit(false);
  };

  const userInputHandler = e => {
    setEditContents(e.target.value);
  };

  const submitEditContentsHandler = async e => {
    try {
      e.preventDefault();
      await axios.put(
        `https://pre-onboarding-selection-task.shop/todos/${id}`,
        {
          todo: editContents,
          isCompleted,
        },
        {
          headers: {
            Authorization: 'Bearer ' + window.localStorage.getItem('token'),
          },
        }
      );
      syncData();
      setIsEdit(false);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodoHandler = async () => {
    try {
      await axios.delete(`https://pre-onboarding-selection-task.shop/todos/${id}`, {
        headers: {
          Authorization: 'Bearer ' + window.localStorage.getItem('token'),
        },
      });
      syncData();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <StCardBody>
      {!isEdit && (
        <>
          {`할일: ${todo}`}
          {` / 완료여부: ${isCompleted}`}
          <div className="btn-wrapper">
            <button className="todo-modify-btn" onClick={modifyBtnHandler}>
              수정
            </button>
            <button className="todo-delete-btn" onClick={deleteTodoHandler}>
              삭제
            </button>
          </div>
        </>
      )}
      {isEdit && (
        <StModifyFormContainer onSubmit={submitEditContentsHandler}>
          <input className="user-modify-input" value={editContents} onChange={userInputHandler} />
          <div className="btn-wrapper">
            <button className="modify-complete-btn">완료</button>
            <button className="modify-cancel-btn" onClick={modifyCancelHandler}>
              취소
            </button>
          </div>
        </StModifyFormContainer>
      )}
    </StCardBody>
  );
}

const StCardBody = styled.div`
  width: 100%;
  height: 8rem;
  font-size: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  margin-bottom: 1rem;
  background-color: #ffffff;
  .btn-wrapper {
    button {
      width: 5.5rem;
      height: 5.5rem;
      background: none;
      border: 0.2rem solid #2b3467;
      border-radius: 50%;
      :nth-of-type(1) {
        margin-right: 1rem;
      }
      :hover {
        background-color: #eeeeee;
        cursor: pointer;
      }
    }
  }
`;

const StModifyFormContainer = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    flex: 1;
    margin-right: 2rem;
    height: 5rem;
    font-size: 2.5rem;
  }
`;

export default TodoCard;

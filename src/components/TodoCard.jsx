import React, { useCallback, useState } from 'react';
import { todoAPI } from '../api/api';
import styled from 'styled-components';

function TodoCard({ info, syncData }) {
  const { id, todo, isCompleted } = info;
  const [isEdit, setIsEdit] = useState(false);
  const [content, setContent] = useState({ todo, isCompleted });

  const modifyBtnHandler = () => {
    setIsEdit(true);
  };

  const modifyCancelHandler = () => {
    setContent({ ...content, todo: todo });
    setIsEdit(false);
  };

  const modifyInputHandler = e => {
    setContent(content => ({ ...content, todo: e.target.value }));
  };

  const updateTodoHandler = useCallback(
    async (content, e) => {
      try {
        e?.preventDefault();
        const editFormData = {
          todo: content.todo,
          isCompleted: content.isCompleted,
        };
        await todoAPI.updateTodo(id, editFormData);
        syncData();
      } catch (error) {
        console.error(error);
      }
    },
    [id, syncData]
  );

  const onSubmitContent = e => {
    updateTodoHandler(content, e);
    setIsEdit(false);
  };

  const onCheckClick = () => {
    setContent({ ...content, isCompleted: !isCompleted });
    updateTodoHandler({ ...content, isCompleted: !isCompleted });
  };

  const deleteTodoHandler = useCallback(async () => {
    try {
      await todoAPI.deleteTodo(id);
      syncData();
    } catch (error) {
      console.error(error);
    }
  }, [id, syncData]);

  return (
    <StCardBody>
      {!isEdit ? (
        <>
          <div className="input-wrapper">
            <StyledInput
              id={id}
              type="checkbox"
              checked={isCompleted}
              onChange={e => onCheckClick(e)}
            />
            <StyledLable htmlFor={id}>{`할일: ${todo}`}</StyledLable>
          </div>
          <div className="btn-wrapper">
            <button className="todo-modify-btn" onClick={modifyBtnHandler}>
              수정
            </button>
            <button className="todo-delete-btn" onClick={deleteTodoHandler}>
              삭제
            </button>
          </div>
        </>
      ) : (
        <StModifyFormContainer onSubmit={onSubmitContent}>
          <input className="user-modify-input" value={content.todo} onChange={modifyInputHandler} />
          <div className="btn-wrapper">
            <button type="submit" className="modify-complete-btn" onClick={onSubmitContent}>
              완료
            </button>
            <button type="button" className="modify-cancel-btn" onClick={modifyCancelHandler}>
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

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 2rem;
  height: 2rem;
  padding: 1.5rem;
  cursor: pointer;
  position: relative;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #2b3467;
  }
`;

const StyledLable = styled.label`
  position: relative;
  top: -1.1rem;
  padding: 10px;
`;

export default TodoCard;

import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function SignupPage() {
  const navigate = useNavigate();
  const [reqInputs, setReqInputs] = useState({ id: '', pw: '' });
  const [inputValidation, setInputValidation] = useState({
    idValid: false,
    pwValid: false,
  });

  const getReadInput = e => {
    if (e.target.id === 'register-id-input') {
      // eslint-disable-next-line
      const idReg = /^[a-zA-Z0-9+-\_.]*@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/gi;

      setReqInputs({ ...reqInputs, id: e.target.value });
      if (idReg.test(e.target.value)) {
        setInputValidation({ ...inputValidation, idValid: true });
      } else {
        setInputValidation({ ...inputValidation, idValid: false });
      }
    } else {
      setReqInputs({ ...reqInputs, pw: e.target.value });
      if (e.target.value.length >= 8) {
        setInputValidation({ ...inputValidation, pwValid: true });
      } else {
        setInputValidation({ ...inputValidation, pwValid: false });
      }
    }
  };
  
  const getSubmit = async e => {
    try {
      e.preventDefault();
      if (inputValidation.idValid && inputValidation.pwValid) {
        await axios.post('https://pre-onboarding-selection-task.shop/auth/signup', {
          email: reqInputs.id,
          password: reqInputs.pw,
        });
        alert('회원가입이 완료되었습니다!');
        navigate('/');
      }
    } catch (error) {
      alert('회원가입에 실패하였습니다.');
    }
  };

  return (
    <StFormContainer onSubmit={getSubmit}>
      <div className="input-wrapper">
        <label htmlFor="register-id-input">id(email)</label>
        <StFormInput
          id="register-id-input"
          onChange={getReadInput}
          placeholder="이메일 주소(xxxx@xxx.xxx)"
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="register-pw-input">pw</label>
        <StFormInput
          id="register-pw-input"
          onChange={getReadInput}
          placeholder="8자리 이상"
          type="password"
        />
      </div>

      <StFormBtn valid={inputValidation}>회원가입하기</StFormBtn>
    </StFormContainer>
  );
}

const StFormContainer = styled.form`
  width: 60rem;
  height: 50rem;
  padding: 7rem 0;
  margin: 6rem auto;
  border: 0.3rem solid #2b3467;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  .input-wrapper {
    width: 90%;
    display: flex;
    flex-direction: column;
    label {
      font-size: 2rem;
      margin-bottom: 0.3rem;
    }
    input {
      font-size: 2.3rem;
    }
  }
`;

const StFormInput = styled.input`
  width: 100%;
  height: 5rem;
`;

const StFormBtn = styled.button`
  width: 90%;
  height: 4rem;
  font-size: 2rem;
  background-color: ${({ valid }) => {
    if (!valid.idValid || !valid.pwValid) {
      return '#e9e9ed';
    } else {
      return '#bad7e9';
    }
  }};
  border: 0.2rem solid #2b3467;
  border-radius: 2rem;
  cursor: ${({ valid }) => {
    if (!valid.idValid || !valid.pwValid) {
      return 'not-allowed';
    } else {
      return 'pointer';
    }
  }};
`;

export default SignupPage;

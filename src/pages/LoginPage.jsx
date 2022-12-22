import React, { useEffect, useState } from 'react';
//import
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const navigate = useNavigate();
  const [reqInputs, setReqInputs] = useState({ id: '', pw: '' });
  const getReadInput = e => {
    if (e.target.id === 'user-id-input') {
      setReqInputs({ ...reqInputs, id: e.target.value });
    } else {
      setReqInputs({ ...reqInputs, pw: e.target.value });
    }
  };

  const getSubmit = async e => {
    try {
      e.preventDefault();
      const res = await signAPI.goSignIn({
        email: reqInputs.id,
        password: reqInputs.pw,
      });
      window.localStorage.setItem('token', res.data.access_token);
      navigate('/main');
    } catch (error) {
      console.error(error);
    }
  };

  const getSignUp = e => {
    e.preventDefault();
    navigate('/signup');
  };

  useEffect(() => {
    if (window.localStorage.getItem('token') !== null) {
      navigate('/main');
    }
  }, [navigate]);
  return (
    <StFormContainer onSubmit={getSubmit}>
      <div className="input-wrapper">
        <label htmlFor="user-id-input">id</label>
        <StFormInput
          id="user-id-input"
          name="user-id-input"
          onChange={getReadInput}
          value={reqInputs.id}
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="user-pw-input">pw</label>
        <StFormInput
          id="user-pw-input"
          name="user-pw-input"
          onChange={getReadInput}
          value={reqInputs.pw}
          type="password"
        />
      </div>

      <StFormBtn>로그인하기</StFormBtn>
      <StFormBtn onClick={getSignUp}>회원가입하기</StFormBtn>
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
  background-color: #bad7e9;
  border: 0.2rem solid #2b3467;
  border-radius: 2rem;
  cursor: pointer;
`;

export default LoginPage;

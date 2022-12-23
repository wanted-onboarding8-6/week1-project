# 원티드 프리온보딩 8차 - 1주차 과제

-리팩토링 대상 \
https://github.com/TaeTaehoon/wanted-pre-onboarding-frontend \
선정이유 : 회의를 거친 결과 가장 보기에 편하고 디렉토리 구조가 깔끔하다는 결론이 나와 해당 repo를 기준으로 리팩토링을 진행하기로 결정. \

-주요 리팩토링 내용 \

- api파트를 따로 디렉토리를 나누고 **개별 파일**로 만들어서 관리하고 import 하여 사용하기.
- useCallback, react.memo를 이용하여 적극적으로 컴포넌트와 함수를 **메모이제이션**하여 사용하기.
- access-token을 context api를 이용하여 **전역상태**로 참조하기.
- router파트를 따로 디렉토리를 나누어 **가시성**을 높이기.
- 위 내용들에 따른 전반적인 프로젝트 디렉토리 구조 변경하기.

## 리팩토링 전/후 비교

## 1. 디렉토리 구조

### 리팩토링 전

```bash
src
   ├── App.jsx # entrypoint
   ├── App.test.js
   ├── components
   │   └── TodoCard.jsx
   ├── index.css
   ├── index.js
   │
   └── pages
       ├── LoginPage.jsx
       ├── MainPage.jsx
       └── SignupPage.jsx
```

### 리팩토링 후

```bash
src
   ├── App.jsx # entrypoint
   ├── App.test.js
   ├── components
   │   └── TodoCard.jsx
   ├── index.css
   ├── index.js
   ├── pages
   │   ├── LoginPage.jsx
   │   ├── MainPage.jsx
   │   └── SignupPage.jsx
   │
   ├── Router
   │   └── Routes.jsx
   └── api
       ├── api.js
       └── instance.js
```

## 2. 리팩토링 결과와 이유

1. 에러 발생 시 alert 알림 추가<br/>

```
 catch (error) {
      alert('입력사항을 확인해주세요');
    }
```

2. API 디렉토리를 생성하여 HTTP request 코드를 통합관리하고 Axios instance를 통한 headers 값 설정 등 코드 간소화

```javascript
// src/api/instance.js
import axios from 'axios';

export const auth = axios.create({
  baseURL: process.env.REACT_APP_AUTH_URL,
});

auth.interceptors.request.use(config => {
  const accessToken = localStorage.getItem('token');

  if (!accessToken) {
    config.headers.Authorization = null;
  } else {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

// src/api/api.js
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

// src/pages/SignupPage.jsx
const createAccount = async e => {
  try {
    e.preventDefault();
    if (inputValidation.idValid && inputValidation.pwValid) {
      await signAPI.goSignUp({ email: reqInputs.id, password: reqInputs.pw });
      alert('회원가입이 완료되었습니다!');
      navigate('/');
    }
  } catch (error) {
    alert('회원가입에 실패하였습니다.');
  }
};
```

3. Private 함수를 이용한 redirect처리, ul 직접 접근 방지처리

4. Router 디렉토리를 분리하여 라우터 설정 관리

```javascript
// src/Router/Routes.jsx

function Router() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Private to="/todo">
            <LoginPage />
          </Private>
        }
      />
      {...}
    </Routes>
  );
}

```

5. && 연산자 대신 옵셔널체이닝과 삼항연산자 사용, 함수 네이밍 컨벤션 변경으로 코드 경량화와 가독성

```javascript
  // src/components/TodoCard.jsx
  const updateTodoHandler = useCallback(
    async (content, e) => {
      try {
        e ?. e.preventDefault();
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

  const deleteTodoHandler = useCallback(async () => {
    try {
      await todoAPI.deleteTodo(id);
      syncData();
    } catch (error) {
      console.error(error);
    }
  }, [id, syncData]);
  
  ...
  
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
  
  
```

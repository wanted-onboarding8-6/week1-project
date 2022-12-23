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

2. API 디렉토리를 생성하여 HTTP request 코드를 통합관리하고 Axios instance를 통한 코드 경량화
3. Private 함수를 이용한 redirect처리, ul 직접 접근 방지처리
4. Router 디렉토리를 분리하여 라우터 설정 관리
5. && 연산자 대신 삼항연산자 사용, 함수 네이밍 컨벤션 변경으로 코드 경량화와 가독성

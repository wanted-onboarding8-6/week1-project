import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function Router() {
  const Private = ({ children, to: direction, main }) => {
    const isLoggedIn = useMemo(() => localStorage.getItem('TOKEN'), []);

    if (isLoggedIn && !main) {
      return <Navigate to={direction} replace />;
    }
    if (!isLoggedIn && main) {
      return <Navigate to={direction} replace />;
    }

    return children;
  };

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
      <Route
        path="/signup"
        element={
          <Private to="/todo">
            <SignupPage />
          </Private>
        }
      />
      <Route
        path="/todo"
        element={
          <Private to="/" main>
            <MainPage />
          </Private>
        }
      />
    </Routes>
  );
}

export default Router;

/* 
'/main' -> '/todo'
- 로컬 스토리지에 토큰이 있는 상태로 '/' 페이지에 접속한다면 '/todo' 경로로 리다이렉트.
- 로컬 스토리지에 토큰이 없는 상태로 '/todo'페이지에 접속한다면 '/' 경로로 리다이렉트.
*/

import React, { useMemo } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';

function Router() {
  const isLoggedIn = useMemo(() => localStorage.getItem('TOKEN'), []);

  return (
    <Routes>
      <Route path="/" element={!isLoggedIn ? <LoginPage /> : <Navigate to="/todo" />} />
      <Route path="/signup" element={!isLoggedIn ? <SignupPage /> : <Navigate to="/todo" />} />
      <Route path="/todo" element={!isLoggedIn ? <Navigate to="/" /> : <MainPage />} />
      {/* '/main' -> '/todo' */}
    </Routes>
  );
}

export default Router;

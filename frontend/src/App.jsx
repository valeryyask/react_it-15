// src/App.jsx — КОРНЕВОЙ КОМПОНЕНТ.
// Задачи: 1) узнать авторизованного пользователя из Redux-хранилища (слайс auth);
//         2) описать маршруты (какая страница на каком адресе);
//         3) показывать навигацию на всех страницах и окно загрузки поверх всего.

import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { logout, selectCurrentUser } from "./store/authSlice";
import Nav from "./components/Nav";
import LoadingOverlay from "./components/LoadingOverlay";
import HomePage from "./pages/HomePage";
import AgentsPage from "./pages/AgentsPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";

function App() {
  const dispatch = useDispatch();

  // currentUser — текущий пользователь из state.auth.user; null = никто не вошёл.
  const currentUser = useSelector(selectCurrentUser);

  // Вызывается по кнопке "Выйти" в Nav
  const handleLogout = () => dispatch(logout());

  return (
    <>
      {/* Nav показывается на каждой странице, т.к. стоит ВНЕ <Routes> */}
      <Nav currentUser={currentUser} onLogout={handleLogout} />

      <main className="content">
        <Routes>
          {/* Адрес "/" — таблица недвижимости. Защищённый маршрут */}
          <Route
            path="/"
            element={
              currentUser ? <HomePage /> : <Navigate to="/login" replace />
            }
          />

          {/* Адрес "/agents" — вторая форма (риелторы на TanStack Table). Защищена */}
          <Route
            path="/agents"
            element={
              currentUser ? <AgentsPage /> : <Navigate to="/login" replace />
            }
          />

          {/* Адрес "/login" — авторизация */}
          <Route path="/login" element={<LoginPage />} />

          {/* Адрес "/register" — регистрация */}
          <Route path="/register" element={<RegisterPage />} />

          {/* "*" — любой другой адрес */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Окно загрузки поверх всего приложения при авторизации/регистрации */}
      <LoadingOverlay />
    </>
  );
}

export default App;

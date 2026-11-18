// src/pages/LoginPage.jsx — СТРАНИЦА АВТОРИЗАЦИИ.
// Вход через Redux: dispatch(loginUser(...)) -> thunk проверяет аккаунт ->
// authSlice сохраняет пользователя в хранилище. При успехе переходим на "/" (useNavigate).

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, clearAuthError, selectAuthError } from "../store/authSlice";
import ErrorMessage from "../components/ErrorMessage";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(loginUser({ login, password }))
      .unwrap()
      .then(() => navigate("/"))
      .catch(() => {});
  };

  return (
    <section className="card">
      <h2>Авторизация</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Логин / Email</label>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="admin или user"
          />
        </div>
        <div className="field">
          <label>Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••"
          />
        </div>
        <ErrorMessage message={error} />
        <button type="submit" className="btn btn-primary">
          Войти
        </button>
      </form>
      <div style={{ marginTop: "16px", fontSize: "14px", textAlign: "center" }}>
        <span>Нет аккаунта? </span>
        <Link to="/register">Зарегистрироваться</Link>
      </div>
      <div style={{ marginTop: "12px", fontSize: "12px", opacity: 0.7, textAlign: "center" }}>
        Тест: admin / admin123 или user / user123
      </div>
    </section>
  );
}

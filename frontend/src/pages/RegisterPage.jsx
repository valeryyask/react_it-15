// src/pages/RegisterPage.jsx — СТРАНИЦА РЕГИСТРАЦИИ.
// Регистрация через Redux: dispatch(registerUser(...)). При успехе — переход на /login.

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  registerUser,
  clearAuthError,
  selectAuthError,
} from "../store/authSlice";
import ErrorMessage from "../components/ErrorMessage";

export default function RegisterPage() {
  const [name, setName] = useState("");
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

    dispatch(registerUser({ login, password, name }))
      .unwrap()
      .then(() => navigate("/login"))
      .catch(() => {});
  };

  return (
    <section className="card">
      <h2>Регистрация</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="field">
          <label>Имя</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ваше имя"
          />
        </div>
        <div className="field">
          <label>Логин / Email</label>
          <input
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            placeholder="Придумайте логин"
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
          Зарегистрироваться
        </button>
      </form>
      <div style={{ marginTop: "16px", fontSize: "14px", textAlign: "center" }}>
        <span>Уже есть аккаунт? </span>
        <Link to="/login">Войти</Link>
      </div>
    </section>
  );
}

// src/components/Nav.jsx — ПАНЕЛЬ НАВИГАЦИИ.
// Компонент "глупый": ничего не хранит, только показывает данные из props.

import { Link, NavLink } from "react-router-dom";

export default function Nav({ currentUser, onLogout }) {
  return (
    <nav className="nav">
      {currentUser ? (
        <>
          <Link to="/" className="nav-brand">
            🏠 Недвижимость
          </Link>
          <NavLink to="/" end>
            Объекты
          </NavLink>
          <NavLink to="/agents">Риелторы</NavLink>
          <span className="nav-spacer" />
          <span className="nav-user">Здравствуйте, {currentUser.name}</span>
          <button type="button" className="btn btn-outline" onClick={onLogout}>
            Выйти
          </button>
        </>
      ) : (
        <>
          <span className="nav-brand">🏠 Недвижимость</span>
          <span className="nav-spacer" />
          <Link to="/login">Войти</Link>
          <Link to="/register">Регистрация</Link>
        </>
      )}
    </nav>
  );
}

/**
 * Управление пользователями на основе JSON + localStorage.
 */
import initialUsersData from './users.json';

const STORAGE_KEY = 'real_estate_users_v1';
const SESSION_KEY = 'real_estate_session_v1';

/** Загрузить всех пользователей из localStorage (или из JSON по умолчанию) */
export function loadUsers() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return initialUsersData;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  } catch (e) {
    console.warn('Ошибка загрузки пользователей', e);
  }
  return initialUsersData;
}

/** Сохранить массив пользователей в localStorage */
export function saveUsers(users) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.warn('Ошибка сохранения пользователей', e);
  }
}

/** Найти пользователя по email и паролю (простая проверка) */
export function findUser(email, password) {
  const users = loadUsers();
  return users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  ) || null;
}

/** Проверить, занят ли email */
export function isEmailTaken(email) {
  const users = loadUsers();
  return users.some((u) => u.email.toLowerCase() === email.toLowerCase());
}

/** Добавить нового пользователя */
export function registerUser(name, email, password) {
  const users = loadUsers();
  const newUser = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password
  };
  saveUsers([...users, newUser]);
  return newUser;
}

/** Сохранить текущую сессию (залогиненный пользователь) */
export function saveSession(user) {
  try {
    // Не храним пароль в сессии
    const { password: _pw, ...safeUser } = user;
    localStorage.setItem(SESSION_KEY, JSON.stringify(safeUser));
  } catch (e) {
    console.warn('Ошибка сохранения сессии', e);
  }
}

/** Загрузить текущую сессию */
export function loadSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

/** Удалить сессию (выход) */
export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (e) {
    console.warn('Ошибка удаления сессии', e);
  }
}

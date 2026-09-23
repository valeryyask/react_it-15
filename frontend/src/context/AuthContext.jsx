import { createContext, useContext, useState } from 'react';
import { findUser, registerUser, isEmailTaken, saveSession, loadSession, clearSession } from '../data/mockUsers';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => loadSession());

  const login = (email, password) => {
    if (!email.trim() || !password) {
      return { ok: false, error: 'Заполните все поля' };
    }
    const found = findUser(email, password);
    if (!found) {
      return { ok: false, error: 'Неверный email или пароль' };
    }
    saveSession(found);
    setUser({ id: found.id, name: found.name, email: found.email });
    return { ok: true };
  };

  const register = (name, email, password) => {
    if (!name.trim() || !email.trim() || !password) {
      return { ok: false, error: 'Заполните все поля' };
    }
    if (isEmailTaken(email)) {
      return { ok: false, error: 'Такой email уже зарегистрирован' };
    }
    const newUser = registerUser(name, email, password);
    saveSession(newUser);
    setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
    return { ok: true };
  };

  const logout = () => {
    clearSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

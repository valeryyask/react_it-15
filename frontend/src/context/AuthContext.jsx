import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'ma_estate_auth_user';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    // Primitive mock login: accept any non-empty credentials or default demo
    const cleanEmail = (email || '').trim();
    if (!cleanEmail || !password) {
      return { success: false, error: 'Please enter both email/agent ID and password' };
    }

    const namePart = cleanEmail.split('@')[0] || 'Kenjiro Sato';
    const formattedName = namePart
      .split(/[._-]/)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    const authenticatedUser = {
      email: cleanEmail,
      name: formattedName || 'Kenjiro Sato',
      role: 'Senior Real Estate Advisor',
      kanji: '佐藤 健次郎',
      agency: 'Ma Estate (間 不動産)',
      loginAt: new Date().toISOString()
    };

    setUser(authenticatedUser);
    try {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authenticatedUser));
    } catch (e) {
      console.warn('Could not save auth to localStorage', e);
    }

    return { success: true, user: authenticatedUser };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
    } catch (e) {
      console.warn('Could not remove auth from localStorage', e);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

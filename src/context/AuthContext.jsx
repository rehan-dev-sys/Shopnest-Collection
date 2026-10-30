import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('currentUser');
    return saved ? JSON.parse(saved) : null;
  });

  const getUsers = () => JSON.parse(localStorage.getItem('users')) || [];

  const register = (name, email, password) => {
    const users = getUsers();
    const emailLower = email.toLowerCase();

    if (users.find((u) => u.email === emailLower)) {
      return { success: false, message: 'This email is already registered' };
    }

    users.push({ name, email: emailLower, password });
    localStorage.setItem('users', JSON.stringify(users));
    return { success: true };
  };

  const login = (email, password) => {
    const found = getUsers().find(
      (u) => u.email === email.toLowerCase() && u.password === password
    );

    if (!found) {
      return { success: false, message: 'Invalid email or password' };
    }

    const currentUser = { name: found.name, email: found.email };
    setUser(currentUser);
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
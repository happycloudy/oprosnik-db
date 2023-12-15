import { AuthContext } from '../../context/AuthContext.jsx';
import { useState } from 'react';

const PageContainer = ({ children }) => {
  const [authData, setAuthData] = useState({
    token: localStorage.getItem('token'),
    id: localStorage.getItem('userId'),
    role: localStorage.getItem('role'),
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    setAuthData({ token: '', id: '', role: '' });
  };

  const handleLogin = (token, id, role) => {
    localStorage.setItem('token', `Bearer ${token}`);
    localStorage.setItem('userId', id);
    localStorage.setItem('role', role);
    setAuthData({ token: `Bearer ${token}`, id, role });
  };

  return (
    <AuthContext.Provider value={{ ...authData, handleLogin, handleLogout }}>
      <main className={'flex flex-col h-screen w-screen'}>{children}</main>
    </AuthContext.Provider>
  );
};

export default PageContainer;

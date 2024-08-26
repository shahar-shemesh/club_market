import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './store';

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import { login as authLoginAction } from './store/features/authSlice';
import Error from './pages/Error';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY: string = process.env.REACT_APP_SECRET_KEY!;

const App: React.FC = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const storedUser = Cookies.get('user');
    const isAuthenticated = Cookies.get('isAuthenticated');

    if (storedUser && isAuthenticated === 'true') {
      // dispatch(authLoginAction({ username: JSON.parse(storedUser).username, userId: JSON.parse(storedUser).userId }));
      const bytes = CryptoJS.AES.decrypt(storedUser, SECRET_KEY);
      const decryptedUser = bytes.toString(CryptoJS.enc.Utf8);
      dispatch(authLoginAction({ username: JSON.parse(decryptedUser).username, userId: JSON.parse(decryptedUser).userId }));
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={auth ? <Home /> : <SignIn />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
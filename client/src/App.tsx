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

const App: React.FC = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const isAuthenticated = localStorage.getItem('isAuthenticated');

    if (storedUser && isAuthenticated === 'true') {
      dispatch(authLoginAction({ username: JSON.parse(storedUser).username, userId: JSON.parse(storedUser).userId }));
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
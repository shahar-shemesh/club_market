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


// return (
//   <Box sx={{
//     display: 'grid',
//     gridTemplateRows: 'auto 1fr auto',
//     gridTemplateAreas: `
//         "header"
//         "content"
//         "footer"
//       `,
//     minHeight: '100vh',
//     maxHeight: '100vh',
//   }}>

//     <Header />


//     <Box
//       sx={{
//         gridArea: 'content',
//         overflowY: 'hidden',
//         padding: '3rem 7rem',
//         display: 'grid',
//         gridTemplateRows: '1fr 2fr 6fr',
//         gridTemplateColumns: '2fr 6fr',
//         gridTemplateAreas: `
//         "totalItems totalItems"
//         "recommands rocky"
//         "addProduct productList"
//       `,
//       }}>


//       <TotalItems />
//       <Assistant />
//       <ProductList />
//       <AddProduct />


//     </Box>


//     <Footer />
//     <ToastContainer
//       position="top-center"
//       autoClose={5000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       rtl
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//     />
//   </Box>
// );
// };

// export default App;
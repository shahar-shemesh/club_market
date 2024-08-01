import ReactDOM from 'react-dom/client';
import theme from './styles/theme';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);



root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <GlobalStyles
      styles={{
        /* עיצוב מסילת הגלילה */
        '::-webkit-scrollbar': {
          width: '8px',
        },
        /* עיצוב הרקע של מסילת הגלילה */
        '::-webkit-scrollbar-track': {
          background: theme.palette.secondary.main,
          borderRadius: '10px',
        },
        /* עיצוב ה-thumb */
        '::-webkit-scrollbar-thumb': {
          backgroundColor: theme.palette.primary.main,
          borderRadius: '10px',
        },
        /* עיצוב ה-thumb בזמן hover */
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#007A56',
        },
      }}
    />
    <Provider store={store}>
      <App />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Provider>
  </ThemeProvider>

);



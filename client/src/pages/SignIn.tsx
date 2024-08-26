import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { login } from '../services/auth';
import { toast } from 'react-toastify';
import { login as authLoginAction } from '../store/features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const SECRET_KEY:string = process.env.REACT_APP_SECRET_KEY!;



function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©  '}
            <Link color="inherit" href="https://shahar.website/">
                קלאבמרקט
            </Link>{' '}
            {new Date().getFullYear()}
        </Typography>
    );
}

export default function SignIn() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = data.get('username');
        const pass = data.get('password');
        const remember = data.get('remember');
        console.log(remember);
        const loginAuth = async () => {
            try {
                const userLogged = await login(user!.toString(), pass!.toString());
                if (userLogged) {
                    console.log(userLogged);
                    dispatch(authLoginAction({ username: userLogged.username, userId: userLogged.userId }));
                    if (remember) {
                        const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userLogged), SECRET_KEY).toString();
                        console.log(encryptedUser);
                        Cookies.set('user', encryptedUser, { expires: 7 }); 
                        Cookies.set('isAuthenticated', 'true', { expires: 7 }); 
                    }
                    toast.success('ההתחברות בוצעה בהצלחה');
                    setTimeout(() => navigate('/'), 1000);
                }
            } catch (error) {
                toast.error('ההתחברות נכשלה. נסה שוב');
                console.error('Failed to fetch categories:', error);
            }
        };
        loginAuth();

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    כניסה
                </Typography>
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="שם משתמש"
                        name="username"
                        autoComplete="username"
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="סיסמה"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox color="primary" name="remember" />}
                        label="זכור אותי"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            display: 'flex',
                            backgroundColor: 'primary.main',
                            color: '#FFF',
                            borderRadius: '2rem',
                            border: '2px solid',
                            borderColor: 'transparent',
                            padding: '0.5rem 0',
                            margin: '1rem 0',
                            width: '100%',
                            '&:hover': {
                                backgroundColor: 'secondary.main',
                                color: 'primary.main',
                                border: '2px solid',
                                borderColor: 'primary.main',
                            },
                        }}
                    >
                        התחבר
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                שכחתי סיסמה
                            </Link>
                        </Grid>
                        <Grid item>
                            <Link href="/sign-up" variant="body2">
                                {"אין לך חשבון? הצטרף עכשיו"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
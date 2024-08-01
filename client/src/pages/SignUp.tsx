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
import { login, register } from '../services/auth';
import { toast } from 'react-toastify';
import { login as authLoginAction } from '../store/features/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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

export default function SignUp() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = data.get('username');
        const pass = data.get('password');
        const registerUser = async () => {
            try {
                const newUser = await register(user!.toString(), pass!.toString());
                if (newUser) {
                    console.log(newUser);
                    dispatch(authLoginAction({ username: newUser.username, userId: newUser.id }));
                    toast.success('ההרשמה בוצעה בהצלחה');
                    setTimeout(() => navigate('/'), 1000);
                }
            } catch (error) {
                toast.error('ההרשמה נכשלה. נסה שוב');
                console.error('Failed to fetch categories:', error);
            }
        };
        registerUser();

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
                <Avatar sx={{ m: 1, bgcolor: 'text.primary' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    הרשמה
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
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="אני מעוניין לקבל הודעות, מבצעים ועדכונים דרך המייל"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{
                            display: 'flex',
                            backgroundColor: 'text.primary',
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
                        הרשם
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="/sign-in" variant="body2">
                                {"יש לך חשבון? התחבר"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}
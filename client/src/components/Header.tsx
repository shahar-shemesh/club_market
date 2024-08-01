import { Box, Typography, IconButton, Badge, Avatar, Link } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { totalProductsItems } from '../store';
import { RootState } from '../store';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import { logout } from '../store/features/authSlice';

const Header: React.FC = () => {

    const dispatch = useDispatch();
    const totalItems = useSelector(totalProductsItems);
    const username = useSelector((state: RootState) => state.auth.username);

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
    };

    return (
        <Box
            sx={{
                padding: '1rem 4rem',
                gridArea: 'header',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                bgcolor: 'primary.main',
            }}
        >

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>

                    <Link 
                        onClick={handleLogout}
                        variant="h1"
                        sx={{
                            cursor: 'pointer',
                            transition: 'all .4s',
                            '&:hover': {
                                scale: '1.1',
                            },
                        }}>
                        <ExitToAppOutlinedIcon sx={{ color: 'white', mr: 4 }} />

                    </Link>

                    <Badge badgeContent={totalItems} color="error">
                        <ShoppingCartIcon sx={{ color: 'white', scale: '1.3' }} />
                    </Badge>
                    <Typography sx={{ color: 'white', ml: 0 }}>
                        הסל שלי
                        ({totalItems + " "}מוצרים)
                    </Typography>
                </Box>


                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar sx={{ bgcolor: 'white', color: 'black', fontWeight: 'bold' }}>{username ? username[0].toUpperCase() : "אורח"}</Avatar>
                    <Typography sx={{ color: 'white', ml: 1, direction: 'rtl' }}>היי, {username}!</Typography>
                </Box>
            </Box>



            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ color: 'white', mr: 2, direction: 'rtl' }}>
                    מועדון הצרכנות הגדול במדינה!
                </Typography>
                <IconButton
                    sx={{
                        bgcolor: 'black',
                        color: 'white',
                        borderRadius: '20px',
                        padding: '5px 15px',
                        transition: 'all .4s',
                        '&:hover': {
                            bgcolor: 'black',
                            scale: '1.1',
                        },
                    }}
                >
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '1.5rem', // קביעת רוחב ה-SVG
                        height: '1.5rem', // קביעת גובה ה-SVG
                    }}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 84 73"
                            width="100%"
                            height="100%"
                        >
                            <path
                                stroke="#000"
                                strokeWidth="4.4"
                                d="M2 36.5C2 71 2 71 42 71s40 0 40-34.5S82 2 42 2 2 2 2 36.5zm25.5-25.3C28.3 15.1 35 54 35 55c0 .7 4.9 1 13.7.8 13.8-.3 13.8-.3 14.9-8.3 3-21.5 3.9-19.5-8-19.5C45 28 45 28 45 23.5S45 19 61.3 19c16.4 0 16.4 0 13.6 21.2-1.6 11.7-2.8 22.1-2.9 23 0 1.7-1.8 1.8-22.8 1.8-22.9 0-22.9 0-26.6-21.2-2.1-11.7-4-22.1-4.2-23-.4-1.3-1.8-1.8-5.7-2-5.2-.3-5.2-.3-5.5-5.1C6.9 9 6.9 9 16.9 9c9.6 0 10.1.1 10.6 2.2z"
                            />
                            <path
                                fill="#FFF"
                                stroke="#FFF"
                                strokeWidth="4.4"
                                d="M8 14c0 4 0 4 5.5 4 3 0 5.5.3 5.5.8 0 .4 1.8 10.7 4 23 2.2 12.2 4 22.4 4 22.7s9.9.5 21.9.5c21.9 0 21.9 0 22.5-3.8.3-2 1.5-10.9 2.6-19.7s2.3-17.5 2.6-19.3c.5-3.2.5-3.2-15.6-3.2-16 0-16 0-16 4s0 4 11 4c6.1 0 11 .2 11 .5 0 .8-3 22.8-3.6 26.3-.5 3.3-.5 3.3-14.7 3-14.1-.3-14.1-.3-18.1-23.6C26.5 10 26.5 10 17.3 10 8 10 8 10 8 14z"
                            />
                        </svg>
                    </Box>

                    <Typography sx={{
                        bgcolor: 'black',
                        fontSize: '1.5rem',
                        fontWeight: 'bold',
                        color: 'white',
                        '&:hover': {
                            bgcolor: 'unset',
                        },
                    }}>
                        קלאבמרק
                    </Typography>

                </IconButton>
            </Box>
        </Box>
    );
};

export default Header;
function dispatch(arg0: { payload: undefined; type: "auth/logout"; }) {
    throw new Error('Function not implemented.');
}


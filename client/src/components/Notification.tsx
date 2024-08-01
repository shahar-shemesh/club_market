import React from 'react';
import { Box, Typography } from '@mui/material';

const Notification: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'secondary.main', // צבע רקע ירוק בהיר
                padding: '1rem', // ריווח פנימי
                borderRadius: '2rem', // פינות מעוגלות מאוד
                textAlign: 'center', // יישור טקסט למרכז
                margin: '0 auto', // מרכז את הקומפוננטה
                marginTop: '1.3rem',
                letterSpacing: '0.5px'
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    color: 'text.primary'
                }}>
                יש לאסוף מוצרים אלו במחלקות המתאימות
            </Typography>
        </Box >
    );
};

export default Notification;

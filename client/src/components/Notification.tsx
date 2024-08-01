import React from 'react';
import { Box, Typography } from '@mui/material';

const Notification: React.FC = () => {
    return (
        <Box
            sx={{
                backgroundColor: 'secondary.main',
                padding: '1rem',
                borderRadius: '2rem',
                textAlign: 'center',
                margin: '0 auto',
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

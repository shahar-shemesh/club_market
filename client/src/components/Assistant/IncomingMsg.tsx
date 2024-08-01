import { Box, Typography } from '@mui/material';
import React from 'react';


const IncomingMsg: React.FC<{ message: string }> = (props) => {

    return (
        <Box
            sx={{
                backgroundColor: 'secondary.main',
                direction: 'rtl',
                borderRadius: '20px',
                padding: '10px 20px',
                mb: 3,
            }}
        >
            <Typography sx={{
                fontWeight: '600',
            }}>
                {props.message}
            </Typography>
        </Box>
    );
};


export default IncomingMsg;



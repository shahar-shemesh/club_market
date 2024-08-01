import { Box, Typography } from '@mui/material';
import React from 'react';


const OutcomingMsg: React.FC<{ message: string }> = (props) => {

    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                width: '90%',
                direction: 'rtl',
                border: '2px solid',
                borderColor: 'secondary.main',
                borderRadius: '20px',
                padding: '10px 20px',
                mb: 3,
            }}
        >
            <Typography>
                {props.message}
            </Typography>
        </Box>
    );
};


export default OutcomingMsg;



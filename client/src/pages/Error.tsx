import { Box } from '@mui/material';
import React from 'react';
import { useRouteError, isRouteErrorResponse } from 'react-router-dom';

interface ErrorResponse {
    status: number;
    data: {
        message: string;
    };
}

export default function Error() {
    const error = useRouteError();

    let title = 'An error occurred.';
    let message = 'Something went wrong..';

    if (isRouteErrorResponse(error)) {
        if (error.status === 500) {
            message = (error as ErrorResponse).data.message;
        }

        if (error.status === 404) {
            title = "Not Found.";
            message = "Could not find resource or page.";
        }
    }

    return (
        <Box>
            <p>{message}</p>
        </Box>
    );
}

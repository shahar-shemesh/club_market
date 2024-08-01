import { Box, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { totalProductsItems  } from '../store';

const TotalItems: React.FC<{}> = () => {

    const totalItems = useSelector(totalProductsItems);

    return (
        <Box sx={{
            gridArea: 'totalItems',
            display: 'flex',
            direction: 'rtl'
        }}>
            <Typography
                sx={{
                    color: 'black',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    marginBottom: '2rem'
                }}>
                הסל שלי
                ({totalItems + " "}מוצרים)
            </Typography>
        </Box>
    );
};


export default TotalItems;
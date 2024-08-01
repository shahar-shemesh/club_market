import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import ProductListItem from './ProductListItem';
import Notification from './Notification';
import { useSelector } from 'react-redux';
import { RootState } from '../store';


const ProductList: React.FC = () => {
    const products = useSelector((state: RootState) => state.products.items);


    return (
        <Box sx={{
            textAlign: 'right',
            gridArea: 'productList',
            maxHeight: '70%',
            minHeight: '72%',

        }}>


            <Typography
                sx={{
                    color: 'text.primary',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    textAlign: 'right'
                }}>
                הסל שלי
            </Typography>


            <Box sx={{
                padding: '2rem',
                borderRadius: '16px',
                border: '2px solid',
                borderColor: 'secondary.main',
                overflowY: 'auto',
                maxHeight: '70%',
                minHeight: '100%',

            }}>


                {products.map((item, index) => (
                    <React.Fragment key={index}>
                        <ProductListItem item={item} />
                        {index < products.length - 1 && <Divider />}
                    </React.Fragment>
                ))}
            </Box>

            <Notification />
        </Box>
    );
};

export default ProductList;

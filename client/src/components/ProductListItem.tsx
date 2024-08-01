import { Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux';

import { updateProductAmount as updateProductAmountAction } from '../store/features/productSlice';
import { RootState } from '../store';


interface ProductListItemProps {
    item: {
        id: number;
        name: string;
        amount: number;
        category: number | string;
        price?: number;
        imageUrl?: string;
    };
}

const ProductListItem: React.FC<ProductListItemProps> = ({ item }) => {

    const dispatch = useDispatch();

    const categories = useSelector((state: RootState) => state.categories.categories);
    const itemCategory = categories.find(cat => cat.id === item.category);

    const categoryName = itemCategory ? itemCategory.name : 'Category not found';

    return (
        <Box sx={{
            display: 'flex',
            alignItems: 'center',
            m: 3
        }}>
            <Box sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center'
            }}>
                <IconButton
                    onClick={() => dispatch(updateProductAmountAction({ id: item.id, sign: '+' }))}
                    size="small"
                    sx={{
                        border: '1px solid',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        borderRadius: '50%',
                        mr: 2
                    }}>
                    <AddIcon />
                </IconButton>

                <Typography>{item.amount}</Typography>
                <IconButton
                    onClick={() => dispatch(updateProductAmountAction({ id: item.id, sign: '-' }))}
                    size="small"
                    sx={{
                        border: '1px solid',
                        borderColor: 'primary.main',
                        color: 'primary.main',
                        borderRadius: '50%',
                        ml: 2
                    }}>
                    <RemoveIcon />
                </IconButton>
            </Box>

            <Box sx={{ flex: 4, ml: 2 }}>
                <Typography sx={{
                    color: 'primary.main'
                }}>
                    {categoryName}
                </Typography>

                <Typography sx={{
                    fontWeight: '700'
                }}>{item.name} x {item.amount}</Typography>
            </Box>

            <Box sx={{
                flex: 1,
                ml: 2
            }}>
                {item.imageUrl && (<img src={item.imageUrl} alt={item.name} style={{ width: '80px', height: 'auto' }} />
                )}
            </Box>
        </Box >
    );
};

export default ProductListItem;

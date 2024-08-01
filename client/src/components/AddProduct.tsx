import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct as addProductAction } from '../store/features/productSlice';
import {
    Box,
    Button,
    TextField,
    Typography,
    IconButton,
    InputAdornment,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { toast } from 'react-toastify';

import { RootState } from '../store';
import axios from 'axios';
import { setCategories } from '../store/features/categorySlice';
import { createShoppingList } from '../services/api';
import { selectAllProducts, clearProducts } from '../store/features/productSlice';


const AddProduct: React.FC = () => {
    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

    const dispatch = useDispatch();
    const categories = useSelector((state: RootState) => state.categories.categories);
    const currUser = useSelector((state: RootState) => state.auth.userId);
    const products = useSelector(selectAllProducts);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_BASE_URL}/categories`);
                dispatch(setCategories(response.data));
            } catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        };

        fetchCategories();
    }, []);


    const [productName, setProductName] = useState('');
    const [productCategory, setProductCategory] = useState('');

    const handleAddProduct = () => {
        if (productName.trim()) {
            dispatch(addProductAction({ name: productName.trim(), category: Number(productCategory) }));
            setProductName('');
            setProductCategory('');
        }
    };

    const handleCreateOrder = async () => {
        try {
            if (products.length <= 0) {
                toast.error('יש צורך להוסיף מוצרים לרשימה');
                return;
            }
            
            const productData = products.map(product => ({
                name: product.name,
                category_id: typeof product.category === 'number' ? product.category : 0,
                amount: product.amount
            }));

            // קריאה ל-API לשלוח את רשימת המוצרים לשרת
            const response = await createShoppingList(currUser!, productData);
            console.log('Shopping list created successfully:', response);
            toast.success('ההזמנה בוצעה בהצלחה');
            dispatch(clearProducts());

        } catch (error) {
            console.error('Failed to submit shopping list:', error);
        }
    };


    return (

        <Box sx={{
            gridArea: 'addProduct',
            height: 'min-content',
        }}>

            <Typography
                sx={{
                    color: 'primary.main',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    textAlign: 'right'
                }}>
                הוספת מוצרים מהירה
            </Typography>

            <Box
                sx={{
                    gridArea: 'addProduct',
                    border: '2px solid',
                    borderColor: 'secondary.main',
                    borderRadius: '2rem',
                    padding: '1.5rem',
                    maxWidth: '25vw',
                    height: 'auto',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >

                <TextField
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                    placeholder="הקלד שם מוצר"
                    variant="outlined"
                    fullWidth
                    sx={{
                        marginBottom: '1.5rem',
                        '& .MuiOutlinedInput-root': {
                            borderRadius: '2rem',
                            '& input': {
                                textAlign: 'right', // מיקום ה-placeholder בצד ימין
                            },
                            '& .MuiInputAdornment-root': {
                                position: 'relative',
                                left: '1rem', // מיקום ה-icon בצד שמאל
                                transform: 'translateX(-50%)',
                            },
                        },
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <IconButton sx={{ color: '#ffff', ml: 0, backgroundColor: 'primary.main', scale: '0.75' }}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <FormControl fullWidth variant="outlined" sx={{ marginBottom: '50%', borderRadius: '2rem' }}>
                    <InputLabel id="category-label">
                        קטגוריה
                    </InputLabel>

                    <Select
                        sx={{ borderRadius: '2rem', direction: 'rtl' }}
                        labelId="category-label"
                        label="קטגוריה"
                        defaultValue=""
                        value={productCategory}
                        onChange={(e) => setProductCategory(e.target.value)}
                        IconComponent={ExpandMoreIcon}
                    >
                        {categories.map((category, index) => (
                            <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    sx={{
                        display: 'flex',
                        backgroundColor: 'primary.main',
                        color: '#FFF',
                        borderRadius: '2rem',
                        border: '2px solid',
                        borderColor: 'transparent',
                        padding: '0.3rem 0',
                        width: '100%',
                        '&:hover': {
                            backgroundColor: 'secondary.main',
                            color: 'primary.main',
                            border: '2px solid',
                            borderColor: 'primary.main',
                        },
                    }}
                    onClick={handleAddProduct}
                >
                    הוספה לסל
                </Button>
            </Box>


            <Button
                variant="contained"
                sx={{
                    display: 'flex',
                    backgroundColor: 'text.primary',
                    color: '#FFF',
                    borderRadius: '2rem',
                    border: '2px solid',
                    borderColor: 'transparent',
                    padding: '0.9rem 0',
                    width: '90%',
                    margin: '1rem auto',
                    '&:hover': {
                        backgroundColor: 'secondary.main',
                        color: 'primary.main',
                        border: '2px solid',
                        borderColor: 'primary.main',
                    },
                }}
                onClick={handleCreateOrder}
            >
                צור הזמנה
            </Button>


        </Box>);
};

export default AddProduct;

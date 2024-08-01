import { Box, Container } from '@mui/material';

import Header from '../components/Header';
import Footer from '../components/Footer';
import AddProduct from '../components/AddProduct';
import TotalItems from '../components/TotalItems';
import ProductList from '../components/ProductList';
import Assistant from '../components/Assistant/Assistant';
import Recommended from '../components/Recommended';



const Home: React.FC = () => {


    return (
        <Box sx={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            gridTemplateAreas: `
          "header"
          "content"
          "footer"
        `,
            minHeight: '100vh',
            maxHeight: '100vh',
        }}>

            <Header />

            <Box
                sx={{
                    gridArea: 'content',
                    overflowY: 'hidden',
                    padding: '3rem 7rem',
                    display: 'grid',
                    gap:3,
                    gridTemplateRows: '1fr 2fr 6fr',
                    gridTemplateColumns: '2fr 6fr',
                    gridTemplateAreas: `
          "totalItems totalItems"
          "recommended rocky"
          "addProduct productList"
        `,
                }}>


                <TotalItems />
                <Recommended />
                <Assistant />
                <ProductList />
                <AddProduct />


            </Box>


            <Footer />

        </Box>
    );
};

export default Home;
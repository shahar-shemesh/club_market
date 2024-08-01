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
            <Container>
                <Box
                    sx={{
                        gridArea: 'content',
                        overflowY: 'hidden',
                        padding: { xs: '0', md: '3rem 7rem' },
                        display: 'grid',
                        gap: { xs: 0, md: 10 },
                        gridTemplateRows: { xs: '1fr 3fr 3fr 3fr', md: '1rem 2fr 6fr' },
                        gridTemplateColumns: { xs: '1fr', md: '5fr 6fr' },
                        gridTemplateAreas: {
                            xs: `
          "totalItems"
          "rocky"
          "addProduct"
          "productList"
        `,
                            md: `
          "totalItems totalItems"
          "recommended rocky"
          "addProduct productList"
        `,
                        }
                    }}>


                    <TotalItems />
                    <Recommended />
                    <Assistant />
                    <ProductList />
                    <AddProduct />

                </Box>
            </Container >
            <Footer />
        </Box >
    );
};

export default Home;
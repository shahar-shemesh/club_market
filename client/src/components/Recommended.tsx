
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


const Recommended: React.FC = () => {



    return (

        <Box sx={{
            gridArea: 'recommended',
            height: '100%',
        }}>

            <Typography
                sx={{
                    color: 'text.main',
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '0.5rem',
                    textAlign: 'right'
                }}>
                מוצרים מומלצים עבורך
            </Typography>

            <Box
                sx={{
                    border: '2px solid',
                    borderColor: 'secondary.main',
                    borderRadius: '2rem',
                    padding: '1.5rem',
                    maxWidth: '25vw',
                    minHeight: '90%',
                    margin: '0 auto',
                    textAlign: 'center',
                }}
            >

             

                
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
                >
                    הוספה לסל
                </Button>
            </Box>




        </Box>);
};

export default Recommended;

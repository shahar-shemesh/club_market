import { createTheme, ThemeProvider, MenuItem } from '@mui/material';
import { Palette, PaletteOptions } from '@mui/material/styles';

// הרחבת הצבעים עבור הערכת נושא
declare module '@mui/material/styles' {
    interface Palette {
        customGreen: Palette['primary'];
    }

    interface PaletteOptions {
        customGreen?: PaletteOptions['primary'];
    }
}

const theme = createTheme({
    palette: {
        primary: {
            main: '#00ba65',
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#daf5eb',
            contrastText: '#000000', 
        },
        customGreen: {
            main: '#00ba65',
            light: '#E0F7F1', // רקע ירוק בהיר
            dark: '#007A56', // ירוק כהה
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF', // רקע ראשי לבן
        },
        text: {
            primary: '#000000', // טקסט ראשי שחור
            secondary: '#000000', // טקסט משני אפור כהה
        },
    },
    typography: {
        fontFamily: '"IBM Plex Sans Hebrew", sans-serif;',
        h1: {
            fontSize: '2rem',
            fontWeight: 600,
            color: '#000000',
            direction: 'rtl',
        },
        h2: {
            fontSize: '1.5rem',
            fontWeight: 500,
            color: '#000000',
            direction: 'rtl',
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400,
            color: '#000000',
        },

    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none', // ללא אותיות גדולות
                    borderRadius: 8, // פינות מעוגלות
                    backgroundColor: '#fff',
                    color: 'black',
                    fontWeight: 'bold'
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    textAlign: 'right',
                    direction: 'rtl',
                    '&:hover': {
                        backgroundColor: 'secondary.main', // רקע כחול כהה בזמן מעבר עכבר
                        color: 'primary.main', // צבע טקסט לבן בזמן מעבר עכבר
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'primary.main', // רקע כחול עבור אובייקט נבחר
                        color: 'primary.main', // צבע טקסט לבן עבור אובייקט נבחר
                    },
                },
            },
        },
    },
});


export default theme;
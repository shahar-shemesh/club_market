import { createTheme } from '@mui/material';

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
            light: '#E0F7F1',
            dark: '#007A56',
            contrastText: '#FFFFFF',
        },
        background: {
            default: '#FFFFFF',
        },
        text: {
            primary: '#000000',
            secondary: '#000000',
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
                    textTransform: 'none',
                    borderRadius: 8,
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
                        backgroundColor: 'secondary.main',
                        color: 'primary.main', 
                    },
                    '&.Mui-selected': {
                        backgroundColor: 'primary.main', 
                        color: 'primary.main',
                    },
                },
            },
        },
    },
});


export default theme;
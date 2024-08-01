import React from 'react';
import { Box, Typography, Button, Link } from '@mui/material';


const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        gridArea: 'footer',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        justifyContent: { xs: 'center', md: 'space-between' },
        alignItems: 'center',
        padding: '10px 20px',
        borderTop: '2px solid #daf5eb',
        textAlign: { xs: 'center', md: 'left' },
      }}
    >

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 2,
          mb: { xs: 2, md: 0 },
        }}
      >
        <Link sx={{ fontSize: '0.875rem', color: '#000000' }}>
          דברו איתנו
        </Link>
        <Typography sx={{ fontSize: '0.875rem', color: '#000000' }}>
          דרגו אותנו
        </Typography>
        <Typography sx={{ fontSize: '0.875rem', color: '#000000' }}>
          הרשמה למועדון שלנו
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Typography sx={{ fontSize: '0.875rem', color: '#000000' }}>
          כל הזכויות שמורות לקלאבמרקט קמעונאות בע"מ 2024
        </Typography>
        <Button
          variant="outlined"
          sx={{
            borderRadius: '20px',
            borderColor: 'black',
            color: 'black',
            padding: '2px 12px',
            textTransform: 'none',
            mt: { xs: 1, md: 0 },
            '&:hover': {
              bgcolor: '#f0f0f0',
              borderColor: 'black',
            },
          }}
        >
          קלאבמרקט
        </Button>
      </Box>
    </Box>
  );
};

export default Footer;

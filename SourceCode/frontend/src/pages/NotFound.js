import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Typography, Button } from '@mui/material';

const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    container: { mt: '180px', mb: '100px', textAlign: 'center' },
    code: { fontWeight: 900, fontSize: '8rem', lineHeight: 1 }
};

const NotFound = () => {
    return (
        <Container maxWidth="md" sx={styles.container}>
            <Typography variant="h1" sx={{ ...styles.code, color: styles.primaryColor, fontFamily: styles.fontFamily }}>
                404
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, fontFamily: styles.fontFamily }}>
                Page Not Found
            </Typography>
            <Typography sx={{ color: '#666', mb: 4, fontFamily: styles.fontFamily }}>
                The page you are looking for might have been removed or is temporarily unavailable.
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="contained"
                size="large"
                sx={{ bgcolor: '#111', color: '#fff', fontWeight: 800, px: 4, py: 1.5, fontFamily: styles.fontFamily, '&:hover': { bgcolor: '#333' } }}
            >
                GO TO HOMEPAGE
            </Button>
        </Container>
    );
};

export default NotFound;
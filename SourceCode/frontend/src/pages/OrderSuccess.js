import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Typography, Button } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    successColor: '#27ae60'
};

const OrderSuccess = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container maxWidth="sm" sx={{ mt: '180px', mb: '100px', textAlign: 'center' }}>
            <Box sx={{ color: styles.successColor, mb: 3 }}>
                <CheckCircleOutlineIcon sx={{ fontSize: '6rem' }} />
            </Box>

            <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, fontFamily: styles.fontFamily, textTransform: 'uppercase' }}>
                Thank You!
            </Typography>

            <Typography variant="h6" sx={{ color: '#666', mb: 4, fontFamily: styles.fontFamily }}>
                Your order has been placed successfully.
            </Typography>

            <Typography sx={{ mb: 5, color: '#888', fontFamily: styles.fontFamily }}>
                You will receive an email confirmation shortly. Your gear is on its way to fuel your ambition!
            </Typography>

            <Button
                component={Link}
                to="/"
                variant="contained"
                size="large"
                sx={{
                    bgcolor: '#111',
                    color: '#fff',
                    fontWeight: 800,
                    px: 5, py: 1.5,
                    fontFamily: styles.fontFamily,
                    '&:hover': { bgcolor: styles.primaryColor }
                }}
            >
                BACK TO HOME
            </Button>
        </Container>
    );
};

export default OrderSuccess;
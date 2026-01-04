import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, Button, Paper, Divider } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    card: {
        flex: 1,
        p: 5,
        borderRadius: '12px',
        border: '1px solid #eee',
        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    iconBox: {
        width: 60,
        height: 60,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        mb: 3
    }
};

const AuthGate = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Sign In or Continue | EMR Supplement";
        window.scrollTo(0, 0);
    }, []);

    // Navigation Helper
    const handleNavigate = (path, state) => {
        navigate(path, { state });
    };

    return (
        <Container maxWidth="md" sx={{ mt: '160px', mb: '100px', textAlign: 'center' }}>

            <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 2, fontFamily: styles.fontFamily }}>
                Checkout <span style={{ color: styles.primaryColor }}>Options</span>
            </Typography>
            <Typography sx={{ color: '#666', mb: 6, fontSize: '1.1rem', fontFamily: styles.fontFamily }}>
                How would you like to proceed with your order?
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'stretch' }}>

                {/* --- OPTION 1: Returning Customer --- */}
                <Paper elevation={0} sx={styles.card}>
                    <Box sx={{ ...styles.iconBox, bgcolor: '#e3f2fd', color: '#1976d2' }}>
                        <LoginIcon fontSize="large" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, fontFamily: styles.fontFamily }}>Returning Customer</Typography>
                    <Typography sx={{ color: '#666', mb: 4, fontFamily: styles.fontFamily }}>Sign in to access your saved address and complete your order faster.</Typography>

                    <Button
                        onClick={() => handleNavigate('/login', { from: '/checkout' })}
                        variant="contained"
                        fullWidth
                        sx={{ mt: 'auto', bgcolor: '#111', py: 1.5, fontWeight: 'bold', fontFamily: styles.fontFamily, '&:hover': { bgcolor: '#333' } }}
                    >
                        Sign In
                    </Button>
                </Paper>

                {/* --- OPTION 2: New Customer --- */}
                <Paper elevation={0} sx={styles.card}>
                    <Box sx={{ ...styles.iconBox, bgcolor: '#fce4ec', color: styles.primaryColor }}>
                        <PersonAddIcon fontSize="large" />
                    </Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 2, fontFamily: styles.fontFamily }}>New Customer</Typography>
                    <Typography sx={{ color: '#666', mb: 4, fontFamily: styles.fontFamily }}>Create an account to track orders, save items, and get rewards.</Typography>

                    <Button
                        onClick={() => handleNavigate('/login', { mode: 'register', from: '/checkout' })}
                        variant="outlined"
                        fullWidth
                        sx={{
                            mt: 'auto', borderColor: styles.primaryColor, color: styles.primaryColor, py: 1.5, fontWeight: 'bold', fontFamily: styles.fontFamily,
                            '&:hover': { borderColor: '#b00320', bgcolor: '#fff0f3' }
                        }}
                    >
                        Create Account
                    </Button>
                </Paper>

            </Box>

            <Divider sx={{ my: 6 }}>OR</Divider>

            {/* --- OPTION 3: Guest Checkout --- */}
            <Box sx={{ maxWidth: '500px', mx: 'auto' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontFamily: styles.fontFamily }}>Guest Checkout</Typography>
                <Typography sx={{ color: '#666', mb: 3, fontFamily: styles.fontFamily }}>Don't want to create an account? No problem.</Typography>
                <Button
                    onClick={() => navigate('/checkout')}
                    endIcon={<ArrowForwardIcon />}
                    sx={{ color: '#000', fontWeight: 'bold', textDecoration: 'underline', fontFamily: styles.fontFamily, '&:hover': { color: styles.primaryColor } }}
                >
                    Continue as Guest
                </Button>
            </Box>

        </Container>
    );
};

export default AuthGate;
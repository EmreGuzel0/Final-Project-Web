import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Snackbar, Alert } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckoutForm from '../components/CheckoutForm';

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    successColor: '#27ae60',
    summaryPaper: {
        p: 3,
        borderRadius: '12px',
        boxShadow: '0 5px 20px rgba(0,0,0,0.05)',
        border: '1px solid #eee',
        position: 'sticky',
        top: '120px'
    }
};

const Checkout = ({ cart, clearCart }) => {
    const navigate = useNavigate();
    const [showSuccess, setShowSuccess] = useState(false);

    useEffect(() => {
        document.title = "Secure Checkout | EMR Supplement";
        // Redirect to Home if cart is empty (Security)
        if (cart.length === 0 && !showSuccess) {
            navigate('/');
        }
        window.scrollTo(0, 0);
    }, [cart, navigate, showSuccess]);

    const subtotal = cart.reduce((total, item) => total + (item.price * item.amount), 0);

    // Payment Simulation
    const handlePayment = (e) => {
        e.preventDefault();
        setShowSuccess(true);
        clearCart(); // Clear the Global Cart State
        setTimeout(() => {
            navigate('/order-success');
        }, 2000);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: '140px', mb: '60px' }}>

            {/* Success Notification */}
            <Snackbar open={showSuccess} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ top: '130px !important' }}>
                <Alert icon={<CheckCircleIcon sx={{ color: '#fff !important' }} />} sx={{ bgcolor: styles.successColor, color: '#fff', fontWeight: 'bold', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', fontSize: '1rem', alignItems: 'center' }}>
                    Payment Successful!
                </Alert>
            </Snackbar>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5, alignItems: 'flex-start' }}>

                {/* LEFT: Payment Form */}
                <Box sx={{ flex: 2, width: '100%' }}>
                    <CheckoutForm onSubmit={handlePayment} id="checkout-form" />
                </Box>

                {/* RIGHT: Order Summary */}
                <Box sx={{ flex: 1, width: '100%', minWidth: '300px' }}>
                    <Paper elevation={0} sx={styles.summaryPaper}>
                        <Typography variant="h6" sx={{ borderBottom: '1px solid #eee', pb: 1, mb: 2, fontWeight: 800, fontFamily: styles.fontFamily }}>
                            Order Summary
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                            {cart.map(item => (
                                <Box key={item.id} sx={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#333' }}>
                                    <Typography sx={{ fontFamily: styles.fontFamily }}>
                                        <span style={{ fontWeight: 'bold' }}>{item.amount}x</span> {item.title}
                                    </Typography>
                                    <Typography sx={{ fontWeight: '600', fontFamily: styles.fontFamily }}>
                                        {(item.price * item.amount).toLocaleString()} ₺
                                    </Typography>
                                </Box>
                            ))}
                        </Box>

                        <Box sx={{ mt: 3, pt: 2, borderTop: '2px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: styles.fontFamily }}>TOTAL</Typography>
                            <Typography variant="h5" sx={{ fontWeight: 900, color: styles.primaryColor, fontFamily: styles.fontFamily }}>
                                {subtotal.toLocaleString()} ₺
                            </Typography>
                        </Box>

                        {/* Button: Trigger form submission remotely via ID */}
                        <Button
                            type="submit"
                            form="checkout-form"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, py: 2, bgcolor: styles.successColor, color: '#fff', fontWeight: 900, fontSize: '1rem', borderRadius: '8px', '&:hover': { bgcolor: '#219150' }, fontFamily: styles.fontFamily }}
                        >
                            CONFIRM AND PAY
                        </Button>
                    </Paper>
                </Box>
            </Box>
        </Container>
    );
};

export default Checkout;
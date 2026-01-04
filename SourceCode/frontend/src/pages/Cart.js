import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Paper, Divider } from '@mui/material';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CartItem from '../components/CartItem';

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    colors: {
        primary: '#d90429',
        primaryHover: '#b90322',
        secondary: '#27ae60',
        secondaryHover: '#219150',
        textLight: '#666',
        bgLight: '#f8f8f8'
    },
    container: {
        mt: '140px',
        mb: '60px',
        minHeight: '60vh'
    },
    sectionTitle: {
        fontWeight: 900,
        textTransform: 'uppercase',
        borderBottom: '2px solid #eee',
        pb: 2,
        mb: 3
    },
    summaryPaper: {
        p: 3,
        borderRadius: '12px',
        boxShadow: '0 5px 25px rgba(0,0,0,0.05)',
        position: 'sticky',
        top: '120px',
        border: '1px solid #eee'
    }
};

// 🧩 Sub-component for Empty State
const EmptyCartView = () => (
    <Box sx={{ textAlign: 'center', py: 6 }}>
        <ShoppingBasketIcon sx={{ fontSize: '3.5rem', color: '#eee', mb: 2 }} />
        <Typography sx={{ color: styles.colors.textLight, fontSize: '1.1rem', mb: 3, fontFamily: styles.fontFamily }}>
            Your cart is empty.
        </Typography>
        <Button
            component={Link}
            to="/"
            variant="outlined"
            sx={{
                color: styles.colors.primary,
                borderColor: styles.colors.primary,
                borderWidth: '2px',
                fontWeight: 900,
                px: 4,
                py: 1.5,
                fontFamily: styles.fontFamily,
                '&:hover': {
                    borderWidth: '2px',
                    borderColor: styles.colors.primaryHover,
                    bgcolor: 'rgba(217, 4, 41, 0.05)'
                }
            }}
        >
            START SHOPPING
        </Button>
    </Box>
);

const Cart = ({ cart, setCart, user }) => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Cart | EMR Supplement";
        window.scrollTo(0, 0);
    }, []);

    // 🧮 Calculate Total
    const subtotal = (cart || []).reduce((total, item) => total + (item.price * item.amount), 0);
    const isCartEmpty = cart.length === 0;

    // 🎮 Actions
    const updateQty = (id, change) => {
        setCart(prev => prev.map(item =>
            item.id === id ? { ...item, amount: Math.max(1, item.amount + change) } : item
        ));
    };

    const removeItem = (id) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const handleCheckout = () => {
        if (isCartEmpty) return;
        user ? navigate('/checkout') : navigate('/auth-gate');
    };

    return (
        <Container maxWidth="lg" sx={styles.container}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4, alignItems: 'flex-start' }}>

                {/* --- LEFT: Product List --- */}
                <Box sx={{ flex: 2, width: '100%', minWidth: '300px' }}>
                    <Typography variant="h5" sx={{ ...styles.sectionTitle, fontFamily: styles.fontFamily }}>
                        Your Shopping Cart
                    </Typography>

                    {isCartEmpty ? (
                        <EmptyCartView />
                    ) : (
                        cart.map(item => (
                            <CartItem
                                key={item.id}
                                item={item}
                                updateQty={updateQty}
                                removeItem={removeItem}
                            />
                        ))
                    )}
                </Box>

                {/* --- RIGHT: Summary & Checkout --- */}
                {!isCartEmpty && (
                    <Box sx={{ flex: 1, width: '100%', minWidth: '300px' }}>
                        <Paper elevation={0} sx={styles.summaryPaper}>
                            <Typography variant="h6" sx={{ ...styles.sectionTitle, borderBottom: '2px solid #f8f8f8', fontFamily: styles.fontFamily }}>
                                Summary
                            </Typography>

                            {/* Subtotal */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography sx={{ color: styles.colors.textLight, fontFamily: styles.fontFamily }}>Subtotal</Typography>
                                <Typography sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily }}>
                                    {subtotal.toLocaleString()} ₺
                                </Typography>
                            </Box>

                            {/* Cargo */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                <Typography sx={{ color: styles.colors.textLight, fontFamily: styles.fontFamily }}>Shipping</Typography>
                                <Typography sx={{ color: styles.colors.secondary, fontWeight: 'bold', fontFamily: styles.fontFamily }}>
                                    FREE
                                </Typography>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            {/* Grand Total */}
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                                <Typography sx={{ fontWeight: 900, fontSize: '1.2rem', fontFamily: styles.fontFamily }}>TOTAL</Typography>
                                <Typography sx={{ fontWeight: 900, color: styles.colors.primary, fontSize: '1.5rem', fontFamily: styles.fontFamily }}>
                                    {subtotal.toLocaleString()} ₺
                                </Typography>
                            </Box>

                            {/* Button */}
                            <Button
                                onClick={handleCheckout}
                                fullWidth
                                variant="contained"
                                sx={{
                                    py: 1.8,
                                    bgcolor: styles.colors.secondary,
                                    color: '#fff',
                                    borderRadius: '8px',
                                    fontWeight: 900,
                                    fontSize: '1rem',
                                    letterSpacing: '0.5px',
                                    fontFamily: styles.fontFamily,
                                    '&:hover': { bgcolor: styles.colors.secondaryHover }
                                }}
                            >
                                Proceed to Checkout
                            </Button>

                            <Button
                                component={Link}
                                to="/"
                                fullWidth
                                startIcon={<ChevronLeftIcon />}
                                sx={{
                                    mt: 2,
                                    color: '#888',
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    fontFamily: styles.fontFamily,
                                    '&:hover': { bgcolor: 'transparent', color: '#000' }
                                }}
                            >
                                Continue Shopping
                            </Button>
                        </Paper>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

export default Cart;
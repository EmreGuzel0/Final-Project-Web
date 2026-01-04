import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Box, Typography, Badge, IconButton, useScrollTrigger, Slide } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

// 🎨 Styles configuration
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    appBar: {
        bgcolor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        height: '100px',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
        justifyContent: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
    },
    userBadge: {
        width: 45,
        height: 45,
        bgcolor: '#fff',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#d90429',
        border: '2px solid #f5f5f5',
        boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
        transition: '0.3s',
        '&:hover': {
            borderColor: '#d90429',
            boxShadow: '0 4px 15px rgba(217, 4, 41, 0.2)'
        }
    }
};

// 👇 Helper component for scroll animation of Navbar
function HideOnScroll(props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide
            appear={false}
            direction="down"
            in={!trigger}
            timeout={{ enter: 400, exit: 300 }}
            easing={{ enter: 'cubic-bezier(0.4, 0, 0.2, 1)', exit: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
        >
            {children}
        </Slide>
    );
}

const Navbar = (props) => {
    const { cart, user, window } = props;
    const totalItems = (cart || []).reduce((acc, item) => acc + (item.amount || 0), 0);
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    // ✨ Dynamic style generator based on scroll state
    const getAnimatedStyle = (delay) => ({
        transform: !trigger ? 'translateY(0)' : 'translateY(-30px)',
        opacity: !trigger ? 1 : 0,
        transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`
    });

    return (
        <React.Fragment>
            <HideOnScroll {...props}>
                <AppBar position="fixed" elevation={0} sx={styles.appBar}>
                    <Toolbar sx={{ justifyContent: 'space-between', px: '40px !important' }}>


                        {/* Logo Section */}
                        <Box sx={getAnimatedStyle(50)}>
                            <Link to="/">
                                <Box component="img" src="/pictures/logo.png" alt="Logo" sx={{ height: '90px', display: 'block' }} />
                            </Link>
                        </Box>

                        <Box sx={{ display: 'flex', gap: '25px', alignItems: 'center' }}>

                            {/* User Profile / Login Link */}
                            <Box sx={getAnimatedStyle(150)}>
                                {user ? (
                                    <Link to="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '12px' }}>
                                        <Box sx={styles.userBadge}>
                                            <PersonIcon sx={{ fontSize: '1.7rem' }} />
                                        </Box>
                                        <Typography sx={{ fontWeight: '700', fontSize: '0.95rem', color: '#000', textTransform: 'uppercase', fontFamily: styles.fontFamily }}>
                                            {user.username || user.name}
                                        </Typography>
                                    </Link>
                                ) : (
                                    <Link to="/login" style={{ color: '#111', textDecoration: 'none' }}>
                                        <IconButton sx={{ color: '#111' }}>
                                            <PersonOutlineIcon sx={{ fontSize: '1.6rem' }} />
                                        </IconButton>
                                    </Link>
                                )}
                            </Box>

                            {/* Cart Icon with Badge */}
                            <Box sx={getAnimatedStyle(250)}>
                                <Link to="/cart" style={{ color: '#111', textDecoration: 'none' }}>
                                    <IconButton sx={{ color: '#111' }}>
                                        <Badge
                                            badgeContent={totalItems}
                                            sx={{ '& .MuiBadge-badge': { bgcolor: styles.primaryColor, color: '#fff', fontWeight: 'bold', border: '2px solid #fff' } }}
                                        >
                                            <ShoppingBasketIcon sx={{ fontSize: '1.6rem' }} />
                                        </Badge>
                                    </IconButton>
                                </Link>
                            </Box>

                        </Box>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>

            {!isHomePage && <Box sx={{ height: '100px' }} />}

        </React.Fragment>
    );
};

export default Navbar;
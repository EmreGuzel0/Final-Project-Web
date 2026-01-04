import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link as MuiLink, IconButton, Divider } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

// 🎨 Constants and Data
const styles = {
    bgColor: '#111',
    primaryColor: '#d90429',
    textColor: '#aaa',
    fontFamily: "'Montserrat', sans-serif"
};

const LINKS = {
    corporate: [
        { name: 'About Us', path: '/about' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Terms of Service', path: '/terms' }
    ],
    support: [
        { name: 'Contact Us', path: '/contact' }
    ]
};

const Footer = () => {
    // Helper function to render link lists (DRY Principle)
    const renderLinks = (links) => (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {links.map((link) => (
                <MuiLink
                    key={link.path}
                    component={Link}
                    to={link.path}
                    color="inherit"
                    underline="hover"
                    sx={{ color: styles.textColor, fontFamily: styles.fontFamily, '&:hover': { color: styles.primaryColor } }}
                >
                    {link.name}
                </MuiLink>
            ))}
        </Box>
    );

    return (
        <Box component="footer" sx={{ bgcolor: styles.bgColor, color: '#fff', py: 6, mt: 'auto', borderTop: `4px solid ${styles.primaryColor}` }}>
            <Container maxWidth="lg">
                <Grid container spacing={5}>

                    {/* Column 1: Brand & Social */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Box component="img" src="/pictures/logo.png" alt="EMR Logo" sx={{ height: '110px', mb: 2 }} />
                        <Typography variant="body2" sx={{ color: styles.textColor, lineHeight: 1.8, fontFamily: styles.fontFamily, mb: 2 }}>
                            Fueling your ambition with premium supplements. Energy, Muscle, Recovery - Built for athletes.
                        </Typography>
                        <Box>
                            {[InstagramIcon, TwitterIcon, YouTubeIcon].map((Icon, index) => (
                                <IconButton key={index} sx={{ color: '#fff', '&:hover': { color: styles.primaryColor } }} href="#">
                                    <Icon />
                                </IconButton>
                            ))}
                        </Box>
                    </Grid>

                    {/* 2. Column 2: Corporate Links */}
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 3, fontFamily: styles.fontFamily }}>
                            CORPORATE
                        </Typography>
                        {renderLinks(LINKS.corporate)}
                    </Grid>

                    {/* Column 3: Support Links */}
                    <Grid size={{ xs: 6, md: 4 }}>
                        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, mb: 3, fontFamily: styles.fontFamily }}>
                            SUPPORT
                        </Typography>
                        {renderLinks(LINKS.support)}
                    </Grid>
                </Grid>

                <Divider sx={{ my: 4, bgcolor: '#333' }} />

                {/* Bottom Bar: Copyright & Payment */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="body2" sx={{ color: '#666', fontFamily: styles.fontFamily }}>
                        &copy; 2025 EMR SUPPLEMENT. All Rights Reserved.
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png" alt="Visa" sx={{ height: '32px', filter: 'brightness(0.8) invert(1)' }} />
                        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/b/b7/MasterCard_Logo.svg" alt="Mastercard" sx={{ height: '32px', bgcolor: '#fff', borderRadius: '4px' }} />
                        <Box component="img" src="https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg" alt="Amex" sx={{ height: '32px', bgcolor: '#fff', borderRadius: '4px' }} />
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
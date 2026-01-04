import React, { useEffect } from 'react';
import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';

const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    heading: { fontWeight: 800, mb: 1.5, color: '#000' },
    text: { color: '#555', lineHeight: 1.7 }
};

const Privacy = () => {
    useEffect(() => {
        document.title = "Privacy Policy | EMR Supplement";
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: '160px', mb: '80px', minHeight: '60vh' }}>

            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 2, fontFamily: styles.fontFamily }}>
                    Privacy <span style={{ color: styles.primaryColor }}>Policy</span>
                </Typography>
                <Box sx={{ width: '80px', height: '4px', bgcolor: styles.primaryColor, mx: 'auto', borderRadius: '2px' }} />
            </Box>

            <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 5px 30px rgba(0,0,0,0.05)' }}>
                <Typography paragraph sx={{ ...styles.text, color: '#666', mb: 4, fontStyle: 'italic', fontFamily: styles.fontFamily }}>
                    Your privacy is important to us. It is EMR Supplement's policy to respect your privacy regarding any information we may collect from you.
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ ...styles.heading, fontFamily: styles.fontFamily }}>1. Information We Collect</Typography>
                    <Typography paragraph sx={{ ...styles.text, fontFamily: styles.fontFamily }}>
                        We collect information you provide directly to us, such as when you create an account, update your profile, make a purchase.
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <LockIcon sx={{ color: '#27ae60' }} />
                        <Typography variant="h6" sx={{ ...styles.heading, fontFamily: styles.fontFamily, mb: 0 }}>3. Security</Typography>
                    </Box>
                    <Typography paragraph sx={{ ...styles.text, fontFamily: styles.fontFamily }}>
                        We implement a variety of security measures to maintain the safety of your personal information. Your payment information is encrypted using SSL technology.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Privacy;
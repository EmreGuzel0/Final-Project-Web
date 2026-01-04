import React, { useEffect } from 'react';
import { Container, Typography, Paper, Box, Divider } from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';

const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    heading: { fontWeight: 800, mb: 1.5, color: '#000' },
    text: { color: '#555', lineHeight: 1.7 }
};

const Terms = () => {
    useEffect(() => {
        document.title = "Terms of Service | EMR Supplement";
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container maxWidth="md" sx={{ mt: '160px', mb: '80px', minHeight: '60vh' }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 2, fontFamily: styles.fontFamily }}>
                    Terms of <span style={{ color: styles.primaryColor }}>Service</span>
                </Typography>
                <Box sx={{ width: '80px', height: '4px', bgcolor: styles.primaryColor, mx: 'auto', borderRadius: '2px' }} />
            </Box>

            <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 5px 30px rgba(0,0,0,0.05)' }}>
                <Typography paragraph sx={{ ...styles.text, color: '#666', mb: 4, fontStyle: 'italic', fontFamily: styles.fontFamily }}>
                    By accessing our website, you agree to be bound by these terms of service, all applicable laws and regulations.
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                        <GavelIcon sx={{ color: styles.primaryColor }} />
                        <Typography variant="h6" sx={{ ...styles.heading, fontFamily: styles.fontFamily, mb: 0 }}>1. Use License</Typography>
                    </Box>
                    <Typography paragraph sx={{ ...styles.text, fontFamily: styles.fontFamily }}>
                        Permission is granted to temporarily download one copy of the materials on EMR Supplement's website for personal, non-commercial transitory viewing only.
                    </Typography>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box sx={{ mb: 4 }}>
                    <Typography variant="h6" sx={{ ...styles.heading, fontFamily: styles.fontFamily }}>2. Disclaimer</Typography>
                    <Typography paragraph sx={{ ...styles.text, fontFamily: styles.fontFamily }}>
                        The materials on EMR Supplement's website are provided on an 'as is' basis. EMR Supplement makes no warranties, expressed or implied.
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default Terms;
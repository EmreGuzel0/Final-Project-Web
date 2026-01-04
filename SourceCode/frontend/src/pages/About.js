import React, { useEffect } from 'react';
import { Container, Typography, Box, Paper, Grid, Divider } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    secondaryColor: '#27ae60',
    container: { mt: '160px', mb: '80px', minHeight: '60vh' },
    sectionTitle: { fontWeight: 800, fontFamily: "'Montserrat', sans-serif" },
    text: { color: '#555', lineHeight: 1.8, fontFamily: "'Montserrat', sans-serif", fontSize: '1.05rem' },
    iconLarge: { color: '#d90429', fontSize: '2rem' }
};

// 📦 Data List (Clean Code: DRY Principle)
const WHY_CHOOSE_US = [
    "100% Certified Raw Materials",
    "Lab Tested for Purity & Quality",
    "Fast & Secure Shipping Worldwide",
    "Athlete Focused Advanced Formulas"
];

const About = () => {
    useEffect(() => {
        document.title = "About Us | EMR Supplement";
        window.scrollTo(0, 0);
    }, []);

    return (
        <Container maxWidth="md" sx={styles.container}>

            {/* Title */}
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 2, fontFamily: styles.fontFamily }}>
                    About <span style={{ color: styles.primaryColor }}>Us</span>
                </Typography>
                <Box sx={{ width: '80px', height: '4px', bgcolor: styles.primaryColor, mx: 'auto', borderRadius: '2px' }} />
            </Box>

            <Paper elevation={0} sx={{ p: { xs: 3, md: 6 }, borderRadius: '16px', border: '1px solid #eee', boxShadow: '0 5px 30px rgba(0,0,0,0.05)' }}>

                {/* Section 1: Who We Are */}
                <Box sx={{ mb: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <GroupsIcon sx={styles.iconLarge} />
                        <Typography variant="h5" sx={styles.sectionTitle}>Who We Are?</Typography>
                    </Box>
                    <Typography paragraph sx={styles.text}>
                        Founded in 2025, <strong>EMR SUPPLEMENT</strong> is dedicated to providing high-quality sports nutrition. We believe that great performance starts with great fuel. We started this journey with a simple goal: to create supplements that we would use ourselves.
                    </Typography>
                </Box>

                <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

                {/* Section 2: Our Mission */}
                <Box sx={{ mb: 5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                        <EmojiEventsIcon sx={styles.iconLarge} />
                        <Typography variant="h5" sx={styles.sectionTitle}>Our Mission</Typography>
                    </Box>
                    <Typography paragraph sx={styles.text}>
                        To empower every athlete to reach their full potential through scientifically formulated supplements, transparency, and premium ingredients. We don't just sell products; we fuel ambitions.
                    </Typography>
                </Box>

                <Divider sx={{ my: 4, borderStyle: 'dashed' }} />

                {/*Section 3: Why Choose Us (Mapped from Data)*/}
                <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, textAlign: 'center', fontFamily: styles.fontFamily }}>
                        Why Choose <span style={{ color: styles.primaryColor }}>Us?</span>
                    </Typography>

                    <Grid container spacing={2}>
                        {WHY_CHOOSE_US.map((text, index) => (
                            <Grid size={{ xs: 12, sm: 6 }} key={index}>
                                <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', p: 2, bgcolor: '#f9f9f9', borderRadius: '8px', border: '1px solid #f0f0f0' }}>
                                    <CheckCircleIcon sx={{ color: styles.secondaryColor, mr: 2 }} />
                                    <Typography sx={{ fontWeight: 600, fontFamily: styles.fontFamily, color: '#333' }}>{text}</Typography>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Box>

            </Paper>
        </Container>
    );
};

export default About;
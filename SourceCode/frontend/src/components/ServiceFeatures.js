import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LockIcon from '@mui/icons-material/Lock';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AssignmentReturnIcon from '@mui/icons-material/AssignmentReturn';

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    iconColor: '#d90429',
    textColor: '#666',
    titleColor: '#000'
};

// 📦 Feature Data List
const FEATURES = [
    {
        icon: <LocalShippingIcon sx={{ fontSize: '2.5rem', color: styles.iconColor, mb: 1 }} />,
        title: "Fast Shipping",
        text: "Delivery within 24 hours"
    },
    {
        icon: <LockIcon sx={{ fontSize: '2.5rem', color: styles.iconColor, mb: 1 }} />,
        title: "Secure Payment",
        text: "256-bit SSL Encryption"
    },
    {
        icon: <WorkspacePremiumIcon sx={{ fontSize: '2.5rem', color: styles.iconColor, mb: 1 }} />,
        title: "Premium Quality",
        text: "Certified Raw Materials"
    },
    {
        icon: <AssignmentReturnIcon sx={{ fontSize: '2.5rem', color: styles.iconColor, mb: 1 }} />,
        title: "Easy Return",
        text: "14 Days Money Back"
    }
];

const ServiceFeatures = () => {
    return (
        <Box sx={{ bgcolor: '#fff', py: '50px', borderTop: '1px solid #eee' }}>
            <Container maxWidth="lg">
                <Grid container spacing={4} justifyContent="center">
                    {FEATURES.map((feature, index) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index} sx={{ textAlign: 'center' }}>
                            {feature.icon}
                            <Typography variant="h6" sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily, color: styles.titleColor }}>
                                {feature.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: styles.textColor, fontFamily: styles.fontFamily }}>
                                {feature.text}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ServiceFeatures;
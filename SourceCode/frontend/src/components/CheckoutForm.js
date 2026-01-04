import React from 'react';
import { Box, Typography, TextField } from '@mui/material';

// 🎨 Styles configuration
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    sectionTitle: {
        borderBottom: '2px solid #eee',
        pb: 1,
        mb: 3,
        fontWeight: 900,
        textTransform: 'uppercase'
    },
    textField: {
        '& .MuiOutlinedInput-root': {
            bgcolor: '#fff',
            '& fieldset': { borderColor: '#ddd' },
            '&:hover fieldset': { borderColor: '#999' },
            '&.Mui-focused fieldset': { borderColor: '#d90429' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#d90429' },
        '& input': { fontFamily: "'Montserrat', sans-serif" }
    }
};

const CheckoutForm = ({ onSubmit, id }) => {

    return (
        <Box component="form" onSubmit={onSubmit} id={id}>

            {/* Bölüm 1: Shipping Information */}
            <Typography variant="h5" sx={{ ...styles.sectionTitle, fontFamily: styles.fontFamily }}>
                Shipping Details
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField fullWidth label="First Name" required variant="outlined" sx={styles.textField} />
                <TextField fullWidth label="Last Name" required variant="outlined" sx={styles.textField} />
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField fullWidth label="Phone Number" type="tel" required variant="outlined" sx={styles.textField} />
                <TextField fullWidth label="City" required variant="outlined" sx={styles.textField} />
            </Box>

            <TextField
                fullWidth
                label="Shipping Address"
                placeholder="Full Address"
                required
                variant="outlined"
                sx={{ ...styles.textField, mb: 4 }}
            />

            {/* Bölüm 2: Payment Details */}
            <Typography variant="h5" sx={{ ...styles.sectionTitle, fontFamily: styles.fontFamily }}>
                Payment Method
            </Typography>

            <TextField
                fullWidth
                label="Card Number"
                placeholder="XXXX XXXX XXXX XXXX"
                required
                variant="outlined"
                sx={{ ...styles.textField, mb: 2 }}
            />

            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField fullWidth label="Expiry Date" placeholder="MM/YY" required variant="outlined" sx={styles.textField} />
                <TextField fullWidth label="CVV" placeholder="123" required variant="outlined" sx={styles.textField} />
            </Box>

        </Box>
    );
};

export default CheckoutForm;
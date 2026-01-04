import React, { useState, useEffect } from 'react';
import { Container, Box, Typography, TextField, Button, Paper, Snackbar, Alert } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

// 🎨 Style Definitions (Unchanged)
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    inputSx: {
        '& .MuiOutlinedInput-root': {
            bgcolor: '#fff',
            '& fieldset': { borderColor: '#ddd' },
            '&:hover fieldset': { borderColor: '#999' },
            '&.Mui-focused fieldset': { borderColor: '#d90429' },
        },
        '& .MuiInputLabel-root.Mui-focused': { color: '#d90429' },
        '& input, & textarea': { fontFamily: "'Montserrat', sans-serif" }
    }
};

// 📦 Contact Information Data
const CONTACT_INFO = [
    {
        icon: <LocationOnIcon fontSize="small" />,
        title: "Our Headquarters",
        text: "Maslak Mahallesi, Buyukdere Caddesi\nNo: 123, Sariyer / Istanbul" // Physical addresses are generally kept local
    },
    {
        icon: <PhoneIcon fontSize="small" />,
        title: "Phone Number",
        text: "+90 (212) 345 67 89\nMon-Fri, 9am - 6pm"
    },
    {
        icon: <EmailIcon fontSize="small" />,
        title: "Email Address",
        text: "support@emrsupplement.com\ninfo@emrsupplement.com"
    }
];

const Contact = () => {
    // --- STATE MANAGEMENT ---
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // Status state: handles notifications (success/error)
    const [status, setStatus] = useState({ open: false, type: 'success', msg: '' });

    useEffect(() => {
        document.title = "Contact Us | EMR Supplement";
        window.scrollTo(0, 0);
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle Form Submission (Connects to Backend)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                setStatus({ open: true, type: 'success', msg: 'Message Sent Successfully!' });
                setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
            } else {
                setStatus({ open: true, type: 'error', msg: 'Failed to send message. Please try again.' });
            }
        } catch (error) {
            console.error("Connection Error:", error);
            setStatus({ open: true, type: 'error', msg: 'Server Connection Error! Please check your internet.' });
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: '140px', mb: '80px' }}>

            {/* --- NOTIFICATION (SNACKBAR) --- */}
            <Snackbar
                open={status.open}
                autoHideDuration={3000}
                onClose={() => setStatus({ ...status, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                sx={{ top: '130px !important' }}
            >
                <Alert
                    icon={status.type === 'success' ? <CheckCircleIcon sx={{ color: '#fff !important' }} /> : <ErrorIcon sx={{ color: '#fff !important' }} />}
                    sx={{ bgcolor: status.type === 'success' ? '#27ae60' : '#d90429', color: '#fff', fontWeight: 'bold' }}
                >
                    {status.msg}
                </Alert>
            </Snackbar>

            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', fontFamily: styles.fontFamily, mb: 1 }}>
                    Contact Us
                </Typography>
                <Typography sx={{ color: '#666', fontSize: '1.1rem', fontFamily: styles.fontFamily }}>
                    We are here to help you achieve your goals. Reach out to us anytime.
                </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 6, alignItems: 'flex-start' }}>

                {/* --- LEFT: INFO CARDS --- */}
                <Box sx={{ flex: 1, width: '100%' }}>
                    {CONTACT_INFO.map((info, index) => (
                        <Box key={index} sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                                <Box sx={{ width: 40, height: 40, bgcolor: styles.primaryColor, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                                    {info.icon}
                                </Box>
                                <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: styles.fontFamily }}>{info.title}</Typography>
                            </Box>
                            <Typography sx={{ pl: 7, color: '#555', lineHeight: 1.6, fontFamily: styles.fontFamily, whiteSpace: 'pre-line' }}>
                                {info.text}
                            </Typography>
                        </Box>
                    ))}
                </Box>

                {/* --- RIGHT: CONTACT FORM --- */}
                <Paper elevation={0} sx={{ flex: 1.5, width: '100%', p: 5, borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 5px 30px rgba(0,0,0,0.05)' }}>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth name="name" label="Full Name" required variant="outlined"
                            value={formData.name} onChange={handleChange}
                            sx={{ ...styles.inputSx, mb: 3 }}
                        />
                        <TextField
                            fullWidth type="email" name="email" label="Email Address" required variant="outlined"
                            value={formData.email} onChange={handleChange}
                            sx={{ ...styles.inputSx, mb: 3 }}
                        />
                        <TextField
                            fullWidth name="subject" label="Subject" required variant="outlined"
                            value={formData.subject} onChange={handleChange}
                            sx={{ ...styles.inputSx, mb: 3 }}
                        />
                        <TextField
                            fullWidth multiline rows={4} name="message" label="Message" required variant="outlined"
                            value={formData.message} onChange={handleChange}
                            sx={{ ...styles.inputSx, mb: 3 }}
                        />

                        <Button type="submit" fullWidth variant="contained" endIcon={<SendIcon />} sx={{ bgcolor: '#000', color: '#fff', py: 1.8, fontWeight: 800, borderRadius: '6px', fontFamily: styles.fontFamily, '&:hover': { bgcolor: styles.primaryColor } }}>
                            SEND MESSAGE
                        </Button>
                    </form>
                </Paper>

            </Box>
        </Container>
    );
};

export default Contact;
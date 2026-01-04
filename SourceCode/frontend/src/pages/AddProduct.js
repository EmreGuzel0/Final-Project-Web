import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button, Paper, MenuItem, Snackbar, Alert, Grid } from '@mui/material';
import { addProduct } from '../services/productService'; // Servisi import ettik

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    container: { mt: '140px', mb: '100px' },
    paper: { p: 4, borderRadius: '15px' },
    title: { fontWeight: 'bold', mb: 4, textAlign: 'center', color: '#d90429' },
    sectionTitle: { borderBottom: '2px solid #eee', pb: 1, mt: 2 },
    submitBtn: { bgcolor: '#000', py: 2, mt: 2, fontWeight: 'bold', '&:hover': { bgcolor: '#d90429' } }
};

const AddProduct = () => {
    const navigate = useNavigate();

    // Form State
    const [formData, setFormData] = useState({
        title: '', description: '', price: '', oldPrice: '',
        image: '', category: 'Protein', discount: '',
        usage: '', ingredients: '', nutrition: ''
    });

    const [toast, setToast] = useState({ open: false, msg: '' });

    // Handlers
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Formatting data for backend
        const productToSend = {
            ...formData,
            price: parseFloat(formData.price),
            oldPrice: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
            discount: formData.discount || null,
            rating: 0,
            bestSeller: false,
            disabled: false,
            reviewList: []
        };

        try {
            await addProduct(productToSend);
            setToast({ open: true, msg: 'Product Added Successfully!' });
            setTimeout(() => navigate('/profile'), 1500);
        } catch (error) {
            alert("Error adding product. Please check backend connection.");
        }
    };

    return (
        <Container maxWidth="md" sx={styles.container}>
            <Snackbar open={toast.open} autoHideDuration={2000} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity="success" variant="filled" sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily }}>{toast.msg}</Alert>
            </Snackbar>

            <Paper elevation={3} sx={styles.paper}>
                <Typography variant="h4" sx={{ ...styles.title, fontFamily: styles.fontFamily }}>
                    ADD NEW PRODUCT
                </Typography>

                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>

                    {/* --- CHAPTER 1: BASIC INFORMATION --- */}
                    <Typography variant="h6" sx={{ ...styles.sectionTitle, mt: 0, fontFamily: styles.fontFamily }}>Basic Info</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 8 }}>
                            <TextField label="Product Title" name="title" fullWidth required onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField select label="Category" name="category" value={formData.category} fullWidth onChange={handleChange}>
                                {['Protein', 'Performance', 'Vitamins', 'Energy'].map(opt => (
                                    <MenuItem key={opt} value={opt}>{opt}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                    </Grid>

                    <TextField label="Short Description" name="description" fullWidth multiline rows={2} required onChange={handleChange} />

                    {/* --- CHAPTER 2: PRICE & IMAGE --- */}
                    <Typography variant="h6" sx={{ ...styles.sectionTitle, fontFamily: styles.fontFamily }}>Price & Image</Typography>
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField label="Price (TL)" name="price" type="number" fullWidth required onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField label="Old Price" name="oldPrice" type="number" fullWidth onChange={handleChange} />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <TextField label="Discount Badge (e.g. %20)" name="discount" fullWidth onChange={handleChange} />
                        </Grid>
                    </Grid>

                    <TextField
                        label="Image Filename"
                        name="image"
                        placeholder="example: whey.png"
                        helperText="Ensure the image exists in 'public/pictures' folder"
                        fullWidth required onChange={handleChange}
                    />

                    {/* --- CHAPTER 3: DETAILS --- */}
                    <Typography variant="h6" sx={{ ...styles.sectionTitle, fontFamily: styles.fontFamily }}>Details (Tabs)</Typography>
                    <TextField label="Usage Instructions" name="usage" fullWidth multiline rows={2} onChange={handleChange} />
                    <TextField label="Ingredients" name="ingredients" fullWidth multiline rows={2} onChange={handleChange} />
                    <TextField label="Nutrition Facts" name="nutrition" fullWidth multiline rows={2} onChange={handleChange} />

                    <Button type="submit" variant="contained" size="large" sx={{ ...styles.submitBtn, fontFamily: styles.fontFamily }}>
                        PUBLISH PRODUCT
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default AddProduct;
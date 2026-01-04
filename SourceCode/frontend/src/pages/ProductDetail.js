import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getProductDetail } from '../services/productService';
import ProductReviews from '../components/ProductReviews';
import ServiceFeatures from '../components/ServiceFeatures';

// Material UI Components
import {
    Box, Container, Typography, Button, Chip, IconButton,
    Accordion, AccordionSummary, AccordionDetails, Stack, CircularProgress,
    Toolbar
} from '@mui/material';

// İcons
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ScienceIcon from '@mui/icons-material/Science';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

const ProductDetail = ({ addToCart, user }) => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [qty, setQty] = useState(1);
    const [expanded, setExpanded] = useState('panel1');

    const fontFamily = "'Montserrat', sans-serif";

    // Fetch product data on mount or ID change
    const loadProduct = async () => {
        try {
            const data = await getProductDetail(id);
            setProduct(data);
            document.title = `${data.title} | EMR Supplement`;
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        loadProduct();
    }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

    // Handle Accordion expansion
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const handleAddToCart = () => {
        addToCart(product, qty);
    };

    if (loading) return <Box sx={{ display: 'flex', justifyContent: 'center', mt: 20 }}><CircularProgress color="error" /></Box>;

    if (!product) {
        return (
            <Container sx={{ mt: '150px', textAlign: 'center' }}>
                <Typography variant="h5">Product Not Found</Typography>
                <Button variant="contained" onClick={() => navigate('/')} sx={{ mt: 2 }}>Go Home</Button>
            </Container>
        );
    }

    return (
        <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

            {/* Spacer for Fixed Navbar */}
            <Toolbar />

            <Container maxWidth="lg" sx={{ mt: { xs: 4, md: 6 }, mb: '60px', flex: 1 }}>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: { xs: 4, md: 8 }, alignItems: 'flex-start' }}>

                    {/*LEFT: Product Image*/}
                    <Box sx={{ flex: 1, width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        {product.discount && (
                            <Chip label={product.discount} sx={{ position: 'absolute', top: 0, left: 0, bgcolor: '#d90429', color: '#fff', fontWeight: 'bold', fontSize: '1rem', borderRadius: '4px', zIndex: 2 }} />
                        )}
                        <Box component="img" src={`/pictures/${product.image}`} alt={product.title} sx={{ width: '100%', maxHeight: '500px', objectFit: 'contain' }} />
                    </Box>

                    {/* RIGHT: Product Info */}
                    <Box sx={{ flex: 1, width: '100%' }}>

                        <Typography variant="body2" sx={{ color: '#888', mb: 2, fontFamily }}>
                            <Link to="/" style={{ textDecoration: 'none', color: '#888' }}>Home</Link> &gt; Supplements
                        </Typography>

                        <Typography variant="h3" sx={{ fontWeight: 900, mb: 1, textTransform: 'uppercase', fontFamily, fontSize: { xs: '1.8rem', md: '2.2rem' } }}>
                            {product.title}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ color: '#666', mb: 3, fontFamily }}>
                            {product.subtitle}
                        </Typography>

                        {/* Price Section */}
                        <Box sx={{ mb: 3 }}>
                            {/* Base Price */}
                            <Typography component="span" sx={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#d90429', fontFamily }}>
                                {typeof product.price === 'number'
                                    ? `${product.price.toLocaleString('tr-TR')} ₺`
                                    : product.price}
                            </Typography>

                            {/* Old Price  */}
                            {product.oldPrice && (
                                <Typography component="span" sx={{ fontSize: '1.2rem', color: '#999', textDecoration: 'line-through', ml: 2, fontFamily }}>
                                    {typeof product.oldPrice === 'number'
                                        ? `${product.oldPrice.toLocaleString('tr-TR')} ₺`
                                        : product.oldPrice}
                                </Typography>
                            )}
                        </Box>

                        {/* Trust Badges */}
                        <Stack direction="row" spacing={1} sx={{ mb: 3, flexWrap: 'wrap', gap: 1 }}>
                            <Chip icon={<ScienceIcon fontSize="small" />} label="Lab Tested" variant="outlined" />
                            <Chip icon={<WorkspacePremiumIcon fontSize="small" />} label="High Quality" variant="outlined" />
                            <Chip icon={<ThumbUpIcon fontSize="small" />} label="Athlete Choice" variant="outlined" />
                        </Stack>

                        <Typography sx={{ color: '#555', mb: 4, lineHeight: 1.6, fontFamily }}>
                            {product.desc}
                        </Typography>

                        {/* Add to Cart Controls */}
                        <Box sx={{ mb: 4 }}>
                            <Box sx={{ display: 'flex', gap: 2, mb: 3, height: '55px' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', bgcolor: '#fff', px: 1 }}>
                                    <IconButton onClick={() => qty > 1 && setQty(qty - 1)} size="small"><RemoveIcon /></IconButton>
                                    <Typography sx={{ width: '35px', textAlign: 'center', fontWeight: 'bold', fontSize: '1.1rem' }}>{qty}</Typography>
                                    <IconButton onClick={() => setQty(qty + 1)} size="small"><AddIcon /></IconButton>
                                </Box>
                                <Button
                                    variant="contained" fullWidth onClick={handleAddToCart}
                                    disabled={product.price === "COMING SOON" || product.disabled}
                                    sx={{ bgcolor: (product.price === "COMING SOON" || product.disabled) ? '#ccc' : '#27ae60', color: '#fff', fontSize: '1rem', fontWeight: 700, '&:hover': { bgcolor: (product.price === "COMING SOON" || product.disabled) ? '#ccc' : '#219150' }, fontFamily }}
                                >
                                    {product.price === "COMING SOON" ? 'COMING SOON' : 'ADD TO CART'}
                                </Button>
                            </Box>
                        </Box>

                        {/* Information Accordions */}
                        <Box sx={{ mt: 4 }}>
                            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')} elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 'bold', fontFamily }}>Suggested Usage</Typography></AccordionSummary>
                                <AccordionDetails><Typography sx={{ fontFamily, color: '#555' }}>{product.usage}</Typography></AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')} elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 'bold', fontFamily }}>Ingredients</Typography></AccordionSummary>
                                <AccordionDetails><Typography sx={{ fontFamily, color: '#555' }}>{product.ingredients}</Typography></AccordionDetails>
                            </Accordion>

                            <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')} elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}><Typography sx={{ fontWeight: 'bold', fontFamily }}>Nutrition Facts</Typography></AccordionSummary>
                                <AccordionDetails><Typography sx={{ fontFamily, color: '#555', whiteSpace: 'pre-line', lineHeight: 2 }}>{product.nutrition ? product.nutrition.replace(/ \| /g, "\n") : "Info unavailable"}</Typography></AccordionDetails>
                            </Accordion>

                            {/* Reviews Component*/}
                            <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')} elevation={0} sx={{ borderBottom: '1px solid #eee' }}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography sx={{ fontWeight: 'bold', fontFamily }}>
                                        Customer Reviews ({product.reviewList.length})
                                    </Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <ProductReviews
                                        reviews={product.reviewList}
                                        productId={id}
                                        user={user}
                                        onUpdate={loadProduct}
                                    />
                                </AccordionDetails>
                            </Accordion>
                        </Box>
                    </Box>
                </Box>
            </Container>

            <ServiceFeatures />

        </Box>
    );
};

export default ProductDetail;
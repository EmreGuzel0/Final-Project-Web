import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, Box, Typography, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';

// 🎨 Styles configuration
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    card: {
        border: '1px solid #eee',
        borderRadius: '10px',
        textAlign: 'center',
        position: 'relative',
        bgcolor: '#fff',
        transition: 'all 0.3s ease',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
            boxShadow: '0 15px 30px rgba(0,0,0,0.1)', // When the card hovers, the shadow increases
            transform: 'translateY(-5px)' // The card lifts up very slightly
        }
    }
};

const ProductCard = ({ product, addToCart }) => {
    const navigate = useNavigate();

    // 🧮 Calculations for ratings and formatting
    const reviews = product.reviewList || [];
    const totalStars = reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = reviews.length > 0 ? (totalStars / reviews.length).toFixed(1) : 5;
    const reviewCount = reviews.length;

    const formattedPrice = typeof product.price === 'number'
        ? product.price.toLocaleString('tr-TR')
        : product.price;

    const handleNavigate = () => navigate(`/product/${product.id}`);

    return (
        <Card elevation={0} sx={styles.card}>
            <CardContent sx={{ p: '20px', flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                {/* Discount Badge */}
                {product.discount && (
                    <Box sx={{
                        position: 'absolute', top: '10px', left: '10px',
                        bgcolor: styles.primaryColor, color: '#fff', padding: '5px 10px',
                        borderRadius: '5px', fontSize: '0.8rem', fontWeight: 'bold', zIndex: 2,
                        fontFamily: styles.fontFamily
                    }}>
                        {product.discount}
                    </Box>
                )}

                {/* Product Image Area */}
                <Box
                    onClick={handleNavigate}
                    sx={{
                        width: '100%',
                        height: '200px',
                        overflow: 'hidden',
                        mb: '15px',
                        cursor: 'pointer'
                    }}
                >
                    <Box
                        component="img"
                        src={`/pictures/${product.image}`}
                        alt={product.title}
                        sx={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                            transition: 'transform 0.5s ease',
                            '&:hover': {
                                transform: 'scale(1.1)'
                            }
                        }}
                    />
                </Box>

                {/* Product Title */}
                <Typography
                    variant="h3"
                    onClick={handleNavigate}
                    sx={{
                        fontSize: '1rem', fontWeight: 'bold', mb: '5px', height: '40px',
                        overflow: 'hidden', fontFamily: styles.fontFamily, cursor: 'pointer', color: '#000',
                        transition: '0.3s',
                        '&:hover': { color: styles.primaryColor }
                    }}
                >
                    {product.title}
                </Typography>

                {/* Short Description */}
                <Typography sx={{ color: '#666', fontSize: '0.9rem', mb: '10px', fontFamily: styles.fontFamily }}>
                    {product.desc}
                </Typography>

                {/* Rating Display */}
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ffc107', mb: '10px', fontSize: '0.9rem' }}>
                    <StarIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                    <Typography component="span" sx={{ color: '#000', fontWeight: 'bold', mr: 1, fontFamily: styles.fontFamily }}>
                        {averageRating}
                    </Typography>
                    <Typography component="span" sx={{ color: '#999', fontFamily: styles.fontFamily }}>
                        ({reviewCount} Reviews)
                    </Typography>
                </Box>

                {/* Price Display */}
                <Box sx={{ fontSize: '1.2rem', fontWeight: 'bold', color: styles.primaryColor, mb: '15px', fontFamily: styles.fontFamily }}>
                    {product.oldPrice && (
                        <Typography component="span" sx={{ textDecoration: 'line-through', color: '#999', fontSize: '0.9rem', mr: '10px', fontFamily: styles.fontFamily }}>
                            {product.oldPrice} ₺
                        </Typography>
                    )}
                    {formattedPrice} ₺
                </Box>

                {/* Button */}
                <Button
                    onClick={() => addToCart(product, 1)}
                    disabled={product.disabled}
                    fullWidth
                    variant="contained"
                    sx={{
                        padding: '10px', bgcolor: '#111', color: '#fff', borderRadius: '5px',
                        fontWeight: 'bold', textTransform: 'uppercase', fontFamily: styles.fontFamily, boxShadow: 'none',
                        marginTop: 'auto',
                        transition: '0.3s',
                        '&:hover': { bgcolor: styles.primaryColor, transform: 'scale(1.02)' },
                        '&.Mui-disabled': { bgcolor: '#ccc', color: '#fff' }
                    }}
                >
                    {product.disabled ? 'COMING SOON' : 'ADD TO CART'}
                </Button>

            </CardContent>
        </Card>
    );
};

export default ProductCard;
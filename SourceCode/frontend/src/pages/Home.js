import React, { useState, useEffect } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { keyframes } from '@emotion/react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

// Components & Services
import ProductCard from '../components/ProductCard';
import ServiceFeatures from '../components/ServiceFeatures';
import { getProducts } from '../services/productService';

// 🎨 Animations
const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

const logoEntrance = keyframes`
  from { opacity: 0; transform: scale(0.8) translateY(30px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
`;

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    hero: {
        height: '75vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: "linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(/pictures/halter.png)",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
    },
    sectionTitle: {
        fontSize: '2.2rem',
        fontWeight: 900,
        textTransform: 'uppercase',
        mb: 1
    },
    arrowIcon: {
        color: '#fff',
        fontSize: '3rem',
        mt: '20px',
        cursor: 'pointer',
        animation: `${bounce} 2s infinite`,
        transition: 'color 0.3s',
        '&:hover': { color: '#d90429' }
    }
};

const Home = ({ addToCart }) => {
    const [products, setProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState("ALL");

    // 🔄 Load Data with Caching
    useEffect(() => {
        document.title = "Home | EMR Supplement";
        loadData();
    }, []);

    const loadData = async () => {
        const cachedProducts = sessionStorage.getItem('emrProducts');
        if (cachedProducts) {
            setProducts(JSON.parse(cachedProducts));
        }

        try {
            const data = await getProducts();
            setProducts(data);
            sessionStorage.setItem('emrProducts', JSON.stringify(data));
        } catch (error) {
            console.error("Home Data Error:", error);
        }
    };

    // 🎮 Scroll
    const scrollToShop = () => {
        const section = document.getElementById('shop-section');
        if (section) {
            const headerOffset = 60;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }
    };

    // 🔍 Filtering Logic
    const bestSellers = products.filter(p => p.bestSeller);
    const filteredProducts = activeCategory === "ALL"
        ? products
        : products.filter(p => p.category === activeCategory);

    const categories = ["ALL", "PROTEIN", "AMINO", "VITAMIN", "ENERGY"];

    return (
        <Box sx={{ mt: '100px', minHeight: '100vh' }}>

            {/* --- HERO SECTION --- */}
            <Box component="header" sx={styles.hero}>
                <Box
                    component="img"
                    src="/pictures/logo.png"
                    alt="Logo"
                    sx={{ width: '70%', maxWidth: '300px', animation: `${logoEntrance} 1s ease-out` }}
                />
                <Box onClick={scrollToShop} sx={styles.arrowIcon}>
                    <KeyboardArrowDownIcon sx={{ fontSize: '3.5rem' }} />
                </Box>
            </Box>

            {/* --- BEST SELLERS --- */}
            <Container id="shop-section" maxWidth="lg" sx={{ py: '80px' }}>
                <Box sx={{ textAlign: 'center', mb: '40px' }}>
                    <Typography variant="h2" sx={{ ...styles.sectionTitle, fontFamily: styles.fontFamily }}>
                        Best Sellers
                    </Typography>
                    <Box sx={{ width: '60px', height: '4px', bgcolor: '#d90429', margin: '10px auto' }} />
                </Box>

                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                    {bestSellers.map(product => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </Box>
            </Container>

            {/* --- CATALOG & FILTERS --- */}
            <Container maxWidth="lg" sx={{ pb: '80px' }}>
                <Box sx={{ textAlign: 'center', mb: '40px' }}>
                    <Typography variant="h2" sx={{ ...styles.sectionTitle, fontFamily: styles.fontFamily }}>
                        Our Catalog
                    </Typography>
                    <Typography sx={{ color: '#666', mt: '10px', fontFamily: styles.fontFamily }}>
                        Explore all of our premium supplements
                    </Typography>
                </Box>

                {/* Filter Buttons */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: '15px', mb: '40px', flexWrap: 'wrap' }}>
                    {categories.map(cat => (
                        <Button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            variant={activeCategory === cat ? 'contained' : 'outlined'}
                            sx={{
                                padding: '10px 25px', borderRadius: '30px', border: '2px solid',
                                borderColor: activeCategory === cat ? '#d90429' : '#111',
                                fontWeight: 900, fontSize: '0.8rem', fontFamily: styles.fontFamily,
                                color: activeCategory === cat ? '#fff' : '#111',
                                bgcolor: activeCategory === cat ? '#d90429' : 'transparent',
                                '&:hover': {
                                    borderColor: '#d90429',
                                    bgcolor: activeCategory === cat ? '#b90322' : 'transparent',
                                    color: activeCategory === cat ? '#fff' : '#d90429'
                                }
                            }}
                        >
                            {cat}
                        </Button>
                    ))}
                </Box>

                {/* Filtered Product List */}
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '30px' }}>
                    {filteredProducts.map(product => (
                        <ProductCard key={product.id} product={product} addToCart={addToCart} />
                    ))}
                </Box>
            </Container>

            {/* --- Sub-feature strip --- */}
            <ServiceFeatures />

        </Box>
    );
};

export default Home;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, IconButton, Paper } from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// 🎨 Styles configuration
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    iconColor: '#333',
    paper: {
        display: 'flex',
        alignItems: 'center',
        p: 2,
        mb: 2,
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        position: 'relative',
        border: '1px solid #f5f5f5'
    },
    image: {
        width: '90px',
        height: '90px',
        objectFit: 'contain',
        mr: 3,
        cursor: 'pointer'
    }
};

const CartItem = ({ item, updateQty, removeItem }) => {
    const navigate = useNavigate();

    // Destructuring (Veri Parçalama)
    const { id, title, image, price, amount } = item;
    const totalPrice = (price * amount).toLocaleString('tr-TR');

    // Event Handlers
    const handleDetailClick = () => navigate(`/product/${id}`);
    const handleIncrease = () => updateQty(id, 1);
    const handleDecrease = () => updateQty(id, -1);
    const handleRemove = () => removeItem(id);

    return (
        <Paper elevation={0} sx={styles.paper}>
            {/* Image */}
            <Box
                component="img"
                src={`/pictures/${image}`}
                alt={title}
                onClick={handleDetailClick}
                sx={styles.image}
            />

            {/* Product Info & Quantity Controls */}
            <Box sx={{ flexGrow: 1 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 1, fontFamily: styles.fontFamily }}>
                    {title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', width: 'fit-content', borderRadius: '5px' }}>
                    <IconButton size="small" onClick={handleDecrease} sx={{ color: styles.iconColor }}>
                        <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography sx={{ px: 1.5, fontWeight: 'bold', fontFamily: styles.fontFamily }}>
                        {amount}
                    </Typography>
                    <IconButton size="small" onClick={handleIncrease} sx={{ color: styles.iconColor }}>
                        <AddIcon fontSize="small" />
                    </IconButton>
                </Box>
            </Box>

            {/* Price Display */}
            <Typography sx={{ fontWeight: 900, color: styles.primaryColor, fontSize: '1.2rem', ml: 2, fontFamily: styles.fontFamily }}>
                {totalPrice} ₺
            </Typography>

            {/* Remove Button */}
            <IconButton
                onClick={handleRemove}
                sx={{ position: 'absolute', top: '10px', right: '10px', color: '#ccc', '&:hover': { color: styles.primaryColor } }}
            >
                <DeleteOutlineIcon />
            </IconButton>
        </Paper>
    );
};

export default CartItem;
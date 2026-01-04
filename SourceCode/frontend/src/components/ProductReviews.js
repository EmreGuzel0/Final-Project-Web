import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Rating, TextField, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { addReview, deleteReview } from '../services/productService';

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    userBg: '#f8f9fa'
};

const ProductReviews = ({ reviews, productId, user, onUpdate }) => {
    // State
    const [reviewText, setReviewText] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedReviewId, setSelectedReviewId] = useState(null);

    // Admin Control
    const isAdmin = user && (user.email === "admin@admin.com" || user.username === "admin");

    // Submit new review
    const handleSubmit = async () => {
        if (!reviewText.trim()) return;

        try {
            await addReview(productId, {
                username: user.name || user.email,
                text: reviewText,
                rating: reviewRating
            });
            setReviewText("");
            onUpdate();
        } catch (error) {
            alert("Failed to submit review.");
        }
    };

    const handleDeleteClick = (id) => {
        setSelectedReviewId(id);
        setOpenDialog(true);
    };

    const handleConfirmDelete = async () => {
        if (!selectedReviewId) return;
        try {
            await deleteReview(selectedReviewId);
            setOpenDialog(false);
            onUpdate();
        } catch (error) {
            alert("Failed to delete review.");
        }
    };

    return (
        <Box>
            {/* Confirmation Dialog */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle sx={{ fontFamily: styles.fontFamily, fontWeight: 'bold' }}>Delete Review?</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontFamily: styles.fontFamily }}>
                        Are you sure? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} sx={{ color: '#666', fontFamily: styles.fontFamily }}>Cancel</Button>
                    <Button onClick={handleConfirmDelete} sx={{ color: styles.primaryColor, fontWeight: 'bold', fontFamily: styles.fontFamily }}>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* 📝 Write Review Form */}
            {user ? (
                <Box sx={{ mb: 4, p: 2, bgcolor: styles.userBg, borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 'bold', mb: 1, fontFamily: styles.fontFamily }}>Write a Review</Typography>
                    <Rating value={reviewRating} onChange={(e, val) => setReviewRating(val)} />
                    <TextField
                        fullWidth multiline rows={2}
                        placeholder="Share your experience..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        sx={{ my: 2, bgcolor: '#fff' }}
                    />
                    <Button variant="contained" onClick={handleSubmit} sx={{ bgcolor: '#111', fontFamily: styles.fontFamily }}>Submit Review</Button>
                </Box>
            ) : (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="body2" sx={{ fontFamily: styles.fontFamily }}>
                        Please <Link to="/login" style={{ color: styles.primaryColor, fontWeight: 'bold' }}>Login</Link> to write a review.
                    </Typography>
                </Box>
            )}

            {/* 📋 Reviews List */}
            {reviews.length === 0 ? (
                <Typography sx={{ fontStyle: 'italic', color: '#999', fontFamily: styles.fontFamily }}>No reviews yet.</Typography>
            ) : (
                reviews.map((review) => (
                    <Box key={review.id} sx={{ mb: 2, p: 2, borderBottom: '1px solid #eee' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily }}>{review.username}</Typography>
                            <Typography variant="caption" sx={{ color: '#999', fontFamily: styles.fontFamily }}>{review.date}</Typography>
                        </Box>

                        <Rating value={review.rating} readOnly size="small" sx={{ my: 0.5 }} />
                        <Typography variant="body2" sx={{ color: '#555', fontFamily: styles.fontFamily, mb: 1 }}>{review.text}</Typography>

                        {/* Admin Delete Button */}
                        {isAdmin && (
                            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <IconButton onClick={() => handleDeleteClick(review.id)} size="small" sx={{ color: styles.primaryColor }}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </Box>
                        )}
                    </Box>
                ))
            )}
        </Box>
    );
};

export default ProductReviews;
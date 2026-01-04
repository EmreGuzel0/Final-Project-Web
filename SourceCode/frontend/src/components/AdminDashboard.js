import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, Alert } from '@mui/material';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteProduct } from '../services/productService';

// Styles configuration
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    container: {
        p: 4,
        borderRadius: '12px',
        border: '2px solid #d90429',
        bgcolor: '#fff5f5',
        mt: 6
    },
    headerIcon: {
        color: '#d90429',
        fontSize: '2rem'
    },
    addButton: {
        bgcolor: '#000',
        color: '#fff',
        fontWeight: 'bold',
        '&:hover': { bgcolor: '#333' }
    },
    deleteBtn: {
        bgcolor: '#ffebee',
        '&:hover': { bgcolor: '#ffcdd2' }
    }
};

const AdminDashboard = ({ productList, setProductList }) => {
    // Local state for UI controls
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [toast, setToast] = useState({ open: false, msg: '' });

    // --- Delete action ---
    const requestDelete = (id) => {
        setSelectedProductId(id);
        setOpenDialog(true);
    };

    // Executes deletion via API service
    const confirmDelete = async () => {
        if (!selectedProductId) return;
        try {
            await deleteProduct(selectedProductId);
            setProductList(prev => prev.filter(p => p.id !== selectedProductId));
            setToast({ open: true, msg: 'Product deleted successfully!' });
        } catch (error) {
            setToast({ open: true, msg: 'Error deleting product.' }); // Display the error message with a toast
        } finally {
            setOpenDialog(false);
        }
    };

    return (
        <Paper elevation={0} sx={styles.container}>

            {/* 🔔 Notification & Confirmation Dialogs */}
            <Snackbar open={toast.open} autoHideDuration={3000} onClose={() => setToast({ ...toast, open: false })} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ top: '100px !important' }}>
                <Alert severity="success" variant="filled" sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily }}>{toast.msg}</Alert>
            </Snackbar>

            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle sx={{ fontFamily: styles.fontFamily, fontWeight: 'bold' }}>Delete Product?</DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{ fontFamily: styles.fontFamily }}>Are you sure? This action cannot be undone.</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} sx={{ color: '#666', fontFamily: styles.fontFamily }}>Cancel</Button>
                    <Button onClick={confirmDelete} variant="contained" color="error" sx={{ fontFamily: styles.fontFamily, fontWeight: 'bold' }}>Delete</Button>
                </DialogActions>
            </Dialog>

            {/* 📊 Header Section */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <AdminPanelSettingsIcon sx={styles.headerIcon} />
                    <Typography variant="h5" sx={{ fontWeight: 900, fontFamily: styles.fontFamily, color: styles.primaryColor }}>
                        ADMIN DASHBOARD
                    </Typography>
                </Box>
                <Button
                    component={Link}
                    to="/admin/add-product"
                    variant="contained"
                    startIcon={<AddCircleIcon />}
                    sx={{ ...styles.addButton, fontFamily: styles.fontFamily }}
                >
                    Add New Product
                </Button>
            </Box>

            <Typography variant="h6" sx={{ mb: 2, fontFamily: styles.fontFamily, fontWeight: 'bold' }}>
                Manage Products ({productList.length})
            </Typography>

            {/* 📋 Product List Table */}
            <Box sx={{ overflowX: 'auto', bgcolor: '#fff', borderRadius: '8px', p: 1 }}>
                <Table size="small">
                    <TableHead sx={{ bgcolor: '#eee' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily }}>ID</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily }}>Image</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily }}>Title</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily }}>Price</TableCell>
                            <TableCell sx={{ fontWeight: 'bold', fontFamily: styles.fontFamily, textAlign: 'center' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productList.map((product) => (
                            <TableRow key={product.id} hover>
                                <TableCell sx={{ fontFamily: styles.fontFamily }}>#{product.id}</TableCell>
                                <TableCell>
                                    <Box component="img" src={`/pictures/${product.image}`} sx={{ width: 40, height: 40, objectFit: 'contain' }} />
                                </TableCell>
                                <TableCell sx={{ fontFamily: styles.fontFamily, fontWeight: '600' }}>{product.title}</TableCell>
                                <TableCell sx={{ fontFamily: styles.fontFamily }}>{product.price} TL</TableCell>
                                <TableCell sx={{ textAlign: 'center' }}>
                                    <IconButton onClick={() => requestDelete(product.id)} color="error" size="small" sx={styles.deleteBtn}>
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Paper>
    );
};

export default AdminDashboard;
import axios from 'axios';

// 🌐 Base URL
// Address of the backend server. Change only here if it changes.
const API_URL = 'http://localhost:8080/api/products';

// 🛠️ HELPER FUNCTION
// Adapts incoming data to frontend format.
const formatProductData = (item) => ({
    ...item,
    desc: item.description, // Backend sends 'description', we use 'desc'
    price: item.price === 0 ? "COMING SOON" : item.price,
    nutrition: item.nutrition || "Nutrition info not available.",
    usage: item.usage || "Usage information not available.",
    ingredients: item.ingredients || "Ingredients information not available.",
    reviewList: item.reviewList || []
});

// 1. Fetch All Products
export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data.map(formatProductData);
    } catch (error) {
        console.error("Service Error (getProducts):", error);
        throw error;
    }
};

// 2. Fetch Single Product with Details
export const getProductDetail = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`);
        return formatProductData(response.data);
    } catch (error) {
        console.error("Service Error (getProductDetail):", error);
        throw error;
    }
};

// 3. Submit Review
export const addReview = async (productId, reviewData) => {
    try {
        await axios.post(`${API_URL}/${productId}/reviews`, reviewData);
    } catch (error) {
        console.error("Review Submission Error:", error);
        throw error;
    }
};

// 4. Delete Review
export const deleteReview = async (reviewId) => {
    try {
        await axios.delete(`${API_URL}/reviews/${reviewId}`);
    } catch (error) {
        console.error("Review Deletion Error:", error);
        throw error;
    }
};

// 5. Delete Product (For Admin)
export const deleteProduct = async (id) => {
    try {
        await axios.delete(`${API_URL}/${id}`);
    } catch (error) {
        console.error("Product Deletion Error:", error);
        throw error;
    }
};

// 6. ADD NEW PRODUCT (For Admin - Newly Added Part)
// We will use this in AddProduct.js page.
export const addProduct = async (productData) => {
    try {
        const response = await axios.post(API_URL, productData);
        return response.data;
    } catch (error) {
        console.error("Product Addition Error:", error);
        throw error;
    }
};
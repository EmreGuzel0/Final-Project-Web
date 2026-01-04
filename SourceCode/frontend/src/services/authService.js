import axios from 'axios';

// 🌐 Base URL defined in one place.
// If the server address changes tomorrow, you only change it here.
const API_URL = 'http://localhost:8080/api/auth';

/**
 * User Login
 * @param {Object} credentials - { username, password }
 */
export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        // We leave error handling to the caller (Login.js).
        // However, we log the error to the console to make debugging easier.
        console.error("Auth Error (Login):", error.response?.data || error.message);
        throw error;
    }
};

/**
 * New User Registration
 * @param {Object} userData - { username, email, password }
 */
export const registerUser = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        console.error("Auth Error (Register):", error.response?.data || error.message);
        throw error;
    }
};
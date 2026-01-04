import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container, Box, Typography, Button, Paper,
    Accordion, AccordionSummary, AccordionDetails, Avatar, Chip
} from '@mui/material';

// Icons
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailIcon from '@mui/icons-material/Email';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

// Components and Services
import { getProducts } from '../services/productService';
import AdminDashboard from '../components/AdminDashboard';

// 🎨 Styles
const styles = {
    fontFamily: "'Montserrat', sans-serif",
    primaryColor: '#d90429',
    container: { mt: '160px', mb: '100px' },
    headerBox: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #eee', pb: 3, mb: 5 },
    logoutBtn: { bgcolor: '#d90429', color: '#fff', fontWeight: 'bold', textTransform: 'uppercase', px: 3, '&:hover': { bgcolor: '#b00320' } },
    infoPaper: { p: 4, borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', height: '100%' },
    sectionHeader: { display: 'flex', alignItems: 'center', gap: 1.5, mb: 3, borderBottom: '1px solid #f0f0f0', pb: 2 }
};

const Profile = ({ user, setUser }) => {
    const navigate = useNavigate();
    const [productList, setProductList] = useState([]);

    // State for Contact Messages
    const [messages, setMessages] = useState([]);

    // Redirect if not logged in
    useEffect(() => {
        if (!user) navigate('/');
        document.title = "Profile | EMR Supplement";
    }, [user, navigate]);

    // Check Admin Status
    const isAdmin = user && (user.username === "admin" || user.email === "admin@admin.com");

    // FETCH DATA (Products & Messages) IF ADMIN
    useEffect(() => {
        if (isAdmin) {
            getProducts().then(data => setProductList(data));

            // 2. Get Messages from Backend
            fetch('http://localhost:8080/api/contact')
                .then(res => res.json())
                .then(data => setMessages(data))
                .catch(err => console.error("Error fetching messages:", err));
        }
    }, [isAdmin]);

    const handleLogout = () => {
        setUser(null);
        navigate('/');
    };

    // --- DATE FORMATTER (UPDATED: Time removed) ---
    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
    };

    if (!user) return null;

    return (
        <Container maxWidth="lg" sx={styles.container}>

            {/* --- HEADER --- */}
            <Box sx={styles.headerBox}>
                <Typography variant="h3" sx={{ fontWeight: 900, textTransform: 'uppercase', fontFamily: styles.fontFamily, fontSize: { xs: '1.8rem', md: '2.5rem' } }}>
                    My Account
                </Typography>
                <Button onClick={handleLogout} variant="contained" startIcon={<LogoutIcon />} sx={{ ...styles.logoutBtn, fontFamily: styles.fontFamily }}>
                    Logout
                </Button>
            </Box>

            {/* --- TOP SECTION: INFO & ORDERS --- */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 5, alignItems: 'flex-start', mb: 6 }}>

                {/* LEFT: PERSONAL INFO */}
                <Box sx={{ flex: 1, width: '100%' }}>
                    <Paper elevation={0} sx={styles.infoPaper}>
                        <Box sx={styles.sectionHeader}>
                            <PersonIcon sx={{ color: styles.primaryColor, fontSize: '1.8rem' }} />
                            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: styles.fontFamily }}>Personal Info</Typography>
                        </Box>
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                            <InfoRow label="Username" value={user.username || user.name} />
                            <InfoRow label="Email Address" value={user.email} />
                            <InfoRow
                                label="Account Type"
                                value={isAdmin ? "ADMINISTRATOR" : "Active Member"}
                                color={isAdmin ? styles.primaryColor : '#27ae60'}
                            />
                        </Box>
                    </Paper>
                </Box>

                {/* RIGHT: ORDER HISTORY */}
                <Box sx={{ flex: 1, width: '100%' }}>
                    <Paper elevation={0} sx={styles.infoPaper}>
                        <Box sx={styles.sectionHeader}>
                            <Inventory2Icon sx={{ color: styles.primaryColor, fontSize: '1.8rem' }} />
                            <Typography variant="h6" sx={{ fontWeight: 800, fontFamily: styles.fontFamily }}>Recent Orders</Typography>
                        </Box>
                        <Box sx={{ py: 2, textAlign: 'center', color: '#888', fontStyle: 'italic' }}>
                            <Typography sx={{ fontFamily: styles.fontFamily }}>No recent orders found.</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Box>

            {/* ADMIN EXCLUSIVE SECTIONS */}

            {isAdmin && (
                <>
                    {/* --- 1. INCOMING MESSAGES SECTION --- */}
                    <Box sx={{ mb: 6 }}>
                        <Paper elevation={0} sx={{ p: 4, borderRadius: '12px', border: '1px solid #eee', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
                            <Box sx={{ ...styles.sectionHeader, borderBottom: 'none', mb: 2 }}>
                                <MailOutlineIcon sx={{ color: styles.primaryColor, fontSize: '2rem' }} />
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 800, fontFamily: styles.fontFamily }}>Incoming Messages</Typography>
                                    <Typography sx={{ fontSize: '0.9rem', color: '#666', fontFamily: styles.fontFamily }}>
                                        Check what your visitors are saying ({messages.length} messages)
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Message List (Accordion Style) */}
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {messages.length === 0 ? (
                                    <Typography sx={{ fontStyle: 'italic', color: '#999', textAlign: 'center', py: 3 }}>No messages yet.</Typography>
                                ) : (
                                    messages.map((msg) => (
                                        <Accordion key={msg.id} elevation={0} sx={{ border: '1px solid #eee', borderRadius: '8px !important', '&:before': { display: 'none' } }}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 3 }}>
                                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                                                    {/* Avatar with Initials */}
                                                    <Avatar sx={{ bgcolor: styles.primaryColor, width: 32, height: 32, fontSize: '0.9rem', fontWeight: 'bold' }}>
                                                        {msg.name ? msg.name.charAt(0).toUpperCase() : '?'}
                                                    </Avatar>

                                                    {/* Sender & Subject */}
                                                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: { sm: 'center' }, gap: { xs: 0, sm: 2 }, flex: 1 }}>
                                                        <Typography sx={{ fontWeight: 700, fontFamily: styles.fontFamily, width: '150px' }}>
                                                            {msg.name}
                                                        </Typography>
                                                        <Typography sx={{ color: '#555', fontFamily: styles.fontFamily, flex: 1 }}>
                                                            {msg.subject}
                                                        </Typography>
                                                    </Box>

                                                    {/* Date Badge (Only Date) */}
                                                    <Chip label={formatDate(msg.sentAt)} size="small" variant="outlined" sx={{ borderRadius: '4px', color: '#888', borderColor: '#eee', fontSize: '0.75rem', display: { xs: 'none', md: 'flex' } }} />
                                                </Box>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{ px: 3, pb: 3, pt: 0, borderTop: '1px dashed #f5f5f5' }}>
                                                <Box sx={{ mt: 2 }}>
                                                    <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
                                                        <EmailIcon sx={{ fontSize: '1rem', color: '#999' }} />
                                                        <Typography sx={{ fontSize: '0.9rem', color: '#666', fontFamily: styles.fontFamily }}>{msg.email}</Typography>

                                                        {/* Date shows here on mobile */}
                                                        <Typography sx={{ fontSize: '0.8rem', color: '#aaa', display: { xs: 'block', md: 'none' }, ml: 'auto' }}>
                                                            {formatDate(msg.sentAt)}
                                                        </Typography>
                                                    </Box>
                                                    <Typography sx={{ fontFamily: styles.fontFamily, lineHeight: 1.6, color: '#333', whiteSpace: 'pre-line' }}>
                                                        {msg.message}
                                                    </Typography>
                                                </Box>
                                            </AccordionDetails>
                                        </Accordion>
                                    ))
                                )}
                            </Box>
                        </Paper>
                    </Box>

                    {/* --- 2. PRODUCT DASHBOARD --- */}
                    <AdminDashboard productList={productList} setProductList={setProductList} />
                </>
            )}

        </Container>
    );
};

// Sub-component: Info Row
const InfoRow = ({ label, value, color = '#000' }) => (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #eee', pb: 1.5 }}>
        <Typography sx={{ color: '#666', fontWeight: 600, fontFamily: styles.fontFamily }}>{label}</Typography>
        <Typography sx={{ fontWeight: 800, color, fontFamily: styles.fontFamily }}>{value}</Typography>
    </Box>
);

export default Profile;
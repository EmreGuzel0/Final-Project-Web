import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { loginUser, registerUser } from '../services/authService'; // Imported service

// Material UI
import { Box, Button, TextField, Typography, Paper, Snackbar, Alert, Link, Slide } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';

const Login = ({ setUser }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const fontFamily = "'Montserrat', sans-serif";

    useEffect(() => { document.title = "Login / Register | EMR Supplement"; }, []);

    const [isLogin, setIsLogin] = useState(true);
    const redirectPath = location.state?.from || '/';

    // Form Data
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [status, setStatus] = useState({ type: '', msg: '', open: false }); // Notification management

    // Check if redirected from another page with 'register' mode
    useEffect(() => {
        if (location.state?.mode === 'register') setIsLogin(false);
    }, [location.state]);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    // --- LOGIC ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ ...status, open: false });

        try {
            if (!isLogin) {
                // --- REGISTER FLOW ---
                // Backend returns 200 OK for success, throws 400 for error
                await registerUser(formData);

                // If code reaches here, it means 200 OK (Success)
                setStatus({ type: 'success', msg: 'Account Created! Switching to Login...', open: true });

                // Switch to login view after 1.5 seconds
                setTimeout(() => {
                    setIsLogin(true);
                    setStatus(prev => ({ ...prev, open: false }));
                }, 1500);

            } else {
                // --- LOGIN FLOW ---
                const user = await loginUser({ username: formData.username, password: formData.password });

                // Check if user object is valid
                if (user && user.id) {
                    setUser(user);
                    setStatus({ type: 'success', msg: 'Login Successful! Redirecting...', open: true });
                    setTimeout(() => { navigate(redirectPath); }, 1500);
                }
            }
        } catch (error) {
            console.error("Auth Error:", error);

            let errorMsg = "Server Connection Error";

            if (error.response) {
                // 400: Bad Request (Register -> "Username is already taken!")
                if (error.response.status === 400) {
                    // Backend sends the error message directly in the body
                    errorMsg = error.response.data || "Registration Failed";
                }
                // 401: Unauthorized (Login -> "Invalid Username or Password")
                else if (error.response.status === 401) {
                    errorMsg = "Invalid Username or Password";
                }
            }

            setStatus({ type: 'error', msg: errorMsg, open: true });
        }
    };

    // --- SHARED STYLES ---
    const inputSx = {
        '& .MuiOutlinedInput-root': {
            bgcolor: '#fcfcfc', borderRadius: '6px',
            '& fieldset': { borderColor: '#ddd' },
            '&:hover fieldset': { borderColor: '#ddd' },
            '&.Mui-focused fieldset': { borderColor: '#d90429', borderWidth: '1px' },
        },
        '& input': { padding: '12px 15px', fontFamily, fontSize: '1rem' }
    };

    const TransitionLeft = (props) => <Slide {...props} direction="left" />;

    return (
        <>
            <Snackbar
                open={status.open}
                autoHideDuration={3000}
                onClose={() => setStatus({ ...status, open: false })}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={TransitionLeft}
                sx={{ top: '130px !important' }}
            >
                <Alert
                    icon={status.type === 'success' ? <CheckCircleIcon sx={{ color: '#fff' }} /> : <ErrorIcon sx={{ color: '#fff' }} />}
                    sx={{ width: '100%', bgcolor: status.type === 'success' ? '#27ae60' : '#d90429', color: 'white', fontWeight: 'bold' }}
                >
                    {status.msg}
                </Alert>
            </Snackbar>

            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: '180px', mb: '100px', p: '20px' }}>
                <Paper elevation={0} sx={{ width: '100%', maxWidth: '450px', p: '40px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', textAlign: 'center', border: '1px solid #eee' }}>

                    <Typography variant="h2" sx={{ fontSize: '1.8rem', fontWeight: 900, color: isLogin ? '#000' : '#d90429', mb: '10px', textTransform: 'uppercase', fontFamily }}>
                        {isLogin ? 'Sign In' : 'Create Account'}
                    </Typography>
                    <Typography sx={{ color: '#666', fontSize: '0.9rem', mb: '30px', fontFamily }}>
                        {isLogin ? 'Sign in with your username' : 'Join the EMR Community'}
                    </Typography>

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
                        <Box>
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, mb: '8px', fontFamily }}>Username</Typography>
                            <TextField fullWidth name="username" placeholder="Enter username" required onChange={handleChange} variant="outlined" sx={inputSx} />
                        </Box>

                        {!isLogin && (
                            <Box>
                                <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, mb: '8px', fontFamily }}>Email Address</Typography>
                                <TextField fullWidth type="email" name="email" placeholder="example@mail.com" required onChange={handleChange} variant="outlined" sx={inputSx} />
                            </Box>
                        )}

                        <Box>
                            <Typography sx={{ fontSize: '0.85rem', fontWeight: 700, mb: '8px', fontFamily }}>Password</Typography>
                            <TextField fullWidth type="password" name="password" placeholder="Enter password" required onChange={handleChange} variant="outlined" sx={inputSx} />
                        </Box>

                        <Button type="submit" disableElevation sx={{ width: '100%', padding: '14px', bgcolor: !isLogin ? '#d90429' : '#000', color: '#fff', borderRadius: '6px', fontWeight: 800, mt: 1, fontFamily, '&:hover': { bgcolor: !isLogin ? '#b90322' : '#333' } }}>
                            {isLogin ? 'SIGN IN' : 'REGISTER'}
                        </Button>
                    </Box>

                    <Box sx={{ mt: 3, fontSize: '0.9rem', color: '#666', fontFamily }}>
                        {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                        <Link component="button" onClick={() => { setIsLogin(!isLogin); setStatus({ ...status, open: false }); }} underline="none" sx={{ color: '#d90429', fontWeight: 700, fontFamily }}>
                            {isLogin ? 'Register Now' : 'Sign In'}
                        </Link>
                    </Box>
                </Paper>
            </Box>
        </>
    );
};

export default Login;
// src/components/Success.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Typography } from '@mui/material';
import backgroundImg from '/success-icon.png'; // Adjust the path as necessary

const Success = ({ open, onClose }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Handle logout logic, e.g., Firebase sign-out
        navigate('/login');
    };

    const goToTrackingScreen = () => {
        navigate('/tracking'); // Adjust the route as needed
    };

    return (
        <Drawer
            anchor="bottom"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxWidth: 400,
                    margin: 'auto',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
            }}
        >
            <Box
                sx={{
                    height: '50vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 2,
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                }}
            >
                <CheckCircleIcon sx={{ fontSize: 80, color: 'orange' }} />
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                    Login Successful
                </Typography>
                <button
                    variant="contained"
                    color="warning"
                    onClick={goToTrackingScreen}
                    className=' bg-orange-500 rounded-full w-[80%] text-white h-12 mt-6'
                >
                    Go to Tracking Screen
                </button>
                <button
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    className=' mt-4'
                >
                    Logout
                </button>
            </Box>
        </Drawer>
    );
};

export default Success;

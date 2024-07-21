// src/components/Home.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const Home = () => {
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    return <div>Welcome to the Home Page</div>;
};

export default Home;

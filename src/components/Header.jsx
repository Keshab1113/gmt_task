// src/components/Header.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const Header = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.signOut().then(() => {
            navigate('/login');
        }).catch((error) => {
            console.error('Error logging out: ', error);
        });
    };

    const goToProfile = () => {
        navigate('/profile');
    };

    return (
        <header className="bg-orange-500 text-white p-4 flex flex-wrap justify-between items-center shadow-md w-full">
            <h1 className="text-xl sm:text-2xl font-bold">Tracking Page</h1>
            <div className="space-x-2 sm:space-x-4 mt-2 sm:mt-0">
                <button
                    onClick={goToProfile}
                    className="bg-white text-orange-500 px-3 sm:px-4 py-1 sm:py-2 rounded shadow hover:bg-gray-100"
                >
                    Profile
                </button>
                <button
                    onClick={handleLogout}
                    className="bg-white text-orange-500 px-3 sm:px-4 py-1 sm:py-2 rounded shadow hover:bg-gray-100"
                >
                    Logout
                </button>
            </div>
        </header>
    );
};

export default Header;

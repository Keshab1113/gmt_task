// src/components/Profile.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Header from "../components/Header"

const Profile = () => {
    const [user] = useAuthState(auth);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='h-screen overflow-hidden'>
            <Header/>
        
        <div className="flex items-center justify-center h-full bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-xl">
                <h2 className="text-3xl font-bold text-center">Profile</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Name</label>
                        <p className="px-4 py-2 mt-1 border rounded-lg">{user.displayName || 'N/A'}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Email</label>
                        <p className="px-4 py-2 mt-1 border rounded-lg">{user.email}</p>
                    </div>
                    {user.photoURL && (
                        <div>
                            <label className="block text-sm font-medium">Profile Picture</label>
                            <img src={user.photoURL} alt="Profile" className="w-32 h-32 mt-1 border rounded-full" />
                        </div>
                    )}
                </div>
            </div>
            </div>
        </div>
    );
};

export default Profile;

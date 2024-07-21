// src/components/Signup.js
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import backgroundImg from '/bg2.png';

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (!agreeToTerms) {
            alert('You must agree to the terms and conditions');
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: userName });
            navigate('/tracking');
        } catch (error) {
            console.error('Error signing up:', error);
        }
    };

    const handleGoogleSignup = async () => {
        try {
            await signInWithGoogle();
            navigate('/tracking');
        } catch (error) {
            console.error('Error signing up with Google:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100" style={{
            backgroundImage: `url(${backgroundImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}>
            <div className="w-full max-w-md p-8 space-y-4 bg-white shadow-lg sm:rounded-xl">
                <h2 className="text-3xl font-bold text-center">Create your new account</h2>
                <p className="text-center text-gray-600">Create an account to start looking for the food you like</p>
                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter Email"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">User Name</label>
                        <input
                            type="text"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="Enter User Name"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 mt-1 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                                placeholder="Password"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600"
                            >
                                {showPassword ? '🙈' : '👁️'}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            checked={agreeToTerms}
                            onChange={() => setAgreeToTerms(!agreeToTerms)}
                            className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-400"
                            required
                        />
                        <label className="ml-2 text-sm text-gray-600">
                            I Agree with <a href="/terms" className="text-orange-500 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-orange-500 hover:underline">Privacy Policy</a>
                        </label>
                    </div>
                    <button type="submit" className="w-full py-3 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-600">
                        Register
                    </button>
                    <div className="flex items-center justify-center mt-4">
                        <span className=' bg-gray-400 h-[0.1px] w-full'></span>
                        <h1 className="text-sm text-gray-600 min-w-max mx-3">Or sign in with</h1>
                        <span className=' bg-gray-400 h-[0.1px] w-full'></span>
                    </div>
                    <div className=' w-full flex justify-center items-center'>
                    <button
                        type="button"
                        onClick={handleGoogleSignup}
                        className="flex items-center justify-center text-gray-600 border border-orange-500 rounded-full hover:bg-gray-100 p-2"
                    >
                        <FcGoogle className="w-6 h-6" />
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-6">
                    <span className="text-sm text-gray-600">Have an account?</span>
                    <Link to="/login" className="ml-1 text-sm text-orange-500 hover:underline">
                        Sign In
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;

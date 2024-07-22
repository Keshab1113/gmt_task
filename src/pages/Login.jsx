import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { FcGoogle } from 'react-icons/fc';
import Success from '../components/Success';
import backgroundImg from '/success-icon.png';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [signInWithGoogle] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const [successOpen, setSuccessOpen] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSuccessOpen(true);
        } catch (error) {
            alert('Error logging in:', error);
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await signInWithGoogle();
            setSuccessOpen(true);
            // navigate("/tracking")
        } catch (error) {
            alert('Error logging in with Google:', error);
        }
    };

    return (
        <div
            className="flex items-center justify-center h-screen overflow-hidden bg-gray-100"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg sm:rounded-xl h-screen overflow-hidden sm:h-full">
                <h2 className="text-3xl font-bold text-start">Login to your account</h2>
                <p className="text-start text-gray-600">Please sign in to your account</p>
                <form onSubmit={handleLogin} className="space-y-6">
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
                    <div className="flex items-center justify-end">
                        <Link to="/forgot-password" className="text-sm text-orange-500 hover:underline">
                            Forgot password?
                        </Link>
                    </div>
                    <button type="submit" className="w-full py-3 mt-4 text-white bg-orange-500 rounded-full hover:bg-orange-600">
                        Sign In
                    </button>
                    <div className="flex items-center justify-center mt-4">
                        <span className=' bg-gray-400 h-[0.1px] w-full'></span>
                        <h1 className="text-sm text-gray-600 min-w-max mx-3">Or sign in with</h1>
                        <span className=' bg-gray-400 h-[0.1px] w-full'></span>
                    </div>
                    <div className=' w-full flex justify-center items-center'>
                    <button
                        type="button"
                        onClick={handleGoogleLogin}
                        className="flex items-center justify-center text-gray-600 border border-orange-500 rounded-full hover:bg-gray-100 p-2"
                    >
                        <FcGoogle className="w-6 h-6" />
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-6">
                    <span className="text-sm text-gray-600">Don't have an account?</span>
                    <Link to="/signup" className="ml-1 text-sm text-orange-500 hover:underline">
                        Register
                    </Link>
                </div>
            </div>
            <Success open={successOpen} onClose={() => setSuccessOpen(false)} />
        </div>
    );
};

export default Login;

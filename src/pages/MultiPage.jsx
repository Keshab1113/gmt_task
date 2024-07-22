import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const MultiPage = () => {
    const [page, setPage] = useState(1);
    const navigate = useNavigate();

    const handleNext = () => {
        if (page < 3) {
            setPage(page + 1);
        } else {
            if (auth.currentUser) {
                navigate('/tracking');
            } else {
                navigate('/login');
            }
        }
    };

    const handleSkip = () => {
        if (auth.currentUser) {
            navigate('/tracking');
        } else {
            navigate('/login');
        }
    };

    const renderPageContent = () => {
        switch (page) {
            case 1:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-white">We serve incomparable delicacies</h2>
                        <p className="text-center text-white">All the best restaurants with their top menu waiting for you, they can't wait for your order!!</p>
                    </>
                );
            case 2:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-white">We serve incomparable delicacies</h2>
                        <p className="text-center text-white">All the best restaurants with their top menu waiting for you, they can't wait for your order!!</p>
                    </>
                );
            case 3:
                return (
                    <>
                        <h2 className="text-3xl font-bold text-center text-white">We serve incomparable delicacies</h2>
                        <p className="text-center text-white">All the best restaurants with their top menu waiting for you, they can't wait for your order!!</p>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center sm:justify-center justify-end h-screen bg-gray-100 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-full scale-x-[-1]" style={{
                backgroundImage: `url(${('/success-icon.png')})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}></div>
            <div className="sm:w-full w-[80%] max-w-md p-8 space-y-6 bg-orange-500 shadow-lg rounded-3xl z-10 mb-10">
                {renderPageContent()}
                <div className="flex justify-center mt-4">
                    <div className="space-x-2">
                        {[1, 2, 3].map((p) => (
                            <span
                                key={p}
                                className={`inline-block w-6 h-1 rounded-full ${page === p ? 'bg-white' : 'bg-gray-400'}`}
                            ></span>
                        ))}
                    </div>
                </div>
                <div className="flex justify-center items-center mt-6">
                    
                    {page < 3 ? (
                        <div className='flex justify-between items-center w-full'>
                        <button onClick={handleSkip} className="text-white hover:underline">Skip</button>
                            <button onClick={handleNext} className="text-white hover:underline">Next &rarr;</button>
                        </div>
                    ) : (
                            <div className="loader-container">
                                <div className="loader">
                                    <div className="button-container">
                                        <button onClick={handleNext} className="flex items-center justify-center w-20 h-20 bg-white rounded-full text-orange-500 ">
                            <span className="sr-only">Go to Tracking Screen</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 rotate-180">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                                </button>
                            </div>
                            </div>
                            </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MultiPage;

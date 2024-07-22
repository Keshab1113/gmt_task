import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './AnticlockwiseClock.css';

const AnticlockwiseClock = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const initialSpeed = queryParams.get('speed') || 1;

    const [currentTime, setCurrentTime] = useState(new Date());
    const [speed, setSpeed] = useState(parseFloat(initialSpeed));
    const [endTime, setEndTime] = useState(new Date(new Date().getTime() - 120 * 60 * 1000)); // 120 minutes earlier

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(prevTime => {
                const newTime = new Date(prevTime.getTime() - 1000 * speed);
                if (newTime <= endTime) {
                    clearInterval(timer);
                    return endTime;
                }
                return newTime;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [speed, endTime]);

    const handleSpeedChange = (e) => {
        setSpeed(parseFloat(e.target.value));
    };

    const handleShare = () => {
        const url = `${window.location.origin}${window.location.pathname}?speed=${speed}`;
        navigator.clipboard.writeText(url);
        alert(`URL copied to clipboard! And the Link is: ${url}`);
    };

    const getRotationStyles = () => {
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();

        const hourDegrees = (hours % 12) * 30 + minutes * 0.5;
        const minuteDegrees = minutes * 6;
        const secondDegrees = seconds * 6;

        // Anticlockwise rotation
        return {
            hourStyle: { transform: `rotate(${hourDegrees}deg)` },
            minuteStyle: { transform: `rotate(${minuteDegrees}deg)` },
            secondStyle: { transform: `rotate(${secondDegrees}deg)` },
        };
    };

    const { hourStyle, minuteStyle, secondStyle } = getRotationStyles();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-6 m-4">
            <div className="clock bg-white rounded-full border-4 border-gray-800 w-64 h-64 relative">
                <div className="hand hour" style={hourStyle}></div>
                <div className="hand minute" style={minuteStyle}></div>
                <div className="hand second bg-red-500" style={secondStyle}></div>
                <div className="center bg-gray-800 rounded-full w-4 h-4 absolute"></div>
            </div>
            <div className="w-64">
                <input
                    type="range"
                    min="0.1"
                    max="5"
                    step="0.1"
                    value={speed}
                    onChange={handleSpeedChange}
                    className="w-full"
                />
                <p className="text-center mt-2">Speed: {speed}x</p>
            </div>
            <button
                onClick={handleShare}
                className="bg-orange-500 text-white px-4 py-2 rounded shadow hover:bg-orange-600"
            >
                Share
            </button>
        </div>
    );
};

export default AnticlockwiseClock;

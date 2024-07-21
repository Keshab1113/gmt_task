import React, { useState } from 'react';
import Quote from '../components/Quote';
import Header from '../components/Header';
import AnticlockwiseClock from '../components/AnticlockwiseClock';

const TrackingScreen = () => {
    const [speed, setSpeed] = useState(1);

    return (
        <div className="">
            <Header/>
            <AnticlockwiseClock />
            <Quote />
        </div>
    );
};

export default TrackingScreen;

import React, { useEffect, useState } from 'react';

const Quote = () => {
    const [quote, setQuote] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchQuote = async () => {
        try {
            const category = 'happiness';
            const apiKey = import.meta.env.VITE_API_KEY;;
            const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

            const response = await fetch(apiUrl, {
                headers: {
                    'X-Api-Key': apiKey
                }
            });

            if (response.ok) {
                const data = await response.json();
                const randomQuote = data[Math.floor(Math.random() * data.length)];
                setQuote(randomQuote.quote);
                setAuthor(randomQuote.author || 'Unknown');
            } else {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuote();
        const interval = setInterval(fetchQuote, 5000);
        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="p-4 bg-white rounded shadow-md border m-4">
            <p className="text-lg font-semibold text-center">"{quote}"</p>
            <p className="text-sm text-gray-600 text-center">- {author}</p>
        </div>
    );
};

export default Quote;

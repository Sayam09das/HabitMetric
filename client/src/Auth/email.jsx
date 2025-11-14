import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function VerifyEmail() {
    const [message, setMessage] = useState('Verifying your account...');
    const [success, setSuccess] = useState(false);
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    // Get token and email from URL
    const token = searchParams.get('token');
    const email = searchParams.get('email');

    // Backend base URL from env variable (remove trailing slash)
    const API_URL = (import.meta.env.VITE_PRIVATE_API_URL || 'http://localhost:3000').replace(/\/$/, '');

    useEffect(() => {
        console.log('Verification Parameters received:', { token, email });

        // Validate token and email
        if (!token || !email) {
            const missingParam = !token ? 'Token' : 'Email';
            setMessage(`Invalid verification link: Missing required parameter (${missingParam}).`);
            setSuccess(false);
            setTimeout(() => navigate('/login'), 3000);
            return;
        }

        // Encode parameters for URL safety
        const encodedToken = encodeURIComponent(token);
        const encodedEmail = encodeURIComponent(email);

        // Make GET request to backend
        axios.get(`${API_URL}/auth/verify-email?token=${encodedToken}&email=${encodedEmail}`)
            .then(res => {
                setMessage(res.data.message || 'Verification successful!');
                setSuccess(true);

                if (res.data.token) {
                    localStorage.setItem('authToken', res.data.token);
                    setTimeout(() => navigate('/dashboard'), 1500);
                } else {
                    setMessage('Verification succeeded, but please login manually.');
                    setTimeout(() => navigate('/login'), 3000);
                }
            })
            .catch(err => {
                console.error('Verification API Error Details:', {
                    status: err.response?.status,
                    data: err.response?.data,
                    error: err.message
                });

                const msg = err.response?.data?.message || 'Verification failed. Please try again.';
                setMessage(msg);
                setSuccess(false);
                setTimeout(() => navigate('/login'), 3000);
            });
    }, [token, email, navigate, API_URL]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md text-center">
                <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Email Verification</h2>
                <div className={`p-4 rounded-lg text-lg ${success
                    ? 'bg-green-100 text-green-800 border border-green-300'
                    : 'bg-red-100 text-red-800 border border-red-300'
                    }`}>
                    {message}
                </div>
                <p className="mt-6 text-gray-600">
                    {success
                        ? 'Redirecting to your dashboard shortly...'
                        : 'You will be redirected to the login page...'}
                </p>
            </div>
        </div>
    );
}

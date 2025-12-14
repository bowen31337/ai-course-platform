import React, { useEffect, useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';

export default function PaymentResultPage() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const status = searchParams.get('status');
    const { user } = useAuth();
    const [isRefreshing, setIsRefreshing] = useState(false);

    useEffect(() => {
        // Redirect to home if no status parameter
        if (!status) {
            navigate('/', { replace: true });
            return;
        }

        // If payment was successful, refresh the session to get updated is_pro status
        if (status === 'success' && user) {
            setIsRefreshing(true);
            // Give webhook time to process (3 seconds), then refresh session
            setTimeout(async () => {
                try {
                    // Refresh the session to get updated user metadata
                    await supabase.auth.refreshSession();
                    // Navigate to syllabus after refresh
                    navigate('/syllabus', { replace: true });
                } catch (error) {
                    console.error('Error refreshing session:', error);
                    // Fallback to reload if refresh fails
                    window.location.href = '/syllabus';
                }
            }, 3000);
        }
    }, [status, user, navigate]);

    if (status === 'success') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                    Payment Successful! 🎉
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-md mb-6">
                    Welcome to Pro! You now have full access to all 10 weeks of content, projects, and expert sessions.
                </p>
                {isRefreshing ? (
                    <div className="flex items-center gap-2 text-primary-500">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Activating your Pro access...</span>
                    </div>
                ) : (
                    <Link
                        to="/syllabus"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Start Learning
                    </Link>
                )}
            </div>
        );
    }

    if (status === 'cancelled') {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
                <div className="w-20 h-20 bg-neutral-100 dark:bg-neutral-800 rounded-full flex items-center justify-center mb-6">
                    <XCircle className="w-10 h-10 text-neutral-500" />
                </div>
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-4">
                    Payment Cancelled
                </h1>
                <p className="text-neutral-500 dark:text-neutral-400 max-w-md mb-6">
                    No worries! Your payment was cancelled. You can try again anytime.
                </p>
                <div className="flex gap-4">
                    <Link
                        to="/"
                        className="px-6 py-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white font-semibold rounded-lg transition-colors"
                    >
                        Go Home
                    </Link>
                    <Link
                        to="/#pricing"
                        className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-lg transition-colors"
                    >
                        Try Again
                    </Link>
                </div>
            </div>
        );
    }

    // Default: redirect to home
    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
            <p className="text-neutral-500">Redirecting...</p>
        </div>
    );
}

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isPro: boolean;
    loading: boolean;
    signIn: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    refreshSession: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isPro: false,
    loading: true,
    signIn: async () => { },
    signOut: async () => { },
    refreshSession: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPro, setIsPro] = useState(false);

    // Helper to update state from session
    const updateFromSession = useCallback((session: Session | null) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsPro(session?.user?.app_metadata?.is_pro || false);
    }, []);

    // Force refresh the session to get updated app_metadata (e.g., after Stripe webhook)
    const refreshSession = useCallback(async () => {
        const { data: { session }, error } = await supabase.auth.refreshSession();
        if (!error && session) {
            updateFromSession(session);
        }
    }, [updateFromSession]);

    useEffect(() => {
        // Get initial session - use refreshSession to ensure we have latest metadata
        supabase.auth.getSession().then(async ({ data: { session } }) => {
            if (session) {
                // Refresh to get latest app_metadata
                const { data: { session: refreshedSession } } = await supabase.auth.refreshSession();
                updateFromSession(refreshedSession ?? session);
            } else {
                updateFromSession(null);
            }
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            updateFromSession(session);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, [updateFromSession]);

    const signIn = async (email: string) => {
        // Use VITE_SITE_URL for consistent redirect across environments
        const siteUrl = import.meta.env.VITE_SITE_URL || window.location.origin;
        const { error } = await supabase.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: siteUrl,
            },
        });
        if (error) throw error;
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, isPro, loading, signIn, signOut, refreshSession }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

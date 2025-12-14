import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '../lib/supabase';

interface AuthContextType {
    user: User | null;
    session: Session | null;
    isPro: boolean;
    loading: boolean;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    isPro: false,
    loading: true,
    signIn: async () => { },
    signOut: async () => { },
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [isPro, setIsPro] = useState(false);

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            // Check for pro status (e.g., from metadata or a separate table)
            // For now, checks app metadata 'is_pro' which we can set via Stripe webhook later
            setIsPro(session?.user?.app_metadata?.is_pro || false);
            setLoading(false);
        });

        // Listen for changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            setIsPro(session?.user?.app_metadata?.is_pro || false);
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const signIn = async () => {
        // Modify this to use your preferred provider or flow
        await supabase.auth.signInWithOAuth({ provider: 'github' });
    };

    const signOut = async () => {
        await supabase.auth.signOut();
    };

    return (
        <AuthContext.Provider value={{ user, session, isPro, loading, signIn, signOut }}>
            {!loading && children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);

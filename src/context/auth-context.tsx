'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth, signOut } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import authService from '@/services/auth-service';
import type { User, AuthResponse } from '@/type/user';

type AuthContextValue = {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            try {
                if (!firebaseUser) {
                    setUser(null);
                    setLoading(false);
                    return;
                }

                const idToken = await firebaseUser.getIdToken();
                const userData = await authService.signInWithToken(idToken) as AuthResponse;

                setUser({
                    uid: userData.id,
                    firebaseUid: userData.firebaseUid ?? firebaseUser.uid,
                    username: userData.username,
                    email: firebaseUser.email ?? userData.email,
                    displayName: firebaseUser.displayName,
                    photoURL: firebaseUser.photoURL,
                    role: userData.role,
                });
            } catch (error) {
                console.error('Failed to resolve session:', error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await authService.logout();
            await signOut(auth);
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};
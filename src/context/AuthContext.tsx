'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { auth, signOut } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import authService from '@/services/auth-service';
import type { User } from '@/type/User';

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
            if (firebaseUser) {
                try {
                    const idToken = await firebaseUser.getIdToken();
                    localStorage.setItem('firebaseToken', idToken);

                    let userData;
                    if (firebaseUser.providerData[0]?.providerId === 'google.com') {
                        userData = await authService.googleSignIn(
                            idToken,
                            firebaseUser.email,
                            firebaseUser.displayName
                        );
                    } else {
                        userData = await authService.signInWithToken(
                            idToken,
                            firebaseUser.email,
                            firebaseUser.displayName
                        );
                    }

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
                    localStorage.removeItem('firebaseToken');
                }
            } else {
                setUser(null);
                localStorage.removeItem('firebaseToken');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            if (user?.firebaseUid) {
                await authService.logout(user.firebaseUid);
            }
            await signOut(auth);
            localStorage.removeItem('firebaseToken');
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
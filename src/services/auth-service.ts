// services/auth-service.ts

import { FetchHttpClient } from "@/http/http-client";
import {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from "@/lib/firebase";
import { BaseHttpService } from "@/services/base-http-service";

export class AuthService extends BaseHttpService {
    constructor(
        httpClient: FetchHttpClient,
        private readonly firebaseAuth = auth,
        private readonly provider = googleProvider
    ) {
        super(httpClient);
    }

    // ── Public, high-level entry points used by components ──────────────

    async loginWithEmail(email: string, password: string) {
        let idToken: string;
        try {
            const credential = await signInWithEmailAndPassword(this.firebaseAuth, email, password);
            idToken = await credential.user.getIdToken();
        } catch (err) {
            throw new Error(this.mapFirebaseError(err));
        }
        return this.signInWithToken(idToken, email);
    }

    async loginWithGoogle() {
        let idToken: string, email: string | null, name: string | null;
        try {
            const result = await signInWithPopup(this.firebaseAuth, this.provider);
            idToken = await result.user.getIdToken();
            email = result.user.email;
            name = result.user.displayName;
        } catch (err) {
            throw new Error(this.mapFirebaseError(err));
        }
        return this.googleSignIn(idToken, email, name);
    }

    async logoutUser(uid: string) {
        return this.logout(uid);
    }

    // ── Backend calls (kept, now routed through one response handler) ───

    async signInWithToken(idToken: string, email: string | null = null, name: string | null = null) {
        const response = await this.httpClient.post("/signin", { token: idToken, email, name });
        return this.handleResponse(response, "Authentication failed");
    }

    async googleSignIn(idToken: string, email: string | null, name: string | null) {
        const response = await this.httpClient.post("/google-signin", { token: idToken, email, name });
        return this.handleResponse(response, "Google sign-in failed");
    }

    async logout(uid: string) {
        try {
            const response = await this.httpClient.post(`/logout/${uid}`, undefined);
            return await this.handleResponse(response, "Logout failed");
        } catch (err) {
            console.error("Logout error:", err);
            return { message: "Logout successful" };
        }
    }

    private mapFirebaseError(err: any): string {
        switch (err?.code) {
            case "auth/user-not-found":
                return "No account found with this email. Please sign up first.";
            case "auth/wrong-password":
                return "Incorrect password. Please try again.";
            case "auth/invalid-credential":
                return "Incorrect email or password. Please try again.";
            case "auth/too-many-requests":
                return "Too many attempts. Please wait a moment and try again.";
            case "auth/popup-closed-by-user":
                return "Sign-in was cancelled.";
            default:
                return err?.message || "Failed to sign in";
        }
    }
}

const API_BASE_URL = BaseHttpService.validateEnv(
    "NEXT_PUBLIC_AUTH_API_BASE_URL",
    process.env.NEXT_PUBLIC_AUTH_API_BASE_URL
);
const httpClient = new FetchHttpClient(API_BASE_URL);
const authService = new AuthService(httpClient);

export default authService;
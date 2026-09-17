import { FetchHttpClient } from "@/http/http-client";
import {
    auth,
    googleProvider,
    signInWithPopup,
    signInWithEmailAndPassword,
} from "@/lib/firebase";
import { BaseHttpService } from "@/services/base-http-service";
import { FirebaseError } from "@firebase/app";
import { createUserWithEmailAndPassword } from "firebase/auth";

export class AuthService extends BaseHttpService {
    constructor(
        httpClient: FetchHttpClient,
        private readonly firebaseAuth = auth,
        private readonly provider = googleProvider
    ) {
        super(httpClient);
    }

    async loginWithEmail(email: string, password: string) {
        try {
            await signInWithEmailAndPassword(this.firebaseAuth, email, password);
        } catch (err) {
            throw new Error(this.mapFirebaseError(err));
        }
    }

    async loginWithGoogle() {
        try {
            await signInWithPopup(this.firebaseAuth, this.provider);
        } catch (err) {
            throw new Error(this.mapFirebaseError(err));
        }
    }

    async signInWithToken(idToken: string) {
        const response = await this.httpClient.post("/sign-in", {
            token: idToken,
        });

        return this.handleResponse(response, "Sign in failed");
    }

    async registerWithEmail(email: string, password: string) {
        try {
            await createUserWithEmailAndPassword(this.firebaseAuth, email, password);
        } catch (err) {
            throw new Error(this.mapFirebaseError(err));
        }
    }

    async logout() {
        const response = await this.httpClient.post("/logout", undefined);
        return this.handleResponse(response, "Logout failed");
    }

    private mapFirebaseError(err: unknown): string {
        if (!(err instanceof FirebaseError)) {
            return err instanceof Error ? err.message : "Failed to sign in";
        }

        switch (err.code) {
            case "auth/user-not-found":
                return "No account found with this email. Please sign up first.";
            case "auth/wrong-password":
                return "Incorrect password. Please try again.";
            case "auth/invalid-credential":
                return "Incorrect email or password. Please try again.";
            case "auth/email-already-in-use":
                return "An account with this email already exists.";
            case "auth/weak-password":
                return "Password is too weak.";
            case "auth/too-many-requests":
                return "Too many attempts. Please wait a moment and try again.";
            case "auth/popup-closed-by-user":
                return "Sign-in was cancelled.";
            default:
                return err.message || "Failed to sign in";
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
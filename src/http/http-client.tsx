// services/http/HttpClient.ts

import { auth } from "@/lib/firebase";

export interface HttpClient {
    get(path: string): Promise<Response>;
    post(path: string, body: unknown): Promise<Response>;
}

export class FetchHttpClient implements HttpClient {
    constructor(private readonly baseUrl: string) {}

    private async authHeaders(): Promise<Record<string, string>> {
        const user = auth.currentUser;
        if (!user) {
            console.warn("No Firebase user signed in — request will be sent without an Authorization header");
            return {};
        }
        const token = await user.getIdToken();
        return { Authorization: `Bearer ${token}` };
    }

    async get(path: string): Promise<Response> {
        const headers = await this.authHeaders();
        return fetch(`${this.baseUrl}${path}`, { headers });
    }

    async post(path: string, body: unknown): Promise<Response> {
        const headers = await this.authHeaders();
        return fetch(`${this.baseUrl}${path}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            body: JSON.stringify(body),
        });
    }
}
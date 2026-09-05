// services/base-http-service.ts

import type { HttpClient } from "@/http/http-client";

export abstract class BaseHttpService {
    protected constructor(protected readonly httpClient: HttpClient) {}

    protected async handleResponse(response: Response, fallbackMessage: string) {
        const text = await response.text();
        let data: any = null;

        if (text && text.trim() !== "") {
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Invalid response from server");
            }
        }

        if (!response.ok) {
            throw new Error(data?.error || `${fallbackMessage} (HTTP ${response.status})`);
        }

        return data ?? { message: "OK" };
    }

    static validateEnv(name: string, value: string | undefined): string {
        if (!value) {
            throw new Error(`Missing ${name} environment variable`);
        }
        return value;
    }
}
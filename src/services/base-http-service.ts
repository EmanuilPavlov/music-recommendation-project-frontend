import type { HttpClient } from "@/http/http-client";

type ErrorResponse = {
    message?: string;
    error?: string;
};

export abstract class BaseHttpService {
    protected constructor(protected readonly httpClient: HttpClient) {}

    protected async handleResponse<T>(response: Response, fallbackMessage: string): Promise<T> {
        const text = await response.text();
        let data: unknown = null;

        if (text && text.trim() !== "") {
            try {
                data = JSON.parse(text);
            } catch {
                throw new Error("Invalid response from server");
            }
        }

        if (!response.ok) {
            const errorData = data as ErrorResponse | null;

            throw new Error(
                errorData?.message ||
                errorData?.error ||
                `${fallbackMessage} (HTTP ${response.status})`
            );
        }

        return (data ?? { message: "OK" }) as T;
    }

    static validateEnv(name: string, value: string | undefined): string {
        if (!value) {
            throw new Error(`Missing ${name} environment variable`);
        }

        return value;
    }
}
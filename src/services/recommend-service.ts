// services/recommend-service.ts

import { FetchHttpClient } from "@/http/http-client";
import { BaseHttpService } from "@/services/base-http-service";
import { Mood } from "@/type/Mood";
import { MedicalCondition } from "@/type/MedicalCondition";

export class RecommendService extends BaseHttpService {
    constructor(httpClient: FetchHttpClient) {
        super(httpClient);
    }

    async getRecommendationsByMood(mood: Mood, limit: number) {
        const response = await this.httpClient.post("/by-mood", { mood, limit });
        return this.handleResponse(response, "Failed to get mood recommendations");
    }

    async getRecommendationsByMedicalCondition(medicalCondition: MedicalCondition, limit: number) {
        const response = await this.httpClient.post("/by-medicalCondition", { medicalCondition, limit });
        return this.handleResponse(response, "Failed to get recommendations");
    }
}

const API_BASE_URL = BaseHttpService.validateEnv(
    "NEXT_PUBLIC_RECOMMEND_API_BASE_URL",
    process.env.NEXT_PUBLIC_RECOMMEND_API_BASE_URL
);
const httpClient = new FetchHttpClient(API_BASE_URL);
export const recommendService = new RecommendService(httpClient);

export default recommendService;
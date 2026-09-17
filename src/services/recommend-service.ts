import { FetchHttpClient } from "@/http/http-client";
import { BaseHttpService } from "@/services/base-http-service";
import { Mood } from "@/type/mood";
import { MedicalCondition } from "@/type/medical-condition";
import {SongRecommendation} from "@/type/song-recommendation";

export class RecommendService extends BaseHttpService {
    constructor(httpClient: FetchHttpClient) {
        super(httpClient);
    }

    async getRecommendationsByMood(mood: Mood, limit: number): Promise<SongRecommendation[]> {
        const response = await this.httpClient.post("/by-mood", { mood, limit });
        return this.handleResponse(response, "Failed to get mood recommendations");
    }

    async getRecommendationsByMedicalCondition(medicalCondition: MedicalCondition, limit: number): Promise<SongRecommendation[]> {
        const response = await this.httpClient.post("/by-medical-condition", { medicalCondition, limit });
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
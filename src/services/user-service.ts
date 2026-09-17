import { BaseHttpService } from "@/services/base-http-service";
import { FetchHttpClient } from "@/http/http-client";
import type {HistoryItem, UserSearchHistoryDTO} from "@/type/user-search-history";

function humanizePascalCase(value: string): string {
    return value.replace(/([a-z0-9])([A-Z])/g, "$1 $2").trim();
}

function toHistoryItem(dto: UserSearchHistoryDTO): HistoryItem {
    return {
        id: `${dto.firebaseUid}-${dto.searchTimestamp}`,
        title: humanizePascalCase(dto.typeOfSearch),
        type: dto.typeOfSearch,
        limit: dto.limitRequested,
        timestamp: dto.searchTimestamp,
        count: 1,
    };
}

export class UserService extends BaseHttpService {
    constructor(httpClient: FetchHttpClient) {
        super(httpClient);
    }

    async getUserSearchHistory(): Promise<HistoryItem[]> {
        const response = await this.httpClient.get("/search-history");
        const raw: UserSearchHistoryDTO[] = await this.handleResponse(response, "Failed to get user search history");
        return raw.map(toHistoryItem);
    }
}

const API_BASE_URL = BaseHttpService.validateEnv(
    "NEXT_PUBLIC_USER_API_BASE_URL",
    process.env.NEXT_PUBLIC_USER_API_BASE_URL
);
const httpClient = new FetchHttpClient(API_BASE_URL);
const userService = new UserService(httpClient);

export default userService;
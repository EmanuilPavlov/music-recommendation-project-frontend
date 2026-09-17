// services/container.ts
//
// ── The "composition root" ──────────────────────────────────────────────
// Next.js has no built-in DI container (no @Injectable(), no auto-wiring -
// that's Angular/NestJS territory and needs decorators, which need Babel).
// So this file plays that role by hand: it's the ONE place that imports
// the concrete FetchHttpClient and passes it into AuthService's
// constructor. Every other file in the app imports the already-built
// `authService` below and never touches FetchHttpClient directly.
// ─────────────────────────────────────────────────────────────────────────

import { AuthService } from "./auth-service";
import { FetchHttpClient } from "@/http/http-client";

const API_BASE_URL = "http://localhost:8080/api/auth";

// Build the real dependency once...
const httpClient = new FetchHttpClient(API_BASE_URL);

// ...and inject it. This line is the actual "dependency injection" -
// everything above just prepared the piece being handed in.
export const authService = new AuthService(httpClient);
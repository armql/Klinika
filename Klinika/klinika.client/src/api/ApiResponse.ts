export interface ApiResponse {
    ok: boolean;
    error?: string; // Make error property optional as it may not always be present
    // Add other properties if your response has them
}
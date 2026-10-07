/**
 * Uploads a picked image and resolves to its public URL.
 * Supplied by the app so the editor stays free of app-specific endpoints.
 */
export type UploadImage = (file: File) => Promise<string>;

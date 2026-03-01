// src/lib/api.ts

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

class ApiError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'ApiError';
    }
}

async function handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
        let errorMessage = 'An error occurred while fetching the data.';
        try {
            const errorData = await response.json();
            errorMessage = errorData.detail || errorData.message || errorMessage;
        } catch {
            // If parsing fails, fall back to default error message
        }
        throw new ApiError(response.status, errorMessage);
    }
    return response.json();
}

/**
 * Common GET request
 */
export async function get<T>(endpoint: string): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`[API GET] Requesting ${url}`);

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });
        return await handleResponse<T>(response);
    } catch (error) {
        console.error(`[API GET ERROR] failed for ${url}:`, error);
        throw error;
    }
}

/**
 * Common POST request
 */
export async function post<T>(endpoint: string, data: any): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`[API POST] Sending data to ${url}`, data);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(data),
        });
        return await handleResponse<T>(response);
    } catch (error) {
        console.error(`[API POST ERROR] failed for ${url}:`, error);
        throw error;
    }
}

/**
 * Upload a document using multipart/form-data
 */
export async function uploadDocument(file: File): Promise<any> {
    const url = `${API_BASE_URL}/upload-document`;
    console.log(`[API UPLOAD] Uploading file to ${url}`, file.name);

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(url, {
            method: 'POST',
            // Omit Content-Type to let the browser automatically set the multipart boundary
            body: formData,
        });
        return await handleResponse(response);
    } catch (error) {
        console.error(`[API UPLOAD ERROR] failed for ${url}:`, error);
        throw error;
    }
}

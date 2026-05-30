export interface ApiError {
    code: string;
    description: string;
}

export const isCustomApiError = (error: unknown): error is ApiError => {
    return (
        typeof error === 'object' &&
        error !== null &&
        'code' in error &&
        'description' in error
    );
};

export interface ApiResult<T> {
    isSuccess: boolean;
    value: T | null;
    detalleError: {
        code: string;
        description: string;
    } | null;
}

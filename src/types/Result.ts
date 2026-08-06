export interface Result<T> {
    isSuccess: boolean;
    value: T | null;
    detalleError: {
        code: string;
        description: string;
    } | null;
}

export const ResultFactory = {
    success: <T>(value: T): Result<T> => ({
        isSuccess: true,
        value,
        detalleError: null
    }),

    failure: <T>(description: string, code = 'ErrorGenerico'): Result<T> => ({
        isSuccess: false,
        value: null,
        detalleError: { code, description }
    })
};
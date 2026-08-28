export interface Respuesta<T> {
    esExitoso: boolean;
    datos: T | null;
    detalleError: {
        codigo: string;
        descripcion: string;
    } | null;
}

export const ResultFactory = {
    success: <T>(valor: T): Respuesta<T> => ({
        esExitoso: true,
        datos: valor,
        detalleError: null
    }),

    failure: <T>(descripcionError: string, codigo = 'ErrorGenerico'): Respuesta<T> => ({
        esExitoso: false,
        datos: null,
        detalleError: { codigo: codigo, descripcion: descripcionError }
    })
};
const V1 = '/v1';

const ARTICULO = 'articulo';
const ASIGNACION = 'asignacion';
const GUIA = 'guia';

export const ENDPOINTS = {
    AUTH: {
        LOGIN: `${V1}/auth/login`,
    },
    ARTICULO : {
        GETALL : `${V1}/${ARTICULO}`,
        GETBYID: (id: string) => `${V1}/${ARTICULO}/${id}`,
        CREATE : `${V1}/${ARTICULO}`,
        UPDATE : (id: string) => `${V1}/${ARTICULO}/${id}`,
        DELETE : (id: string) => `${V1}/${ARTICULO}/${id}`,
    },
    ASIGNACION : {
        GETALL: `${V1}/${ASIGNACION}`,
        GETBYID: (id: string) => `${V1}/${ASIGNACION}/${id}`,
        CREATE : `${V1}/${ASIGNACION}`,
        UPDATE : (id: string) => `${V1}/${ASIGNACION}/${id}`,
        DELETE : (id: string) => `${V1}/${ASIGNACION}/${id}`,
    },
    CHOFER : {
        GETALL: `${V1}/chofer`,
        GETBYID: (id: string) => `${V1}/chofer/${id}`,
        CREATE : `${V1}/chofer`,
        UPDATE : (id: string) => `${V1}/chofer/${id}`,
        DELETE : (id: string) => `${V1}/chofer/${id}`,
    },
    CLIENTE : {
        GETALL: `${V1}/cliente`,
        GETBYID: (id: string) => `${V1}/cliente/${id}`,
        CREATE : `${V1}/cliente`,
        UPDATE : (id: string) => `${V1}/cliente/${id}`,
        DELETE : (id: string) => `${V1}/cliente/${id}`,
    },
    ESTADO : {
        GETALL: `${V1}/estado`,
        GETBYID: (id: string) => `${V1}/${id}`,
    },
    GUIA : {
        GETALL: `${V1}/${GUIA}`,
        GETBYID: (id: string) => `${V1}/${GUIA}/${id}`,
        CREATE : `${V1}/${GUIA}`,
        UPDATE : (id: string) => `${V1}/${GUIA}/${id}`,
        DELETE : (id: string) => `${V1}/${GUIA}/${id}`,
    },
    MUNICIPIO : {
        GETALL: `${V1}/municipio`,
        GETBYID: (id: string) => `${V1}/municipio/${id}`,
    },
    USUARIO: {
        GETALL: `${V1}/usuario`,
        BY_USERNAME: (username: string) => `${V1}/usuario/${username}`,
        CREATE: `${V1}/usuario`,
        UPDATE: (username: string) => `${V1}/usuario/${username}`,
    },

} as const;
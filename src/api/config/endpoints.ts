const V1 = '/v1';

const ARTICULO = 'articulo';
const ASIGNACION = 'asignacion';
const GUIA = 'guia';
const SUCURSAL = 'sucursal';

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
        GETBYESTADO : (estadoId: string)=> `${V1}/municipio/${estadoId}`,
        GETBYID: (id: string) => `${V1}/municipio/${id}`,
    },
    SEGURO : {
        GETALL: `${V1}/seguro`,
        GETBYID: (id: string) => `${V1}/seguro/${id}`,
        CREATE : `${V1}/seguro`,
        UPDATE : (id: string) => `${V1}/seguro/${id}`,
        DELETE : (id: string) => `${V1}/seguro/${id}`,
    },
    SUCURSAL : {
        GETALL: `${V1}/${SUCURSAL}`,
        GETBYID: (id: string) => `${V1}/${SUCURSAL}/${id}`,
        CREATE : `${V1}/${SUCURSAL}`,
        UPDATE : (id: string) => `${V1}/${SUCURSAL}/${id}`,
        DELETE : (id: string) => `${V1}/${SUCURSAL}/${id}`,
    },
    USUARIO: {
        GETALL: `${V1}/usuario`,
        BY_USERNAME: (username: string) => `${V1}/usuario/${username}`,
        CREATE: `${V1}/usuario`,
        UPDATE: (username: string) => `${V1}/usuario/${username}`,
    },

} as const;
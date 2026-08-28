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
        REPORTE_SALIDA : (id: string) => `${V1}/${ASIGNACION}/reporte-salidas/${id}`,
    },
    CHOFER : {
        GETALL: `${V1}/chofer`,
        GETBYID: (id: string) => `${V1}/chofer/${id}`,
        CREATE : `${V1}/chofer`,
        UPDATE : (id: string) => `${V1}/chofer/${id}`,
        DELETE : (id: string) => `${V1}/chofer/${id}`,
        DESACTIVAR : (id: string) => `${V1}/chofer/desactivar/${id}`,
    },
    CLIENTE : {
        GETALL: `${V1}/cliente`,
        GETBYID: (id: string) => `${V1}/cliente/${id}`,
        CREATE : `${V1}/cliente`,
        UPDATE : (id: string) => `${V1}/cliente/${id}`,
        DELETE : (id: string) => `${V1}/cliente/${id}`,
        DESACTIVAR : (id: string) => `${V1}/cliente/desactivar/${id}`,
    },
    ESTADO : {
        GETALL: `${V1}/estado`,
        GETBYID: (id: string) => `${V1}/${id}`,
    },
    GUIA : {
        GETALL: `${V1}/${GUIA}`,
        GET_FILTRO: `${V1}/${GUIA}/filtro`,
        GETBYID: (id: string) => `${V1}/${GUIA}/${id}`,
        CREATE : `${V1}/${GUIA}`,
        UPDATE : (id: string) => `v1/guia/${id}`,
        GENERAR_ETIQUETA : (id: string) => `v1/guia/etiqueta/${id}`,
        GENERAR_CARTA : (id: string) => `v1/guia/remision-pdf/${id}`,
        DELETE : (id: string) => `${V1}/${GUIA}/${id}`,
    },
    MUNICIPIO : {
        GETALL: `${V1}/municipio`,
        GETBYESTADO : (estadoId: string)=> `${V1}/municipio/${estadoId}`,
        GETBYID: (id: string) => `${V1}/municipio/${id}`,
    },
    ROLES : {
        GETALL: `${V1}/rol`,
        DESACTIVAR : (id: string) => `${V1}/roles/desactivar/${id}`,
    },
    RUTA : {
        GETALL: `${V1}/ruta`,
        GETBYID: (id: string) => `${V1}/ruta/${id}`,
        CREATE : `${V1}/ruta`,
        UPDATE : (id: string) => `${V1}/ruta/${id}`,
        DELETE : (id: string) => `${V1}/ruta/${id}`,
    },
    SEGURO : {
        GETALL: `${V1}/seguro`,
        GETBYID: (id: string) => `${V1}/seguro/${id}`,
        CREATE : `${V1}/seguro`,
        UPDATE : (id: string) => `${V1}/seguro/${id}`,
        DELETE : (id: string) => `${V1}/seguro/${id}`,
        DESACTIVAR : (id: string) => `${V1}/seguro/desactivar/${id}`,
    },
    SUCURSAL : {
        GETALL: `${V1}/${SUCURSAL}`,
        GETBYID: (id: string) => `${V1}/${SUCURSAL}/${id}`,
        CREATE : `${V1}/${SUCURSAL}`,
        UPDATE : (id: string) => `${V1}/${SUCURSAL}/${id}`,
        DELETE : (id: string) => `${V1}/${SUCURSAL}/${id}`,
        DESACTIVAR : (id: string) => `${V1}/sucursal/desactivar/${id}`,
    },
    USUARIO: {
        GETALL: `${V1}/usuario`,
        BY_USERNAME: (username: string) => `${V1}/usuario/${username}`,
        CREATE: `${V1}/usuario`,
        UPDATE: (username: string) => `${V1}/usuario/${username}`,
        DESACTIVAR : (id: string) => `${V1}/usuario/desactivar/${id}`,
    },

} as const;
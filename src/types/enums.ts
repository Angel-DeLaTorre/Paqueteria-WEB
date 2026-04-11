export const EstatusGenerico = {
    Inactivo: 0,
    Activo: 1,
} as const;

export type EstatusGenerico = typeof EstatusGenerico[keyof typeof EstatusGenerico];

export const FormaPago = {
    CreditoOrigen : 1,
    CreditoDestino : 2,
    Prepagado : 3,
    PorCobrarDestino : 4,
    Pagado : 5
} as const;

export type FormaPago = typeof FormaPago[keyof typeof FormaPago];
export const RolUsuario  ={
    Super : 1,
    Admin : 2,
    Reportes : 3,
    Operativo : 4
}

export type RolUsuario = typeof RolUsuario[keyof typeof RolUsuario];
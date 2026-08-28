import type {CatalogoNumber} from "types/CatalogoOption.ts";

export const formaPago: CatalogoNumber[] = [
    { value: 1, label: 'CreditoOrigen' },
    { value: 2, label: 'CreditoDestino' },
    { value: 3, label: 'Prepagado' },
    { value: 4, label: 'PorCobrarDestino' },
    { value: 5, label: 'Pagado' },
];
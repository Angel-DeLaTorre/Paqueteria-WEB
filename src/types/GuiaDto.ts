import type {DireccionDto} from "types/DireccionDto.ts";

export interface GuiaDto {
    guiaId: string;
    clave: string;
    fechaEnvio: Date;
    fechaPago: Date;
    clienteOrigenId: string;
    direccionOrigen: DireccionDto;
    clienteDestinoId: string;
    direccionDestino: DireccionDto;
    sucursalOrigenId: string;
    sucursalDestinoId: string;
    usuarioAltaId: string;
    usuarioCobroId: string;
    costoFlete: string;
    iva: string;
    ivaRetenido: string;
    subtotal: string;
    total: string;
    cobroSeguro: string;
    importeTexto: string;
    observaciones?: string;
    polizaSeguro?: string;
    seguro?: string;
}

export interface GuiaCreateDto {
    formaPago: string;
    fechaEnvio: Date;
    fechaPago: Date;
    clienteOrigenId: string;
    direccionOrigen: DireccionDto;
    clienteDestinoId: string;
    direccionDestino: DireccionDto;
    sucursalOrigenId: string;
    sucursalDestinoId: string;
    usuarioCobroId: string;
    costoFlete: string;
    iva: string;
    ivaRetenido: string;
    subtotal: string;
    total: string;
    cobroSeguro: string;
    importeTexto: string;
    observaciones?: string;
    polizaSeguro?: string;
    seguro?: string;
}

export interface GuiaUpdateDto {
    id: string;
}
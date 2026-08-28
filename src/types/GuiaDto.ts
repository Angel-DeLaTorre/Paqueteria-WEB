import type {DireccionClienteDto, DireccionDto} from "types/DireccionDto.ts";

export interface GuiaDto {
    guiaId: string;
    clave: string;
    fechaEnvio: Date;
    fechaPago: Date;
    clienteOrigenId: string;
    direccionOrigen: DireccionClienteDto;
    clienteDestinoId: string;
    direccionDestino: DireccionClienteDto;
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
    formaPago: number;
    fechaEnvio: Date;
    fechaPago: Date;
    clienteOrigenId: string;
    direccionOrigen: DireccionDto;
    direccionOrigenId: string;
    clienteDestinoId: string;
    direccionDestino: DireccionDto;
    direccionDestinoId: string;
    sucursalOrigenId: string;
    sucursalDestinoId: string;
    usuarioCobroId: string;
    costoFlete: string;
    iva: number;
    ivaRetenido: number;
    subtotal: number;
    total: number;
    importeTexto: string;
    observaciones?: string;
    estaAsegurado: boolean;
    polizaSeguro?: string;
    seguroId?: string;
    flete: number;
    cobroSeguro: number;
    recoleccion: number;
    entregaA: number;
    maniobras: number;
    peaje: number;
    lineas: number;
    condonaIva: boolean;
    articulosGuia: ArticuloGuiaCreateDto[];
}

export interface GuiaUpdateDto {
    id: string;
}

export interface GuiaCreadaDto {
    id: string;
    clave: string;
    fechaCaptura: Date;
}

export interface ArticuloGuiaCreateDto {
    claveProdServSat: string;
    descripcion: string;
    cantidad: number;
    claveUnidadSat: string;
    pesoUnitarioKg: number;
    claveTipoEmbalajeSat: string;
    valorUnidad: number;
    largo: number;
    ancho: number;
    alto: number;
    esMaterialPeligroso: boolean;
    claveMaterialPeligrosoSat: string;
}
import type {DireccionDto} from "./DireccionDto.ts";

export interface ClienteDto {
    clienteId: string;
    nombre: string;
    rfc?: string;
    telefono: string;
    telefono2?: string;
    correo: string;
    contacto: string;
    numConvenio?: string;
    polizaSeguro?: string;
    direcciones?: DireccionClienteDto[];
}

export interface ClienteCreateDto {
    nombre: string;
    rfc: string;
    telefono: string;
    telefono2?: string;
    correo: string;
    contacto: string;
    numConvenio?: string;
    polizaSeguro?: string;
    direccionC: DireccionDto;
}

export interface ClienteUpdateDto {
    clienteId: string;
    nombre: string;
    rfc: string;
    telefono: string;
    telefono2?: string;
    correo: string;
    contacto: string;
    numConvenio?: string;
    polizaSeguro?: string;
}

export interface DireccionClienteDto {
    direccionId: string;
    direccion: DireccionDto;
}
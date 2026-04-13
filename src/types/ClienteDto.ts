import type {DireccionDto} from "./DireccionDto.ts";

export interface ClienteDto {
    id: string;
    nombre: string;
    rfc?: string;
    telefono: string;
    telefono2?: string;
    correo: string;
    contacto: string;
    numConvenio?: string;
    polizaSeguro?: string;
    direcciones?: DireccionDto[];
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
}

export interface ClienteUpdateDto {
    id: string;
    nombre: string;
    rfc: string;
    telefono: string;
    telefono2?: string;
    correo: string;
    contacto: string;
    numConvenio?: string;
    polizaSeguro?: string;
}
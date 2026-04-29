import type {DireccionDto} from "./DireccionDto.ts";

export interface ClienteDto {
    idCliente: string;
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

export interface DireccionClienteDto {
    idDireccion: string;
    direccion: DireccionDto;
}
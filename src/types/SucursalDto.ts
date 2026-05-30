import type {DireccionDto} from "types/DireccionDto.ts";

export interface SucursalDto {
    sucursalId: string;
    nombre: string;
    codigo: string;
    direccion: DireccionDto;
    telefono: string;
    estado: string;
}

export interface SucursalCreateDto {
    nombre: string;
    codigo: string;
    esMatriz: boolean;
    direccion: DireccionDto;
    telefono: string;
}

export interface SucursalUpdateDto {
    sucursalId: string;
    nombre: string;
    codigo: string;
    direccion: DireccionDto;
    telefono: string;
    estado: string;
}
import type {DireccionDto} from "types/DireccionDto.ts";

export interface SucursalDto {
    id: string;
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
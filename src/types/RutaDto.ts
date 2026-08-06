import type {SucursalDto} from "types/SucursalDto.ts";

export interface RutaDto {
    rutaId: string;
    sucursalOrigenId: string;
    sucursalOrigen: SucursalDto;
    sucursalDestinoId: string;
    sucursalDestino: SucursalDto;
    descripcion: string;
}

export interface RutaCreateDto {
    sucursalOrigenId: string;
    sucursalDestinoId: string;
    descripcion: string;
}

export interface RutaUpdateDto {
    rutaId: string;
    sucursalOrigenId: string;
    sucursalDestinoId: string;
    descripcion: string;
}


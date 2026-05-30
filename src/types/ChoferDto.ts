import type { DireccionDto } from "@types";

export interface ChoferDto {
    choferId: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: DireccionDto;
    telefono: string;
    numCamion: string;
    numContenedor: string;
    numContenedor2: string;
}
export interface ChoferCreateDto {
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: DireccionDto;
    telefono: string;
    numCamion: string;
    numContenedor: string;
    numContenedor2: string;
}
export interface ChoferUpdateDto {
    choferId: string;
    nombre: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    direccion: DireccionDto;
    telefono: string;
    numCamion: string;
    numContenedor: string;
    numContenedor2: string;
}
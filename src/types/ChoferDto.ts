import type {DireccionDto} from "./DireccionDto.ts";

export interface ChoferDto {
    ChoferId: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Direccion: DireccionDto;
    Telefono: string;
    NumCamion: string;
    NumContenedor: string;
    NumContenedor2: string;
}
export interface ChoferCreateDto {
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Direccion: DireccionDto;
    Telefono: string;
    NumCamion: string;
    NumContenedor: string;
    NumContenedor2: string;
}
export interface ChoferUpdateDto {
    ChoferId: string;
    Nombre: string;
    ApellidoPaterno: string;
    ApellidoMaterno: string;
    Direccion: DireccionDto;
    Telefono: string;
    NumCamion: string;
    NumContenedor: string;
    NumContenedor2: string;
}
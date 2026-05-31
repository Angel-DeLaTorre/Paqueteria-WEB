import type {RolUsuario} from "./enums.ts";

export interface UsuarioDto {
    usuarioId: string;
    nombre: string;
    username: string,
    rol: RolUsuario;
    fechaUltimoAcesso: Date;
}
export interface UsuarioCreateDto {
    nombre: string;
    username: string;
    password: string;
    roles: string[];
}

export interface UsuarioUpdateDto {
    usuarioId : string;
    nombre: string;
    rol: string[];
}
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
    rol: RolUsuario;
}

export interface UsuarioUpdateDto {
    usuarioId : string;
    nombre: string;
    rol: RolUsuario;
}
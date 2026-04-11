import type {RolUsuario} from "./enums.ts";

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

export interface UsuarioDto {
    IdUsuario: string;
    Nombre: string;
    Username: string,
    Rol: RolUsuario;
    FechaUltimoAcesso: Date;
}
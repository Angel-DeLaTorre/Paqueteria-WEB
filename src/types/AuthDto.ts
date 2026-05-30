export interface LoginDto {
    username: string,
    password: string,
}

export interface SesionDto{
    username : string,
    nombre: string,
    permisos: string[];
    token: string,
    expiracion: Date
}
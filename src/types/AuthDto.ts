export interface LoginDto {
    username: string,
    password: string,
}

export interface SesionDto{
    username : string,
    nombre: string,
    rol: string,
    token: string,
    expiracion: Date
}
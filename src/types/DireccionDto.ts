export interface DireccionDto {
    direccionId: string;
    calle: string;
    colonia: string;
    numeroExterior: string;
    numeroInterior?: string;
    codigoPostal?: string;
    estado: string;
    localidad?: string;
    municipioId: string;
    municipioNombre: string;
}

export interface DireccionClienteDto {
    direccion: DireccionDto;
    direccionGuiaId: string;
    nombreMunicipio: string;
}
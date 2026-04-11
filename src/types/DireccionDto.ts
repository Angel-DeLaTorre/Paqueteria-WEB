export interface DireccionDto {
    id: string;
    calle: string;
    colonia: string;
    numeroExterior: string;
    numeroInterior?: string;
    codigoPostal?: string;
    estado: string;
    localidad?: string;
    idMunicipio: string;
    municipio: string;
}
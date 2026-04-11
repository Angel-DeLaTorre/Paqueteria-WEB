export interface ArticuloDto {
    ArticuloId: string;
    Texto: string;
    Similares: string;
    MaterialPeligroso: string;
}
export interface ArticuloCreateDto {
    ArticuloId: string;
    Texto: string;
    Similares: string;
    MaterialPeligroso: string;
    VigenciaDesde: Date;
    VigenciaHasta: Date;
}

export interface ArticuloUpdateDto {
    ArticuloId: string;
    Texto: string;
    Similares: string;
    MaterialPeligroso: string;
    VigenciaDesde: Date;
    VigenciaHasta: Date;
}
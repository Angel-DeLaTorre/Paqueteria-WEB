export interface ArticuloDto {
    articuloId: string;
    texto: string;
    similares: string;
    materialPeligroso: string;
}
export interface ArticuloCreateDto {
    articuloId: string;
    texto: string;
    similares: string;
    materialPeligroso: string;
    vigenciaDesde: Date;
    vigenciaHasta: Date;
}

export interface ArticuloUpdateDto {
    articuloId: string;
    texto: string;
    similares: string;
    materialPeligroso: string;
    vigenciaDesde: Date;
    vigenciaHasta: Date;
}
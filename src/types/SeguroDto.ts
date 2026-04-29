export interface SeguroDto {
    id: string;
    nombre: string;
}

export type SeguroCreateDto = Omit<SeguroDto, 'SeguroId'>
export type SeguroUpdateDto = SeguroDto
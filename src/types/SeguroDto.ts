export interface SeguroDto {
    seguroId: string;
    nombre: string;
}

export type SeguroCreateDto = Omit<SeguroDto, 'seguroId'>
export type SeguroUpdateDto = SeguroDto
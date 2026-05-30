export interface RolDto {
    rolId: string;
    descripcion: string;
    PermisosIds: string[];
}

export type RolCreateDto = Omit<RolDto, 'rolId'>
export type RolUpdateDto = RolDto
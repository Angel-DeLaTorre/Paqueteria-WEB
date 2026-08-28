import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';

import type {
    UsuarioRespuestaDto,
    UsuarioCrearDto,
    UsuarioActualizarDto,
    Respuesta
} from '@types';

export const getUsuarios = async (): Promise<Respuesta<UsuarioRespuestaDto[]>> => {
    const { data } = await api.get<Respuesta<UsuarioRespuestaDto[]>>(ENDPOINTS.USUARIO.GETALL);
    return data;
};

export const createUsuario = async (usuario: UsuarioCrearDto): Promise<Respuesta<UsuarioRespuestaDto>> => {
    const { data } = await api.post<Respuesta<UsuarioRespuestaDto>>(ENDPOINTS.USUARIO.CREATE, usuario);
    return data;
};

export const actualizarUsuarioApi = async (usuario: UsuarioActualizarDto): Promise<Respuesta<boolean>> => {
    if (!usuario.usuarioId) throw new Error("El ID de usuario es requerido para actualizar.");
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.USUARIO.UPDATE(usuario.usuarioId), usuario);
    return data;
};

export const desactivarUsuario = async (id: string): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.USUARIO.DESACTIVAR(id));
    return data;
};
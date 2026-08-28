import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ClienteDto, ClienteCrearDto, ClienteActualizarDto, Respuesta} from '@types';

export const getClientes = async (): Promise<Respuesta<ClienteDto[]>> => {
    const { data } = await api.get<Respuesta<ClienteDto[]>>(ENDPOINTS.CLIENTE.GETALL);
    return data;
};

export const getClienteById = async (id: string): Promise<Respuesta<ClienteDto>> => {
    const { data } = await api.get<Respuesta<ClienteDto>>(ENDPOINTS.CLIENTE.GETBYID(id));
    return data;
};

export const createCliente = async (cliente: ClienteCrearDto): Promise<Respuesta<ClienteDto>> => {
    const { data } = await api.post<Respuesta<ClienteDto>>(ENDPOINTS.CLIENTE.CREATE, cliente);
    return data;
};

export const updateCliente = async (cliente: ClienteActualizarDto): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.CLIENTE.UPDATE(cliente.clienteId), cliente);
    return data;
}

export const desactivarCliente = async ( id : string ): Promise<Respuesta<boolean>> => {
    const { data } = await api.put<Respuesta<boolean>>(ENDPOINTS.CLIENTE.DESACTIVAR(id));
    return data;
};
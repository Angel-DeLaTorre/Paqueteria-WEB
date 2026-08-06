import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ClienteDto, ClienteCreateDto, ClienteUpdateDto, Result} from '@types';

export const getClientes = async (): Promise<Result<ClienteDto[]>> => {
    const { data } = await api.get<Result<ClienteDto[]>>(ENDPOINTS.CLIENTE.GETALL);
    return data;
};

export const getClienteById = async (id: string): Promise<Result<ClienteDto>> => {
    const { data } = await api.get<Result<ClienteDto>>(ENDPOINTS.CLIENTE.GETBYID(id));
    return data;
};

export const createCliente = async (cliente: ClienteCreateDto): Promise<Result<ClienteDto>> => {
    const { data } = await api.post<Result<ClienteDto>>(ENDPOINTS.CLIENTE.CREATE, cliente);
    return data;
};

export const updateCliente = async (cliente: ClienteUpdateDto): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.CLIENTE.UPDATE(cliente.clienteId), cliente);
    return data;
}

export const desactivarCliente = async ( id : string ): Promise<Result<boolean>> => {
    const { data } = await api.put<Result<boolean>>(ENDPOINTS.CLIENTE.DESACTIVAR(id));
    return data;
};
import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ClienteDto, ClienteCreateDto, ClienteUpdateDto, ApiResult} from '@types';

export const getClientes = async (): Promise<ApiResult<ClienteDto[]>> => {
    const { data } = await api.get<ApiResult<ClienteDto[]>>(ENDPOINTS.CLIENTE.GETALL);
    return data;
};

export const getClienteById = async (id: string): Promise<ApiResult<ClienteDto>> => {
    const { data } = await api.get<ApiResult<ClienteDto>>(ENDPOINTS.CLIENTE.GETBYID(id));
    return data;
};

export const createCliente = async (cliente: ClienteCreateDto): Promise<ApiResult<ClienteDto>> => {
    const { data } = await api.post<ApiResult<ClienteDto>>(ENDPOINTS.CLIENTE.CREATE, cliente);
    return data;
};

export const updateCliente = async (cliente: ClienteUpdateDto): Promise<ApiResult<boolean>> => {
    const { data } = await api.put<ApiResult<boolean>>(ENDPOINTS.CLIENTE.UPDATE(cliente.clienteId), cliente);
    return data;
}
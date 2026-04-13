import api from '@api/config/axiosConfig';
import { ENDPOINTS } from '@api/config/endpoints';
import type {ClienteDto, ClienteCreateDto, ClienteUpdateDto} from '@types';

export const getClientes = async (): Promise<ClienteDto[]> => {
    const { data } = await api.get<ClienteDto[]>(ENDPOINTS.CLIENTE.GETALL);
    return data;
};

export const getClienteById = async (id: string): Promise<ClienteDto> => {
    const { data } = await api.get<ClienteDto>(ENDPOINTS.CLIENTE.GETBYID(id));
    return data;
};

export const createCliente = async (cliente: ClienteCreateDto): Promise<ClienteDto> => {
    const { data } = await api.post<ClienteDto>(ENDPOINTS.CLIENTE.CREATE, cliente);
    return data;
};

export const updateCliente = async (id: string, cliente: ClienteUpdateDto): Promise<boolean> => {
    const { data } = await api.post(ENDPOINTS.CLIENTE.UPDATE(id), cliente);
    return data;
}
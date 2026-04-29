import {useEffect, useState} from 'react';
import * as ClienteService from '@api/clienteService';
import type {ClienteCreateDto, ClienteDto} from '@types';
import { getErrorMessage } from '@utils';
import {message} from 'antd';

export const useCliente = () => {
    const [clientes, setClientes] = useState<ClienteDto[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchClientes = async () => {
        setLoading(true);
        try {
            const data = await ClienteService.getClientes();
            setClientes(data);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const fetchCliente = async (id: string): Promise<ClienteDto | null> => {
        setLoading(true);
        try {
            return await ClienteService.getClienteById(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const handleCreate = async (nuevoCliente: ClienteCreateDto) => {
        setLoading(true);
        try {
            await ClienteService.createCliente(nuevoCliente);
            message.success('Cliente creado con éxito');
            //await fetchClientes();
            return true;
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchClientes();
    }, []);

    return { clientes, loading, fetchCliente, handleCreate, refresh: fetchClientes };
};
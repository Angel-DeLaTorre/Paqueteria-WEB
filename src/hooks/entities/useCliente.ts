import {useEffect, useState} from 'react';
import * as ClienteService from '@api/clienteService.ts';
import type {ClienteCreateDto, ClienteDto} from '@types';
import { getErrorMessage } from '@utils';
import {message} from 'antd';
import { useNotification } from "@hooks";

export const useCliente = () => {
    const [clientes, setClientes] = useState<ClienteDto[]>([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const fetchClientes = async () => {
        setLoading(true);
        try {
            const result = await ClienteService.getClientes();
            if (result.isSuccess && result.value) {
                setClientes(result.value);
            } else {
                setClientes([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }
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
            const result = await ClienteService.getClienteById(id);
            if (result.isSuccess && result.value) {
                return result.value;
            } else {
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }
            return null;
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
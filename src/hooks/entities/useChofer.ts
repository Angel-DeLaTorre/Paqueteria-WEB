import {useEffect, useState} from 'react';
import * as choferService from '@api/choferService.ts';
import type {ChoferCreateDto, ChoferDto} from '@types';
import { getErrorMessage } from '@utils';
import {message} from 'antd';
import { useNotification } from "@hooks";

export const useChofer = () => {
    const [ choferes, setChoferes ] = useState<ChoferDto[]>([]);
    const [ loading, setLoading ] = useState(false);
    const { showNotification } = useNotification();

    const fetchChoferes = async () => {
        setLoading(true);
        try {
            const result = await choferService.getChoferes();
            if (result.isSuccess && result.value) {
                setChoferes(result.value);
            } else {
                setChoferes([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }
        } catch (error) {
            console.error(error);
            message.error('Error al cargar Choferes ' );
        } finally {
            setLoading(false);
        }
    };

    const fetchChofer = async (id: string): Promise<ChoferDto | null> => {
        setLoading(true);
        try {
            const result = await choferService.getChoferById(id);
            if (result.isSuccess && result.value) {
                return result.value;
            } else {
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }
            return null;
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            message.error('Error al cargar Chofer');
            return null;
        } finally {
            setLoading(false);
        }
    }

    const handleCreate = async (nuevoChofer: ChoferCreateDto) => {
        setLoading(true);
        try {
            await choferService.createChofer(nuevoChofer);
            message.success('Chofer creado con éxito');
            await fetchChoferes();
            return true;
        } catch (error) {
            console.error(error);
            message.error('Error al crear Chofer');
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchChoferes();
    }, []);

    return { choferes, loading, fetchChofer, handleCreate, refresh: fetchChoferes };
};
import {useEffect, useState} from 'react';
import * as choferService from '@api/choferService';
import type {ChoferCreateDto, ChoferDto} from '@types';
import { getErrorMessage } from '@utils';
import {message} from 'antd';

export const useChofer = () => {
    const [ choferes, setChoferes ] = useState<ChoferDto[]>([]);
    const [ loading, setLoading ] = useState(false);

    const fetchChoferes = async () => {
        setLoading(true);
        try {
            const data = await choferService.getChoferes();
            setChoferes(data);
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
            return await choferService.getChoferById(id);
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
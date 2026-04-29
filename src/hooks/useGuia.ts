import {useEffect, useState} from 'react';
import * as guiaService from '@api/guiaService';
import type {GuiaCreateDto, GuiaDto} from '@types';
import { getErrorMessage } from '@utils';
import {message} from 'antd';

export const useGuia = () => {
    const [guias, setGuias] = useState<GuiaDto[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchGuias = async () => {
        setLoading(true);
        try {
            const data = await guiaService.getGuias();
            setGuias(data);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const fetchGuia = async (id: string): Promise<GuiaDto | null> => {
        setLoading(true);
        try {
            return await guiaService.getGuiaById(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const handleCreate = async (nuevoGuia: GuiaCreateDto) => {
        setLoading(true);
        try {
            await guiaService.createGuia(nuevoGuia);
            message.success('Guia creado con éxito');
            await fetchGuias();
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
        void fetchGuias();
    }, []);

    return { guias, loading, fetchGuia, handleCreate, refresh: fetchGuias };
};
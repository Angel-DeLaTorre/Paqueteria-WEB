import {useEffect, useState} from 'react';
import * as guiaService from '@api/guiaService';
import type {GuiaCreateDto, GuiaDto} from '@types';
import { getErrorMessage } from '@utils';
import {message} from 'antd';
import { useNotification } from "@hooks";

export const useGuia = () => {
    const [guias, setGuias] = useState<GuiaDto[]>([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const fetchGuias = async () => {
        setLoading(true);
        try {
            const result = await guiaService.getGuias();
            if (result.isSuccess && result.value) {
                setGuias(result.value);
            } else {
                setGuias([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }

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
            const result = await guiaService.getGuiaById(id);
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
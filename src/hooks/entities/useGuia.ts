import {useCallback, useState} from 'react';
import * as guiaService from '@api/guiaService.ts';
import type {GuiaCreateDto, GuiaDto} from '@types';
import { getErrorMessage } from '@utils';
import { useNotification } from "@hooks";

export const useGuia = () => {
    const [guias, setGuias] = useState<GuiaDto[]>([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const fetchGuias = useCallback(async () => {
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
    }, [showNotification]);

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
            const resultado = await guiaService.createGuia(nuevoGuia);
            if (resultado.isSuccess && resultado.value) {
                return resultado;
            } else {
                showNotification({ type: 'error', message: 'Error', description: resultado.detalleError?.description || '' });
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            showNotification({ type: 'error', message: 'Error', description: msg || '' });
        } finally {
            setLoading(false);
        }
    };

    return { guias, loading, fetchGuia, handleCreate, refresh: fetchGuias };
};
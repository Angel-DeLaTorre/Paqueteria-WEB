import {useEffect, useState} from 'react';
import * as estadoService from '@api/estadoService.ts';
import type { EstadoDto } from '@types';
import { getErrorMessage } from '@utils';
import { useNotification } from "@hooks";

export const useEstado = () => {
    const [Estados, setEstados] = useState<EstadoDto[]>([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const fetchEstados = async () => {
        setLoading(true);
        try {
            const result = await estadoService.getEstados();
            if (result.isSuccess && result.value) {
                setEstados(result.value);
            } else {
                setEstados([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const fetchEstado = async (id: string): Promise<EstadoDto | null> => {
        setLoading(true);
        try {
            const result = await estadoService.getEstadoById(id);
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

    useEffect(() => {
        void fetchEstados();
    }, []);

    return { Estados, loading, fetchEstado, refresh: fetchEstados };
};
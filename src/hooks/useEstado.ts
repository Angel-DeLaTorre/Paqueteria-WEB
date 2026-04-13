import {useEffect, useState} from 'react';
import * as estadoService from '@api/estadoService';
import type { EstadoDto } from '@types';
import { getErrorMessage } from '@utils';

export const useEstado = () => {
    const [Estados, setEstados] = useState<EstadoDto[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchEstados = async () => {
        setLoading(true);
        try {
            const data = await estadoService.getEstados();
            setEstados(data);
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
            return await estadoService.getEstadoById(id);
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
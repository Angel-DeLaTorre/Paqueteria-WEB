import { useState, useCallback } from 'react';
import * as municipioService from '@api/municipioService.ts';
import type { MunicipioDto } from '@types';
import { getErrorMessage } from '@utils';
import { useNotification } from "@hooks";

export const useMunicipio = () => {
    const [municipios, setMunicipios] = useState<MunicipioDto[]>([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const fetchMunicipios = async () => {
        setLoading(true);
        try {
            const result = await municipioService.getMunicipios();
            if (result.esExitoso && result.datos) {
                setMunicipios(result.datos);
            } else {
                setMunicipios([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.descripcion || '' });
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const fetchMunicipiosByEstado = useCallback( async (estadoId: string) => {
        setLoading(true);
        try {
            const result = await municipioService.getMunicipiosByEstado(estadoId);
            if (result.esExitoso && result.datos) {
                setMunicipios(result.datos);
            } else {
                setMunicipios([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.descripcion || '' });
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }, [showNotification] );

    return {
        municipios,
        loading,
        fetchMunicipiosByEstado,
        refresh: fetchMunicipios,
        setMunicipios
    };
};
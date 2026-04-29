import { useState, useCallback } from 'react';
import * as municipioService from '@api/municipioService';
import type { MunicipioDto } from '@types';
import { getErrorMessage } from '@utils';

export const useMunicipio = () => {
    const [municipios, setMunicipios] = useState<MunicipioDto[]>([]);
    const [loadMunicipio, setLoading] = useState(false);

    const fetchMunicipios = async () => {
        setLoading(true);
        try {
            const data = await municipioService.getMunicipios();
            setMunicipios(data);
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
            const data = await municipioService.getMunicipiosByEstado(estadoId);
            setMunicipios(data);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }, [] );

    return { municipios, loadMunicipio, fetchMunicipiosByEstado, refresh: fetchMunicipios, setMunicipios };
};
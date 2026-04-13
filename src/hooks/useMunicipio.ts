import {useEffect, useState} from 'react';
import * as municipioService from '@api/municipioService';
import type { MunicipioDto } from '@types';
import { getErrorMessage } from '@utils';

export const useMunicipio = () => {
    const [Municipios, setMunicipios] = useState<MunicipioDto[]>([]);
    const [loading, setLoading] = useState(false);

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

    const fetchMunicipio = async (id: string): Promise<MunicipioDto | null> => {
        setLoading(true);
        try {
            return await municipioService.getMunicipioById(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        void fetchMunicipios();
    }, []);

    return { Municipios, loading, fetchMunicipio, refresh: fetchMunicipios };
};
import {useCallback, useEffect, useState} from 'react';
import {message} from 'antd';
import * as seguroService from '@api/seguroService';
import type {SeguroCreateDto, SeguroDto, SeguroUpdateDto} from '@types';
import {getErrorMessage} from "@utils";

export const useSeguro = () => {
    const [seguros, setSeguros] = useState<SeguroDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSeguros = useCallback(async () => {
        setLoading(true);
        try {
            const data = await seguroService.getSeguros();
            setSeguros(data);
        } catch (error) {
            const msg = getErrorMessage(error);
            message.error(msg);
            console.error("Error al obtener seguros:", msg);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSeguro = useCallback( async ( id : string) => {
        setLoading(true);
        try {
            return await seguroService.getSeguro(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            message.error(msg);
            console.error("Error al obtener seguros:", msg);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCreate = async (nuevoSeguro: SeguroCreateDto) => {
        setLoading(true);
        try {
            await seguroService.createSeguro(nuevoSeguro);
            message.success('Seguro creado con éxito');
            await fetchSeguros();
            return true;
        } catch (error) {
            message.error(getErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (seguroActualizado: SeguroUpdateDto) => {
        setLoading(true);
        try {
            await seguroService.updateSeguro(seguroActualizado);
            message.success('Seguro actualizado correctamente');
            await fetchSeguros();
            return true;
        } catch (error) {
            message.error(getErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        setLoading(true);
        try {
            await seguroService.deleteSeguro(id);
            message.warning('Seguro eliminado');
            await fetchSeguros();
            return true;
        } catch (error) {
            message.error(getErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchSeguros();
    }, [fetchSeguros]);

    return {
        seguros,
        loading,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchSeguro,
        refresh: fetchSeguros
    };
};
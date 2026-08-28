import {useCallback, useEffect, useState} from 'react';
import {message} from 'antd';
import type { RutaDto, RutaCreateDto, RutaUpdateDto} from '@types';
import * as rutaService from '@api/rutaService.ts';
import { getErrorMessage } from "@utils";
import { useNotification } from "@hooks";

export const useRuta = () => {
    const [rutas, setRutas] = useState<RutaDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { showNotification } = useNotification();

    const fetchRutas = useCallback(async () => {
        setLoading(true);
        try {
            const result = await rutaService.getRutas();
            if (result.isSuccess && result.value) {
                setRutas(result.value);
            } else {
                setRutas([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            message.error(msg);
            console.error("Error al obtener rutas:", msg);
        } finally {
            setLoading(false);
        }
    }, [showNotification]);

    const fetchSeguro = useCallback( async ( id : string) => {
        setLoading(true);
        try {
            return await rutaService.getRuta(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            message.error(msg);
            console.error("Error al obtener rutas:", msg);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCreate = async (nuevoSeguro: RutaCreateDto) => {
        setLoading(true);
        try {
            await rutaService.createRuta(nuevoSeguro);
            message.success('Ruta creada con éxito');
            await fetchRutas();
            return true;
        } catch (error) {
            message.error(getErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (rutaActualizado: RutaUpdateDto) => {
        setLoading(true);
        try {
            await rutaService.updateRuta(rutaActualizado);
            message.success('Ruta actualizada correctamente');
            await fetchRutas();
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
            await rutaService.deleteRuta(id);
            message.warning('Seguro eliminado');
            await fetchRutas();
            return true;
        } catch (error) {
            message.error(getErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchRutas();
    }, [fetchRutas]);

    return {
        rutas,
        loading,
        handleCreate,
        handleUpdate,
        handleDelete,
        fetchSeguro,
        refresh: fetchRutas
    };
};
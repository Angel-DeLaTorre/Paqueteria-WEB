import {useCallback, useEffect, useState} from 'react';
import * as seguroService from '@api/seguroService.ts';
import type {Result, SeguroCreateDto, SeguroDto, SeguroUpdateDto} from '@types';
import { ResultFactory} from '@types';
import {getErrorMessage} from "@utils";

export const useSeguro = (autoFetch = true) => {
    const [seguros, setSeguros] = useState<SeguroDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchSeguros = useCallback(async () => {
        setLoading(true);
        try {
            const result = await seguroService.getSeguros();
            if (result.isSuccess && result.value) {
                setSeguros(result.value);
            } else {
                setSeguros([]);
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            setSeguros([]);
            console.error("Error al obtener roles:", msg);
            return ResultFactory.failure(msg, 'ExceptionError');
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchSeguro = useCallback( async ( id : string) : Promise<Result<SeguroDto>> => {
        setLoading(true);
        try {
            return await seguroService.getSeguro(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error("Error al obtener roles:", msg);
            return ResultFactory.failure(msg, 'ExceptionError');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleCreate = useCallback( async (nuevoSeguro: SeguroCreateDto) : Promise<Result<SeguroDto>> => {
        setLoading(true);
        try {
            return await seguroService.createSeguro(nuevoSeguro);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error("Error al obtener roles:", msg);
            return ResultFactory.failure(msg, 'ExceptionError');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleUpdate = useCallback( async (seguroActualizado: SeguroUpdateDto) : Promise<Result<boolean>> => {
        setLoading(true);
        try {
            return await seguroService.updateSeguro(seguroActualizado);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error("Error al obtener roles:", msg);
            return ResultFactory.failure(msg, 'ExceptionError');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDelete = useCallback( async (id: string) : Promise<Result<boolean>> => {
        setLoading(true);
        try {
            return await seguroService.deleteSeguro(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error("Error al eliminar rol:", msg);
            return ResultFactory.failure(msg, 'ExceptionError');
        } finally {
            setLoading(false);
        }
    }, []);

    const handleDesactivarSeguro = useCallback( async (id: string) : Promise<Result<boolean>>  => {
        setLoading(true);
        try {
            return await seguroService.desactivarSeguro(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error("Error al desactivar rol:", msg);
            return ResultFactory.failure(msg, 'ExceptionError');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (autoFetch){
            void fetchSeguros();
        }
    }, [autoFetch, fetchSeguros]);

    return {
        seguros,
        loading,
        handleCreate,
        handleUpdate,
        handleDelete,
        handleDesactivarSeguro,
        fetchSeguro,
        refreshSeguros: fetchSeguros
    };
};
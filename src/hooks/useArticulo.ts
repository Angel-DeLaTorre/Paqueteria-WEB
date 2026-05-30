import { useState, useEffect } from 'react';
import * as articuloService from '@api/articuloService';
import type { ArticuloDto, ArticuloCreateDto } from '@types';
import { message } from 'antd';
import {getErrorMessage} from "@utils";
import {useNotification} from "@hooks";

export const useArticulo = () => {
    const [articulos, setArticulos] = useState<ArticuloDto[]>([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const fetchArticulos = async () => {
        setLoading(true);
        try {
            const result = await articuloService.getArticulos();
            if (result.isSuccess && result.value) {
                setArticulos(result.value);
            } else {
                setArticulos([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (nuevoArticulo: ArticuloCreateDto) => {
        setLoading(true);
        try {
            await articuloService.createArticulo(nuevoArticulo);
            message.success('Articulo creado con éxito');
            await fetchArticulos();
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
        void fetchArticulos();
    }, []);

    return { articulos, loading, handleCreate, refresh: fetchArticulos };
};
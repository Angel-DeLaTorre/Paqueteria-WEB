import { useState, useEffect } from 'react';
import * as articuloService from '@api/articuloService';
import type { ArticuloDto, ArticuloCreateDto } from '@types';
import { message } from 'antd';
import {getErrorMessage} from "@utils";

export const useArticulo = () => {
    const [Articulos, setArticulos] = useState<ArticuloDto[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchArticulos = async () => {
        setLoading(true);
        try {
            const data = await articuloService.getArticulos();
            setArticulos(data);
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

    return { Articulos, loading, handleCreate, refresh: fetchArticulos };
};
import { useState, useEffect } from 'react';
import { getSucursales, createSucursal } from '@api/sucursalService';
import type { SucursalDto, SucursalCreateDto } from '@types';
import { message } from 'antd';

export const useSucursal = () => {
    const [sucursales, setSucursales] = useState<SucursalDto[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchSucursales = async () => {
        setLoading(true);
        try {
            const data = await getSucursales();
            setSucursales(data);
        } catch (error) {
            console.error(error);
            message.error('Error al cargar usuarios ' );
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (sucursal: SucursalCreateDto) => {
        setLoading(true);
        try {
            await createSucursal(sucursal);
            message.success('Sucursal creado con éxito');
            await fetchSucursales();
            return true;
        } catch (error) {
            console.error(error);
            message.error('Error al crear sucursal');
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchSucursales();
    }, []);

    return { sucursales, loading, handleCreate, refresh: fetchSucursales };
};
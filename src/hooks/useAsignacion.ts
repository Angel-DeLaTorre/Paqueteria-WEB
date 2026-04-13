import {useEffect, useState} from 'react';
import * as asignacionService from '@api/asignacionService';
import type {AsignacionCreateDto, AsignacionDto} from '@types';
import { getErrorMessage } from '@utils';
import {message} from 'antd';

export const useAsignacion = () => {
    const [Asignaciones, setAsignaciones] = useState<AsignacionDto[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAsignaciones = async () => {
        setLoading(true);
        try {
            const data = await asignacionService.getAsignaciones();
            setAsignaciones(data);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
        } finally {
            setLoading(false);
        }
    };

    const fetchAsignacion = async (id: string): Promise<AsignacionDto | null> => {
        setLoading(true);
        try {
            return await asignacionService.getAsignacionById(id);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return null;
        } finally {
            setLoading(false);
        }
    }

    const handleCreate = async (nuevoAsignacion: AsignacionCreateDto) => {
        setLoading(true);
        try {
            await asignacionService.createAsignacion(nuevoAsignacion);
            message.success('Asignacion creado con éxito');
            await fetchAsignaciones();
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
        void fetchAsignaciones();
    }, []);

    return { Asignaciones, loading, fetchAsignacion, handleCreate, refresh: fetchAsignaciones };
};
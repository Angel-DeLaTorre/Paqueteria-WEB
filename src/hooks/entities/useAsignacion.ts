import {useCallback, useState} from 'react';
import * as asignacionService from '@api/asignacionService.ts';
import {type AsignacionCrearDto, type AsignacionDto, ResultFactory} from '@types';
import { getErrorMessage } from '@utils';


export const useAsignacion = () => {
    const [asignaciones, setAsignaciones] = useState<AsignacionDto[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchAsignaciones = useCallback(async () => {
        setCargando(true);
        try {
            const respuesta = await asignacionService.getAsignaciones();
            if (respuesta.esExitoso && respuesta.datos) {
                setAsignaciones(respuesta.datos);
            } else {
                setAsignaciones([]);
                setError(respuesta.detalleError?.descripcion || 'Error al obtener usuarios');
            }
            return respuesta;
        } catch (error) {
            const mensajeError = error instanceof Error ? error.message : 'Error de conexión inesperado';
            setError(mensajeError);
            return {
                esExitoso: false,
                datos: null,
                detalleError: { codigo: 'ErrorExcepcion', descripcion: mensajeError }
            };
        } finally {
            setCargando(false);
        }
    },[]);

    const fetchAsignacion = async (id: string): Promise<AsignacionDto | null> => {
        setCargando(true);
        try {
            const result = await asignacionService.getAsignacionById(id);
            return result.datos;





        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return null;
        } finally {
            setCargando(false);
        }
    }

    const handleCreate = async (nuevoAsignacion: AsignacionCrearDto) => {
        setCargando(true);
        try {
            return await asignacionService.createAsignacion(nuevoAsignacion);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return ResultFactory.failure<AsignacionDto>(msg)
        } finally {
            setCargando(false);
        }
    };

    const generarReporteSalida = async (idAsignacion: string) => {
        setCargando(true);
        try {
            const blobData = await asignacionService.generarReporteSalida(idAsignacion);
            return ResultFactory.success(blobData);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return ResultFactory.failure<Blob>(msg);
        } finally {
            setCargando(false);
        }
    }

    return { asignaciones, cargando, error, fetchAsignacion, handleCreate, generarReporteSalida, fetchAsignaciones };
};
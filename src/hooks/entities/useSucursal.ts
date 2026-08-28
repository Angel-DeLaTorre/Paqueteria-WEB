import { useCallback, useState } from 'react';
import * as sucursalService from '@api/sucursalService.ts';
import {
    type SucursalDto,
    type SucursalCrearDto,
    type SucursalActualizarDto,
    ResultFactory,
    type Respuesta
} from '@types';
import { getErrorMessage } from '@utils';

export const useSucursal = () => {
    const [sucursales, setSucursales] = useState<SucursalDto[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const obtenerSucursales = useCallback(async (): Promise<Respuesta<SucursalDto[]>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await sucursalService.getSucursales();
            if (respuesta.esExitoso && respuesta.datos) {
                setSucursales(respuesta.datos);
            } else {
                setSucursales([]);
                setError(respuesta.detalleError?.descripcion || 'Error al obtener las sucursales');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = getErrorMessage(err);
            setError(mensajeError);
            return ResultFactory.failure<SucursalDto[]>(mensajeError);
        } finally {
            setCargando(false);
        }
    }, []);

    const obtenerSucursalPorId = useCallback(async (id: string): Promise<Respuesta<SucursalDto>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await sucursalService.getSucursalById(id);
            if (!respuesta.esExitoso) {
                setError(respuesta.detalleError?.descripcion || 'Error al obtener la sucursal');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = getErrorMessage(err);
            setError(mensajeError);
            return ResultFactory.failure<SucursalDto>(mensajeError);
        } finally {
            setCargando(false);
        }
    }, []);

    const crearSucursal = useCallback(async (nuevaSucursal: SucursalCrearDto): Promise<Respuesta<SucursalDto>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await sucursalService.createSucursal(nuevaSucursal);
            if (!respuesta.esExitoso) {
                setError(respuesta.detalleError?.descripcion || 'Error al crear la sucursal');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = getErrorMessage(err);
            setError(mensajeError);
            return ResultFactory.failure<SucursalDto>(mensajeError);
        } finally {
            setCargando(false);
        }
    }, []);

    const actualizarSucursal = useCallback(async (sucursalUpdate: SucursalActualizarDto): Promise<Respuesta<boolean>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await sucursalService.updateSucursal(sucursalUpdate);
            if (!respuesta.esExitoso) {
                setError(respuesta.detalleError?.descripcion || 'Error al actualizar la sucursal');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = getErrorMessage(err);
            setError(mensajeError);
            return ResultFactory.failure<boolean>(mensajeError);
        } finally {
            setCargando(false);
        }
    }, []);

    return {
        sucursales,
        cargando,
        error,
        obtenerSucursales,
        obtenerSucursalPorId,
        crearSucursal,
        actualizarSucursal
    };
};
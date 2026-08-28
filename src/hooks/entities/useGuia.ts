import { useCallback, useState } from 'react';
import * as guiaService from '@api/guiaService.ts';
import {
    type GuiaDto,
    type GuiaFiltroDto,
    type GuiaActualizarDto,
    ResultFactory,
    type Respuesta, type GuiaCrearDto, type GuiaCreadaDto
} from '@types';
import { getErrorMessage } from '@utils';

export const useGuia = () => {
    const [guias, setGuias] = useState<GuiaDto[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const obtenerGuias = useCallback(async (): Promise<Respuesta<GuiaDto[]>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await guiaService.getGuias();
            if (respuesta.esExitoso && respuesta.datos) {
                setGuias(respuesta.datos);
            } else {
                setGuias([]);
                setError(respuesta.detalleError?.descripcion || 'Error al obtener las guías');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = getErrorMessage(err);
            setError(mensajeError);
            return ResultFactory.failure<GuiaDto[]>(mensajeError);
        } finally {
            setCargando(false);
        }
    }, []);

    const obtenerGuiasFiltro = useCallback(async (filtro?: GuiaFiltroDto): Promise<Respuesta<GuiaDto[]>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await guiaService.getGuiasFiltro(filtro);
            if (respuesta.esExitoso && respuesta.datos) {
                setGuias(respuesta.datos);
            } else {
                setGuias([]);
                setError(respuesta.detalleError?.descripcion || 'Error al filtrar las guías');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = getErrorMessage(err);
            setError(mensajeError);
            return ResultFactory.failure<GuiaDto[]>(mensajeError);
        } finally {
            setCargando(false);
        }
    }, []);

    const obtenerGuiaPorId = useCallback(async (id: string): Promise<Respuesta<GuiaDto>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await guiaService.getGuiaById(id);
            if (!respuesta.esExitoso) {
                setError(respuesta.detalleError?.descripcion || 'Error al obtener la guía');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = getErrorMessage(err);
            setError(mensajeError);
            return ResultFactory.failure<GuiaDto>(mensajeError);
        } finally {
            setCargando(false);
        }
    }, []);

    const crearGuia = useCallback(async (nuevoGuia: GuiaCrearDto): Promise<Respuesta<GuiaCreadaDto>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await guiaService.createGuia(nuevoGuia);
            if (!respuesta.esExitoso) {
                setError(respuesta.detalleError?.descripcion || 'Error al crear la guía');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = getErrorMessage(err);
            setError(mensajeError);
            return ResultFactory.failure<GuiaDto>(mensajeError);
        } finally {
            setCargando(false);
        }
    }, []);

    const actualizarGuia = useCallback(async (guiaUpdate: GuiaActualizarDto): Promise<Respuesta<boolean>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await guiaService.updateGuia(guiaUpdate);
            if (!respuesta.esExitoso) {
                setError(respuesta.detalleError?.descripcion || 'Error al actualizar la guía');
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

    const generarEtiquita = useCallback( async (idAsignacion: string) => {
        setCargando(true);
        try {
            const blobData = await guiaService.generarEtiqueta(idAsignacion);
            return ResultFactory.success(blobData);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return ResultFactory.failure<Blob>(msg);
        } finally {
            setCargando(false);
        }
    },[]);

    const generarCarta = useCallback( async (idAsignacion: string) => {
        setCargando(true);
        try {
            const blobData = await guiaService.generarCarta(idAsignacion);
            return ResultFactory.success(blobData);
        } catch (error) {
            const msg = getErrorMessage(error);
            console.error(msg);
            return ResultFactory.failure<Blob>(msg);
        } finally {
            setCargando(false);
        }
    },[]);

    return {
        guias,
        cargando,
        error,
        obtenerGuias,
        obtenerGuiasFiltro,
        obtenerGuiaPorId,
        crearGuia,
        actualizarGuia,
        generarEtiquita,
        generarCarta
    };
};
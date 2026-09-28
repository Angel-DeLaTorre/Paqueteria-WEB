import { useState, useCallback } from 'react';
import {getUsuarios, createUsuario, actualizarUsuarioApi} from '@api/usuarioService.ts';
import type {UsuarioRespuestaDto, UsuarioCrearDto, Respuesta, UsuarioActualizarDto} from '@types';

export const useUsuario = () => {
    const [usuarios, setUsuarios] = useState<UsuarioRespuestaDto[]>([]);
    const [cargando, setCargando] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const obtenerUsuarios = useCallback(async (): Promise<Respuesta<UsuarioRespuestaDto[]>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await getUsuarios();
            if (respuesta.esExitoso && respuesta.datos) {
                setUsuarios(respuesta.datos);
            } else {
                setUsuarios([]);
                setError(respuesta.detalleError?.descripcion || 'Error al obtener usuarios');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = err instanceof Error ? err.message : 'Error de conexión inesperado';
            setError(mensajeError);
            return {
                esExitoso: false,
                datos: null,
                detalleError: { codigo: 'ErrorExcepcion', descripcion: mensajeError }
            };
        } finally {
            setCargando(false);
        }
    }, []);

    const crearUsuario = useCallback(async (nuevoUsuario: UsuarioCrearDto): Promise<Respuesta<UsuarioRespuestaDto>> => {
        setCargando(true);
        setError(null);
        try {
            const respuesta = await createUsuario(nuevoUsuario);
            if (!respuesta.esExitoso) {
                setError(respuesta.detalleError?.descripcion || 'Error al crear usuario');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = err instanceof Error ? err.message : 'Error al intentar crear el usuario';
            setError(mensajeError);
            return {
                esExitoso: false,
                datos: null,
                detalleError: { codigo: 'ErrorExcepcion', descripcion: mensajeError }
            };
        } finally {
            setCargando(false);
        }
    }, []);

    const actualizarUsuario = useCallback( async ( actualizaUsuario: UsuarioActualizarDto ) : Promise<Respuesta<boolean>> => {
        setCargando(true);
        setError(null);
        try{
            const respuesta = await actualizarUsuarioApi(actualizaUsuario);
            if (!respuesta.esExitoso) {
                setError(respuesta.detalleError?.descripcion || 'Error al actualizar usuario');
            }
            return respuesta;
        } catch (err) {
            const mensajeError = err instanceof Error ? err.message : 'Error al intentar crear el usuario';
            setError(mensajeError);
            return {
                esExitoso: false,
                datos: null,
                detalleError: { codigo: 'ErrorExcepcion', descripcion: mensajeError }
            };
        } finally {
            setCargando(false);
        }
    }, [])

    return {
        usuarios,
        cargando,
        error,
        obtenerUsuarios,
        crearUsuario,
        actualizarUsuario
    };
};
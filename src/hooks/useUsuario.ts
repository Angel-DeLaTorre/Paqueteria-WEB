import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario } from '@api/usuarioService.ts';
import type { UsuarioDto, UsuarioCreateDto } from '@types';
import { message } from 'antd';

export const useUsuario = () => {
    const [usuarios, setUsuarios] = useState<UsuarioDto[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const data = await getUsuarios();
            setUsuarios(data);
        } catch (error) {
            console.error(error);
            message.error('Error al cargar usuarios ' );
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (nuevoUsuario: UsuarioCreateDto) => {
        setLoading(true);
        try {
            await createUsuario(nuevoUsuario);
            message.success('Usuario creado con éxito');
            await fetchUsuarios();
            return true;
        } catch (error) {
            console.error(error);
            message.error('Error al crear usuario');
            return false;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchUsuarios();
    }, []);

    return { usuarios, loading, handleCreate, refresh: fetchUsuarios };
};
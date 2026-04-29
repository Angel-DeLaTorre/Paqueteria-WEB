import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario } from '@api/usuarioService.ts';
import type { UsuarioDto, UsuarioCreateDto } from '@types';

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
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = async (nuevoUsuario: UsuarioCreateDto) => {
        setLoading(true);
        try {
            await createUsuario(nuevoUsuario);
            await fetchUsuarios();
            return true;
        } catch (error) {
            console.error(error);
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
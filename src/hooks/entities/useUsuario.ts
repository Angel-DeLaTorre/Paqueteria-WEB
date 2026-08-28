import { useState, useEffect } from 'react';
import { getUsuarios, createUsuario } from '@api/usuarioService.ts';
import type { UsuarioDto, UsuarioCreateDto } from '@types';
import { useNotification } from "@hooks";

export const useUsuario = () => {
    const [usuarios, setUsuarios] = useState<UsuarioDto[]>([]);
    const [loading, setLoading] = useState(false);
    const { showNotification } = useNotification();

    const fetchUsuarios = async () => {
        setLoading(true);
        try {
            const result = await getUsuarios();
            if (result.isSuccess && result.value) {
                setUsuarios(result.value);
            } else {
                setUsuarios([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.description || '' });
            }
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
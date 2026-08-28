import {useCallback, useEffect, useState} from 'react';
import {message} from 'antd';
import * as roleservice from '@api/rolService.ts';
import type { RolDto } from '@types';
import {getErrorMessage} from "@utils";
import { useNotification } from "@hooks";

export const useRol = () => {
    const [roles, setRoles] = useState<RolDto[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { showNotification } = useNotification();

    const fetchRoles = useCallback(async () => {
        setLoading(true);
        try {
            const result = await roleservice.getRoles();
            if (result.esExitoso && result.datos) {
                setRoles(result.datos);
            } else {
                setRoles([]);
                showNotification({ type: 'error', message: 'Error', description: result.detalleError?.descripcion || '' });
            }
        } catch (error) {
            const msg = getErrorMessage(error);
            message.error(msg);
            console.error("Error al obtener roles:", msg);
        } finally {
            setLoading(false);
        }
    }, [showNotification]);

    useEffect(() => {
        void fetchRoles();
    }, [fetchRoles]);

    return {
        roles,
        loading,
        refresh: fetchRoles
    };
};
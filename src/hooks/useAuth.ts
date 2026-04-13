import { useState } from 'react';
import { postLogin } from '@api/authService';
import { useAuthStore } from '@store/useAuthStore';
import { message } from 'antd';
import type { LoginDto } from '@types';
import { getErrorMessage } from '@utils'

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const setSession = useAuthStore((state) => state.setSession);
    const logout = useAuthStore((state) => state.clearSession);

    const executeLogin = async (values: LoginDto) => {
        setLoading(true);
        try {
            const data = await postLogin(values);
            setSession(data.token);
            message.success('Acceso correcto');
            return true;
        } catch (error) {
            message.error(getErrorMessage(error));
            return false;
        } finally {
            setLoading(false);
        }
    };

    return { executeLogin, loading, logout };
};
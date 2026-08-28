import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useAuth } from "@hooks"
import { useNavigate } from "react-router-dom";
import type { LoginSolicitudDto } from "@types";
import { ROUTES } from '@router/rutas'
import { useNotification } from '@hooks'

const Login: React.FC = () => {

    const { executeLogin, loading } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const onFinish = async (values: LoginSolicitudDto) => {
        const result = await executeLogin(values);

        if (result.esExitoso) {
            navigate(ROUTES.DASHBOARD);
        } else {
            showNotification({
                type: 'error',
                message: 'Error de Autenticación',
                description: result.detalleError?.descripcion || 'Credenciales incorrectas.',
                errorCode: result.detalleError?.codigo || 'ERR_UNKNOWN'
            });
        }
    };

    return (
        <Card title="Inicio de Sesión" style={{ width: 400, margin: '100px auto' }}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="username" label="Usuario" rules={[{ required: true }]}>
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Contraseña" rules={[{ required: true }]}>
                    <Input.Password />
                </Form.Item>
                <Button type="primary" htmlType="submit" block loading={loading}>
                    Entrar
                </Button>
            </Form>
        </Card>
    );
};

export default Login;
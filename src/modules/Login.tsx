import React from 'react';
import { Form, Input, Button, Card } from 'antd';
import { useAuth } from "@hooks"
import { useNavigate } from "react-router-dom";
import type {LoginDto} from "@types";
import { ROUTES } from '@router/rutas'
import { useNotification } from '@hooks'

const Login: React.FC = () => {

    const { executeLogin, loading } = useAuth();
    const { showNotification } = useNotification();
    const navigate = useNavigate();

    const onFinish = async (values: LoginDto) => {
        const result = await executeLogin(values);

        if (result.isSuccess) {
            navigate(ROUTES.DASHBOARD);
        } else {
            showNotification({
                type: 'error',
                message: 'Error de Autenticación',
                description: result.detalleError?.description || 'Credenciales incorrectas.',
                errorCode: result.detalleError?.code || 'ERR_UNKNOWN'
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
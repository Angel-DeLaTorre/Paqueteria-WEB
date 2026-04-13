import React from 'react';
import { Form, Input, Button, Card } from 'antd';
//import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useAuth } from "@hooks"
import { useNavigate } from "react-router-dom";
import type {LoginDto} from "@types";


const Login: React.FC = () => {

    const { executeLogin, loading } = useAuth();
    const navigate = useNavigate();

    const onFinish = async (values: LoginDto) => {
        const success = await executeLogin(values);
        if (success) navigate('/app/usuarios');
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
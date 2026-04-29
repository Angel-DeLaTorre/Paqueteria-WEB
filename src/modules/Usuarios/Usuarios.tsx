import { useState } from 'react';
import { Table, Button, Card, Space, Form, Input, Select, Col } from 'antd';
import { UserAddOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { CatalogoModal } from '@components/ModalCatalogo'
import type { UsuarioDto } from '@types';
import { RolUsuario } from '@types';
import { useUsuario } from '@hooks';

const UsuariosScreen = () => {
    const { usuarios, loading, handleCreate } = useUsuario();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);


    // Columnas de la Tabla
    const columns = [
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', sorter: (a : UsuarioDto, b: UsuarioDto) => a.Nombre.localeCompare(b.Nombre) },
        { title: 'Username', dataIndex: 'username', key: 'usermane' },
        { title: 'Ultimo Acesso', dataIndex: 'fechaUltimoAcesso', key: 'fechaUltimoAcesso' },
        {
            title: 'Rol',
            dataIndex: 'rol',
            key: 'rol',
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: () => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} type="text" />
                    <Button icon={<DeleteOutlined />} type="text" danger />
                </Space>
            ),
        },
    ];

    const onSave = async () => {
        const values = await form.validateFields();
        const success = await handleCreate(values);
        if (success) {
            setIsModalVisible(false);
            form.resetFields();
        }
    };

    const onChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    const onSearch = (value: string) => {
        console.log('search:', value);
    };

    const rolOptions = Object.entries(RolUsuario).map(([label, value]) => ({
        label: label,
        value: value
    }));

    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Gestión de Usuarios"
                extra={
                    <Button
                        type="primary"
                        icon={<UserAddOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Nuevo Usuario
                    </Button>
                }
            >
                <Table
                    columns = { columns }
                    dataSource = { usuarios }
                    rowKey = "id"
                    pagination = {{ pageSize: 10 }}
                    loading = { loading }
                />
            </Card>

            <CatalogoModal
                title = "Gestión de Usuario"
                open = { isModalVisible }
                onCancel = { () => setIsModalVisible(false)}
                onSave = { onSave }
                form = { form }
                loading = { loading }
            >
                <Col span={6}>
                    <Form.Item
                        name = "nombre"
                        label = "Nombre"
                        rules = {[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="username"
                        label="Usuario"
                        rules = {[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        name = "password"
                        label = "Contraseña"
                        rules = {[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        name = "rol"
                        label = "Rol"
                        rules = {[{ required: true }]}
                    >
                        <Select
                            showSearch = {{ optionFilterProp: 'label', onSearch }}
                            placeholder = "Selecciona un rol"
                            onChange = { onChange }
                            options = { rolOptions }
                        />
                        </Form.Item>
                </Col>
            </CatalogoModal>
        </div>
    );
};

export default UsuariosScreen;
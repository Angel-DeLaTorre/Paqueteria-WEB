import React, { useState } from 'react';
import {Table, Button, Card, Form, Input, Space, Col, Divider, InputNumber} from 'antd';
import {DeleteOutlined, EditOutlined, UserAddOutlined} from '@ant-design/icons';
import { CatalogoModal } from '@components/ModalCatalogo'
import { useChofer } from "@hooks";
import type { ChoferDto } from "@types";


const ChoferScreen: React.FC = () => {

    const { choferes, loading, handleCreate } = useChofer();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        { title: 'Nombre', dataIndex: 'nombre', key: 'nombre', sorter: (a : ChoferDto, b: ChoferDto) => a.Nombre.localeCompare(b.Nombre) },
        { title: 'Apellido P', dataIndex: 'username', key: 'usermane' },
        { title: 'Apellido M', dataIndex: 'fechaUltimoAcesso', key: 'fechaUltimoAcesso' },
        { title: 'Telefono', dataIndex: 'fechaUltimoAcesso', key: 'fechaUltimoAcesso' },
        { title: 'Num Camion', dataIndex: 'fechaUltimoAcesso', key: 'fechaUltimoAcesso' },
        { title: 'Num Contenedor', dataIndex: 'fechaUltimoAcesso', key: 'fechaUltimoAcesso' },
        { title: 'Num Contenedor 2', dataIndex: 'fechaUltimoAcesso', key: 'fechaUltimoAcesso' },
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

    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Gestión de Choferes"
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
                    dataSource = { choferes }
                    rowKey = "id"
                    pagination = {{ pageSize: 10 }}
                    loading = { loading }
                />
            </Card>

            <CatalogoModal
                title="Registro de Chofer"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSave={onSave}
                form={form}
                loading={loading}
            >
                <Col span={24}>
                    <Divider orientation="horizontal" plain>Información Personal</Divider>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                    >
                        <Input placeholder="Ej. Juan" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="apellidoPaterno"
                        label="Apellido Paterno"
                        rules={[{ required: true, message: 'El apellido paterno es obligatorio' }]}
                    >
                        <Input placeholder="Ej. Pérez" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="apellidoMaterno" label="Apellido Materno">
                        <Input placeholder="Ej. García" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="telefono"
                        label="Teléfono"
                        rules={[{ max: 20, message: 'Máximo 20 caracteres' }]}
                    >
                        <Input placeholder="Teléfono de contacto" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="direccion" label="Dirección Completa">
                        <Input placeholder="Calle, número y colonia" />
                    </Form.Item>
                </Col>

                <Col span={24}>
                    <Divider orientation="horizontal" plain>Unidades Asignadas</Divider>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="numCamion"
                        label="Número de Camión"
                        rules={[{ required: true, message: 'Requerido' }]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="numContenedor"
                        label="Contenedor Principal"
                        rules={[{ required: true, message: 'Requerido' }]}
                    >
                        <InputNumber style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item name="numContenedor2" label="Contenedor Secundario">
                        <InputNumber style={{ width: '100%' }} placeholder="0" />
                    </Form.Item>
                </Col>
            </CatalogoModal>
        </div>
    );
};

export default ChoferScreen;
import React, { useState } from 'react';
import {Table, Button, Card, Form, Input, Space, Col, Divider } from 'antd';
import { DeleteOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { CatalogoModal } from '@components/ModalCatalogo';
import { useSucursal } from "@hooks";
import type { SucursalDto } from "@types";
import {DireccionFormFields} from "@components/DireccionModal.tsx";

const SucursalScreen: React.FC = () => {

    const { sucursales, loading, handleCreate } = useSucursal();
    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'Código',
            dataIndex: 'codigo',
            key: 'codigo',
            width: '10%'
        },
        {
            title: 'Sucursal',
            dataIndex: 'nombre',
            key: 'nombre',
            sorter: (a: SucursalDto, b: SucursalDto) => a.nombre.localeCompare(b.nombre)
        },
        {
            title: 'Teléfono',
            dataIndex: 'telefono',
            key: 'telefono'
        },
        {
            title: 'Estado',
            dataIndex: 'estado',
            key: 'estado'
        },
        {
            title: 'Acciones',
            key: 'acciones',
            width: '15%',
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
                title="Gestión de Sucursales"
                extra={
                    <Button
                        type="primary"
                        icon={<HomeOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Nueva Sucursal
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={sucursales}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            <CatalogoModal
                title="Registro de Sucursal"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSave={onSave}
                form={form}
                loading={loading}
            >
                <Col span={24}>
                    <Divider orientation="horizontal" plain>Identificación de Sucursal</Divider>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name="codigo"
                        label="Código"
                        rules={[{ required: true, message: 'El código es obligatorio' }]}
                    >
                        <Input placeholder="Ej. SUC-01" />
                    </Form.Item>
                </Col>

                <Col span={16}>
                    <Form.Item
                        name="nombre"
                        label="Nombre de Sucursal"
                        rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                    >
                        <Input placeholder="Ej. Centro Histórico" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item
                        name="telefono"
                        label="Teléfono"
                        rules={[{ required: true, message: 'El teléfono es obligatorio' }]}
                    >
                        <Input placeholder="Teléfono de oficina" />
                    </Form.Item>
                </Col>

                <DireccionFormFields form={form} />
            </CatalogoModal>
        </div>
    );
};

export default SucursalScreen;
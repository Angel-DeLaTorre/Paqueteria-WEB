import React, { useState } from 'react';
import {Table, Button, Card, Form, Input, Space, Col, Tag, Select} from 'antd';
import { DeleteOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { CatalogoModal } from '@components/ModalCatalogo';
import {useRuta, useSucursal} from "@hooks";
import type {RutaDto} from "@types";

const RutaScreen: React.FC = () => {

    const { rutas, loading, handleCreate } = useRuta();
    const { sucursales } = useSucursal();
    const [form] = Form.useForm();

    const sucursalOrigenSeleccionada = Form.useWatch('sucursalOrigenId', form);
    const sucursalDestinoSeleccionada = Form.useWatch('sucursalDestinoId', form);

    const opcionesOrigen = sucursales.map(s => ({
        ...s,
        disabled: s.sucursalId === sucursalDestinoSeleccionada
    }));

// Deshabilita en el destino lo que ya se seleccionó en el origen
    const opcionesDestino = sucursales.map(s => ({
        ...s,
        disabled: s.sucursalId === sucursalOrigenSeleccionada
    }));

    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'Descripcion',
            dataIndex: 'descripcion',
            key: 'descripcion',
            width: '10%'
        },
        {
            title: 'Sucursal Origen',
            key: 'sucursalOrigenNombre',
            render: (record : RutaDto) => {
                const sucursal = record.sucursalOrigen;
                if (!sucursal) return <Tag>N/A</Tag>;

                return (
                    <Space>
                        {sucursal.codigo ? <Tag color="blue">{sucursal.codigo}</Tag> : <Tag>N/A</Tag>}
                        <span>{sucursal.nombre}</span>
                    </Space>
                );
            }
        },
        {
            title: 'Sucursal Destino',
            key: 'sucursalDestinoNombre',
            render: (record: RutaDto) => {
                const sucursal = record.sucursalOrigen;
                if (!sucursal) return <Tag>N/A</Tag>;

                return (
                    <Space>
                        {sucursal.codigo ? <Tag color="blue">{sucursal.codigo}</Tag> : <Tag>N/A</Tag>}
                        <span>{sucursal.nombre}</span>
                    </Space>
                );
            }
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
                title="Gestión de Rutas"
                extra={
                    <Button
                        type="primary"
                        icon={<HomeOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Nueva Ruta
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={rutas}
                    rowKey="rutaId"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            <CatalogoModal
                title="Registro de Ruta"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSave={onSave}
                form={form}
                loading={loading}
            >
                <Col span={16}>
                    <Form.Item
                        name="descripcion"
                        label="Descripcion de Ruta"
                        rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                    >
                        <Input placeholder="Leon-Guadalajara" />
                    </Form.Item>
                </Col>


                <Col span={8}>
                    <Form.Item
                        name = "sucursalOrigenId"
                        label = "Sucursal Origen"
                        rules={[{ required: true, message: 'Requerido' }]}
                    >
                        <Select
                            placeholder = "Sucursal Origen"
                            options = {opcionesOrigen}
                            fieldNames = {{ label: 'nombre', value: 'sucursalId' }}
                            showSearch = {{
                                filterOption: (input, option) =>
                                    (option?.nombre ?? '').toLowerCase().includes(input.toLowerCase())
                            }}
                        />
                    </Form.Item>
                </Col>

                <Col span={8}>
                    <Form.Item
                        name = "sucursalDestinoId"
                        label = "Sucursal Destino"
                        rules={[{ required: true, message: 'Requerido' }]}
                    >
                        <Select
                            placeholder = "Sucursal Destino"
                            options = {opcionesDestino}
                            fieldNames = {{ label: 'nombre', value: 'sucursalId' }}
                            showSearch={{
                                filterOption: (input, option) =>
                                    (option?.nombre ?? '').toLowerCase().includes(input.toLowerCase())
                            }}
                        />
                    </Form.Item>
                </Col>

            </CatalogoModal>
        </div>
    );
};

export default RutaScreen;
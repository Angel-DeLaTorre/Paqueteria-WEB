import React, { useState } from 'react';
import {Table, Button, Space, Card, Typography, Tag, Divider, message, Form, Input, Col } from 'antd';
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type {ClienteDto, DireccionClienteDto} from "@types";
import { useCliente } from "@hooks";
import { CatalogoModal } from "@components/ModalCatalogo";
import { DireccionFormFields } from "@components/DireccionModal"

const { Title, Text } = Typography;

const Clientes: React.FC = () => {

    const [isModalVisible, setIsModalVisible] = useState(false);
    const { clientes, loading, handleCreate, refresh } = useCliente();
    const [form] = Form.useForm();

    const showModal = (record?: ClienteDto) => {
        if (record) {
            message.success('Artículo creado localmente');
        } else {
            message.success('Artículo creado localmente');
        }
    };

    const handleDelete = (id: string) => {
        message.success('Cliente eliminado localmente' + id);
    };

    const onSave = async () => {
        try {
            // Valida los campos del formulario de Ant Design
            const values = await form.validateFields();

            // Ejecuta la creación
            const success = await handleCreate(values);

            if (success) {
                setIsModalVisible(false);
                form.resetFields();
                await refresh();
            }
        } catch (validationError) {
            // Errores de validación visual del formulario (no de API)
            console.log("Validación fallida:", validationError);
        }
    };

    const columns: ColumnsType<ClienteDto> = [
        {
            title: 'Nombre / Razón Social',
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record) => (
                <Space orientation="vertical" size={0}>
                    <Text strong>{text}</Text>
                    <Text type="secondary" style={{ fontSize: '12px' }}>{record.rfc || 'Sin RFC'}</Text>
                </Space>
            )
        },
        { title: 'Contacto', dataIndex: 'contacto', key: 'contacto' },
        { title: 'Teléfono', dataIndex: 'telefono', key: 'telefono' },
        { title: 'Correo', dataIndex: 'correo', key: 'correo' },
        {
            title: 'Convenio',
            dataIndex: 'numConvenio',
            key: 'numConvenio',
            render: (val) => val ? <Tag color="blue">{val}</Tag> : <Tag>N/A</Tag>
        },
        {
            title: 'Acciones',
            key: 'acciones',
            fixed: 'right',
            width: 150,
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        type="text"
                        icon={<EditOutlined style={{ color: '#1890ff' }} />}
                        onClick={() => showModal(record)}
                    />
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => handleDelete(record.idCliente)}
                    />
                </Space>
            ),
        },
    ];

    const expandedRowRender = (record: ClienteDto) => {
        const columns : ColumnsType<DireccionClienteDto> = [
            {
                title: 'Dirección Completa',
                key: 'direccionTexto',
                render: (_, dir ) => {

                    const d = dir.direccion;

                    if (!d) return <Text type="secondary">Sin datos de dirección</Text>;

                    return (
                        <Text>
                            {`${d.calle} #${d.numeroExterior}${d.numeroInterior ? ` Int. ${d.numeroInterior}` : ''}, Col. ${d.colonia}, C.P. ${d.codigoPostal}`}
                        </Text>
                    );
                },
            },
            {
                title: 'Municipio',
                // Usamos el path completo en dataIndex o render
                render: (_, dir ) => dir.direccion?.municipioNombre || 'N/A',
                key: 'municipio',
            },
            {
                title: 'Estado',
                render: (_, dir ) => dir.direccion?.estado || 'N/A',
                key: 'estado',
            }
        ];

        return (
            <Table
                columns={columns}
                dataSource={record.direcciones}
                pagination={false}
                rowKey="idDireccion"
                size="small"
            />
        );
    };


    return (
        <div style={{ padding: '24px' }}>
            <Card>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                    <Title level={3} style={{ margin: 0 }}>Catálogo de Clientes</Title>

                    <Button
                        type = "primary"
                        icon = { <PlusOutlined /> }
                        size = "large"
                        onClick={() => setIsModalVisible(true)}
                    >
                        Nuevo Cliente
                    </Button>
                </div>

                <Table
                    columns = { columns }
                    dataSource = { clientes }
                    rowKey = "idCliente"
                    expandable={{
                        expandedRowRender,
                        rowExpandable: (record) => !!(record.direcciones && record.direcciones.length > 0),
                    }}
                />
            </Card>

            <CatalogoModal
                title = "Registro de cliente"
                open = { isModalVisible }
                onCancel = { () => setIsModalVisible(false)}
                onSave = { onSave }
                form = { form }
                loading = { loading }
            >
                <Col span={24}>
                    <Divider orientation="horizontal" plain>Datos generales</Divider>
                </Col>
                <Col span={12}>
                    <Form.Item name="nombre" label="Nombre Completo" rules={[{ required: true }]}>
                        <Input placeholder="" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="rfc" label="RFC" rules={[{ required: true }]}>
                        <Input placeholder="" />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="telefono" label="Teléfono de Contacto" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="telefono2" label="Teléfono de Contacto adicional">
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="correo" label="Correo de Contacto">
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="contacto" label="Nombre del contacto">
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="numConvenio" label="Número de convenio">
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Form.Item name="polizaSeguro" label="Poliza Seguro">
                        <Input />
                    </Form.Item>
                </Col>

                <DireccionFormFields form={form} fieldName="direccionC" />

            </CatalogoModal>
        </div>
    );
};

export default Clientes;
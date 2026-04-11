import React, { useState } from 'react';
import {Table, Button, Space, Card, Typography, Tag, List, Divider, message} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, EnvironmentOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type {ClienteDto} from "../../types/ClienteDto.ts";
import type {DireccionDto} from "../../types/DireccionDto.ts";

const { Title, Text } = Typography;

const Clientes: React.FC = () => {
    const [dataSource] = useState<ClienteDto[]>([
        {
            id: '550e8400-e29b-41d4-a716-446655440000',
            nombre: 'Transportes Mercantiles S.A.',
            rfc: 'TME101010ABC',
            telefono: '3312345678',
            correo: 'contacto@tm.com',
            contacto: 'Ing. Alberto Rosas',
            direcciones: [
                { id: '1', calle: 'Av. Vallarta', numeroExterior: '100', numeroInterior: '100', colonia: 'Americana', codigoPostal: '44160', idMunicipio: '0',  municipio: 'Guadalajara', estado: 'Jalisco', localidad: '' },
                { id: '2', calle: 'Calle 5 de Mayo', numeroExterior: '20', numeroInterior: '100', colonia: 'Centro', codigoPostal: '06000', idMunicipio: '0', municipio: 'Cuauhtémoc', estado: 'CDMX', localidad: '' }
            ]
        }
    ]);

    const showModal = (record?: ClienteDto) => {
        if (record) {
            message.success('Artículo creado localmente');
        } else {
            message.success('Artículo creado localmente');
        }
    };

    const handleDelete = (id: string) => {
        message.success('Artículo creado localmente' + id);
    };

    const columns: ColumnsType<ClienteDto> = [
        {
            title: 'Nombre / Razón Social',
            dataIndex: 'nombre',
            key: 'nombre',
            render: (text, record) => (
                <Space direction="vertical" size={0}>
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
                        onClick={() => handleDelete(record.id)}
                    />
                </Space>
            ),
        },
    ];

    // Renderizador del detalle (direcciones)
    const expandedRowRender = (record: ClienteDto) => {
        return (
            <div style={{ padding: '8px 24px', background: '#fafafa', borderRadius: '8px' }}>
                <Divider orientation="horizontal" style={{ marginTop: 0 }}>
                    <EnvironmentOutlined /> Direcciones Registradas
                </Divider>
                <List
                    itemLayout="horizontal"
                    dataSource={record.direcciones}
                    renderItem={(item: DireccionDto) => (
                        <List.Item>
                            <List.Item.Meta
                                title={`${item.calle} #${item.numeroExterior}, Col. ${item.colonia}`}
                                description={`${item.municipio}, ${item.estado}. CP: ${item.codigoPostal}`}
                            />
                        </List.Item>
                    )}
                    locale={{ emptyText: 'El cliente no tiene direcciones registradas' }}
                />
            </div>
        );
    };

    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0 }}>Catálogo de Clientes</Title>
                <Button type="primary" icon={<PlusOutlined />} size="large">
                    Nuevo Cliente
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="id"
                expandable={{
                    expandedRowRender,
                    rowExpandable: (record) => !!record.direcciones,
                }}
            />
        </Card>
    );
};

export default Clientes;
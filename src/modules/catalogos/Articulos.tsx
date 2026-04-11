import React, { useState } from 'react';
import { Table, Button, Space, Card, Typography, Modal, Form, Input, InputNumber, message } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { ArticuloDto } from '@types';

const { Title } = Typography;

const Articulos: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [editingId, setEditingId] = useState<string | null>(null);

    // Datos de prueba (Simulando lo que vendrá de tu API .NET Core)
    const [dataSource, setDataSource] = useState<ArticuloDto[]>([
        { ArticuloId: '1', Texto: 'Caja Grande', Similares: 'Caja de cartón reforzado', MaterialPeligroso: ''},
        { ArticuloId: '2', Texto: 'Caja Grande', Similares: 'Caja de cartón reforzado', MaterialPeligroso: ''},
    ]);

    const showModal = (record?: ArticuloDto) => {
        if (record) {
            setEditingId(record.ArticuloId);
            form.setFieldsValue(record);
        } else {
            setEditingId(null);
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleOk = () => {
        form.validateFields().then((values) => {
            if (editingId) {
                setDataSource(dataSource.map(item => item.ArticuloId === editingId ? { ...item, ...values } : item));
                message.success('Artículo actualizado localmente');
            } else {
                const newItem = { ...values, id: dataSource.length + 1 };
                setDataSource([...dataSource, newItem]);
                message.success('Artículo creado localmente');
            }
            setIsModalOpen(false);
        });
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: '¿Está seguro de eliminar este artículo?',
            content: 'Esta acción no se puede deshacer.',
            okText: 'Sí, eliminar',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                setDataSource(dataSource.filter(item => item.ArticuloId !== id));
                message.warning('Artículo eliminado');
            },
        });
    };

    const columns: ColumnsType<ArticuloDto> = [
        { title: 'ID', dataIndex: 'ArticuloId', key: 'ArticuloId', width: 80 },
        { title: 'Nombre', dataIndex: 'Texto', key: 'Texto' },
        { title: 'Similares', dataIndex: 'Similares', key: 'Similares' },
        { title: 'Material Peligroso', dataIndex: 'MaterialPeligroso', key: 'MaterialPeligroso' },
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
                        onClick={() => handleDelete(record.ArticuloId)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0 }}>Catálogo de Artículos</Title>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => showModal()}>
                    Nuevo Artículo
                </Button>
            </div>

            <Table
                columns={columns}
                dataSource={dataSource}
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />

            <Modal
                title={editingId ? "Editar Artículo" : "Nuevo Artículo"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={() => setIsModalOpen(false)}
                afterClose={() => form.resetFields()}
            >
                <Form form={form} layout="vertical" name="articuloForm">
                    <Form.Item name="nombre" label="Nombre" rules={[{ required: true, message: 'Campo requerido' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="descripcion" label="Descripción">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                    <Form.Item name="precio" label="Precio Unitario" rules={[{ required: true, message: 'Campo requerido' }]}>
                        <InputNumber min={0} style={{ width: '100%' }} precision={2} />
                    </Form.Item>
                </Form>
            </Modal>
        </Card>
    );
};

export default Articulos;
import React, { useState } from 'react';
import {Table, Button, Card, Form, Input, Space, Col, Modal, message} from 'antd';
import {DeleteOutlined, EditOutlined, ExclamationCircleOutlined, PlusOutlined} from '@ant-design/icons';
import { CatalogoModal } from '@components/ModalCatalogo';
import { useSeguro } from "@hooks";
import type {SeguroDto} from "@types";

const SeguroScreen: React.FC = () => {

    const { seguros, loading, refreshSeguros, handleCreate, handleDesactivarSeguro } = useSeguro();
    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);

    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            width: '10%'
        },
        {
            title: 'Acciones',
            key: 'acciones',
            width: '15%',
            render: (record : SeguroDto) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} type="text" />
                    <Button
                        icon={<DeleteOutlined />}
                        type="text"
                        danger
                        onClick={() => onDesactivarSeguro(record.seguroId)}
                    />
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

    const onDesactivarSeguro = (id : string) => {
        Modal.confirm({
            title: '¿Está seguro de desactivar este registro?',
            icon: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />,
            content: 'Esta acción cambiará el estatus del registro y podría afectar operaciones relacionadas.',
            okText: 'Confirmar',
            okType: 'danger',
            cancelText: 'Cancelar',
            // El método onOk puede ser asíncrono para esperar la respuesta del servidor
            async onOk() {
                try {
                    await handleDesactivarSeguro(id);
                    message.success('Registro desactivado correctamente');
                    await refreshSeguros();
                } catch (error) {

                    message.error('Ocurrió un error al intentar desactivar el registro');
                    console.error(error);
                }
            },
            onCancel() {
                console.log('Acción cancelada por el usuario');
            },
        });
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Gestión de Seguros"
                extra={
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                    >
                        Nuevo seguro
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={seguros}
                    rowKey="seguroId"
                    pagination={{ pageSize: 10 }}
                    loading={loading}
                />
            </Card>

            <CatalogoModal
                title="Registro de Seguro"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSave={onSave}
                form={form}
                loading={loading}
            >
                <Col span={16}>
                    <Form.Item
                        name="nombre"
                        label="Nombre de seguro"
                        rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </CatalogoModal>
        </div>
    );
};

export default SeguroScreen;
import React, { useState, useEffect } from 'react';
import {
    Modal,
    Descriptions,
    Tag,
    Divider,
    Typography,
    Space,
    Button,
    Form,
    Select,
    DatePicker,
    Input,
    message
} from 'antd';
import {
    PrinterOutlined,
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    CalendarOutlined,
    CarOutlined,
    HomeOutlined
} from '@ant-design/icons';
import dayjs from 'dayjs';
import type { AsignacionDto } from '@types';

const { Text, Title, Paragraph } = Typography;

interface AsignacionDetalleModalProps {
    visible: boolean;
    asignacion: AsignacionDto | null;
    onClose: () => void;
    onPrint?: (asignacion: AsignacionDto) => void;
    onSaveSuccess?: (asignacionActualizada: AsignacionDto) => Promise<void> | void;
}

export const AsignacionDetalleModal: React.FC<AsignacionDetalleModalProps> = ({
                                                                                  visible,
                                                                                  asignacion,
                                                                                  onClose,
                                                                                  onPrint,
                                                                                  onSaveSuccess
                                                                              }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [form] = Form.useForm();

    // Sincronizar el formulario con la asignación seleccionada
    useEffect(() => {
        if (asignacion && visible) {
            form.setFieldsValue({
                choferId: asignacion.choferId || null,
                fechaPartida: asignacion.fechaPartida ? dayjs(asignacion.fechaPartida) : null,
                st1: asignacion.st1,
                st2: asignacion.st2,
                st3: asignacion.st3,
                st4: asignacion.st4,
            });
        } else {
            setIsEditing(false);
            form.resetFields();
        }
    }, [asignacion, visible, form]);

    if (!asignacion) return null;

    const handleCancelEdit = () => {
        form.resetFields();
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            const payloadUpdated: AsignacionDto = {
                ...asignacion,
                ...values,
                fechaPartida: values.fechaPartida ? values.fechaPartida.toISOString() : null,
            };

            if (onSaveSuccess) {
                await onSaveSuccess(payloadUpdated);
            }

            message.success('Asignación actualizada correctamente');
            setIsEditing(false);
        } catch (error) {
            console.error('Error al validar o guardar:', error);
        } finally {
            setSaving(false);
        }
    };

    const fechaFormateada = asignacion.fechaPartida
        ? new Date(asignacion.fechaPartida).toLocaleString('es-MX', {
            dateStyle: 'medium',
            timeStyle: 'short',
        })
        : 'Sin fecha registrada';

    return (
        <Modal
            title={
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <Title level={4} style={{ margin: 0 }}>
                            {isEditing ? 'Editar Asignación' : 'Detalle de Asignación'}
                        </Title>
                        <Tag color="blue">{asignacion.clave}</Tag>
                    </Space>
                </Space>
            }
            open={visible}
            onCancel={() => {
                if (isEditing) handleCancelEdit();
                onClose();
            }}
            width={750}
            footer={
                isEditing ? [
                    <Button key="cancel" icon={<CloseOutlined />} onClick={handleCancelEdit} disabled={saving}>
                        Cancelar
                    </Button>,
                    <Button key="save" type="primary" icon={<SaveOutlined />} loading={saving} onClick={handleSave}>
                        Guardar Cambios
                    </Button>
                ] : [
                    <Button key="close" onClick={onClose}>
                        Cerrar
                    </Button>,
                    <Button key="print" icon={<PrinterOutlined />} onClick={() => onPrint?.(asignacion)}>
                        Imprimir
                    </Button>,
                    <Button key="edit" type="primary" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                        Editar
                    </Button>
                ]
            }
        >
            <Divider style={{ margin: '12px 0 24px 0' }} />

            <Form form={form} layout="vertical">
                {/* --- SECCIÓN 1: INFORMACIÓN GENERAL --- */}
                <Title level={5}>Información General</Title>

                {isEditing ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Form.Item name="fechaPartida" label="Fecha Partida">
                            <DatePicker showTime style={{ width: '100%' }} format="YYYY-MM-DD HH:mm" />
                        </Form.Item>

                        <Form.Item name="choferId" label="Chofer">
                            <Select
                                placeholder="Seleccionar chofer"
                                allowClear
                                options={[
                                    { label: 'Juan Pérez (ID: CH-001)', value: 'CH-001' },
                                    { label: 'Carlos López (ID: CH-002)', value: 'CH-002' },
                                ]}
                            />
                        </Form.Item>
                    </div>
                ) : (
                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item label="ID Asignación" span={2}>
                            <Text copyable strong>{asignacion.clave}</Text>
                        </Descriptions.Item>
                        <Descriptions.Item label={<Space><CalendarOutlined /> Fecha Partida</Space>}>
                            {fechaFormateada}
                        </Descriptions.Item>
                        <Descriptions.Item label={<Space><CarOutlined /> Chofer ID</Space>}>
                            {asignacion.choferId ? (
                                <Tag color="blue">{asignacion.choferId}</Tag>
                            ) : (
                                <Tag color="default">Sin Asignar</Tag>
                            )}
                        </Descriptions.Item>
                    </Descriptions>
                )}

                <Divider orientation="horizontal">Ruta y Sucursales</Divider>

                <Descriptions bordered column={{ xs: 1, sm: 2 }}>
                    <Descriptions.Item label={<Space><HomeOutlined /> Sucursal Origen</Space>}>
                        <Text strong>{asignacion.sucursalOrigen?.nombre || 'N/A'}</Text>
                    </Descriptions.Item>

                    <Descriptions.Item label={<Space><HomeOutlined /> Sucursal Destino</Space>}>
                        <Text strong>{asignacion.sucursalDestino?.nombre || 'N/A'}</Text>
                    </Descriptions.Item>
                </Descriptions>

                <Divider orientation="horizontal">Estados de Seguimiento</Divider>

                {/* --- SECCIÓN 2: ESTATUS --- */}
                {isEditing ? (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        <Form.Item name="st1" label="Estatus ST1">
                            <Input placeholder="Ej. En Carga" />
                        </Form.Item>
                        <Form.Item name="st2" label="Estatus ST2">
                            <Input placeholder="Ej. En Tránsito" />
                        </Form.Item>
                        <Form.Item name="st3" label="Estatus ST3">
                            <Input placeholder="Ej. En Recepción" />
                        </Form.Item>
                        <Form.Item name="st4" label="Estatus ST4">
                            <Input placeholder="Ej. Entregado" />
                        </Form.Item>
                    </div>
                ) : (
                    <Descriptions bordered column={1}>
                        <Descriptions.Item label="Estatus (ST1 - ST4)">
                            <Space size="middle" wrap>
                                <div>
                                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>ST1:</Paragraph>
                                    {asignacion.st1 ? <Tag color="green">{asignacion.st1}</Tag> : <Tag>N/A</Tag>}
                                </div>
                                <div>
                                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>ST2:</Paragraph>
                                    {asignacion.st2 ? <Tag color="cyan">{asignacion.st2}</Tag> : <Tag>N/A</Tag>}
                                </div>
                                <div>
                                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>ST3:</Paragraph>
                                    {asignacion.st3 ? <Tag color="orange">{asignacion.st3}</Tag> : <Tag>N/A</Tag>}
                                </div>
                                <div>
                                    <Paragraph type="secondary" style={{ marginBottom: 0 }}>ST4:</Paragraph>
                                    {asignacion.st4 ? <Tag color="red">{asignacion.st4}</Tag> : <Tag>N/A</Tag>}
                                </div>
                            </Space>
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Form>
        </Modal>
    );
};
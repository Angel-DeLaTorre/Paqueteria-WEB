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
    Input,
    Select
} from 'antd';
import {
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    CalendarOutlined
} from '@ant-design/icons';
import type { UsuarioRespuestaDto, RolDto } from '@types';
import {useNotification} from "@hooks";
import { formatearFechaLocal } from '@utils';

const { Text, Title } = Typography;

interface UsuarioDetalleModalProps {
    visible: boolean;
    usuario: UsuarioRespuestaDto | null;
    rolesDisponibles: RolDto[];
    onClose: () => void;
    onSaveSuccess?: (usuarioActualizado: any) => Promise<void> | void;
    cargando?: boolean;
}

export const UsuarioDetalleModal: React.FC<UsuarioDetalleModalProps> = ({
                                                                            visible,
                                                                            usuario,
                                                                            rolesDisponibles,
                                                                            onClose,
                                                                            onSaveSuccess,
                                                                            cargando
                                                                        }) => {
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [saving, setSaving] = useState<boolean>(false);
    const [form] = Form.useForm();

    const { showNotification } = useNotification();

    useEffect(() => {
        if (usuario && visible) {
            form.setFieldsValue({
                nombre: usuario.nombre,
                username: usuario.username,
                roles: usuario.roles ? usuario.roles.map((r) => r.rolId).filter(Boolean) : []
            });
        } else {
            setIsEditing(false);
            form.resetFields();
        }
    }, [usuario, visible, form]);

    if (!usuario) return null;

    const handleCancelEdit = () => {
        form.resetFields();
        setIsEditing(false);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setSaving(true);

            const payloadUpdated = {
                usuarioId: usuario.id,
                nombre: values.nombre,
                username: usuario.username,
                roles: values.roles
            };

            if (onSaveSuccess) {
                await onSaveSuccess(payloadUpdated);
            }

            showNotification({
                type: 'success',
                message: 'Éxito',
                description: 'Usuario actualizado correctamente.'
            });
            setIsEditing(false);
        } catch (error) {
            console.error('Error al validar o guardar usuario:', error);
        } finally {
            setSaving(false);
        }
    };

    return (
        <Modal
            title={
                <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                        <Title level={4} style={{ margin: 0 }}>
                            {isEditing ? 'Editar Usuario' : 'Detalle de Usuario'}
                        </Title>
                        <Tag color="blue">{usuario.username}</Tag>
                    </Space>
                </Space>
            }
            open={visible}
            onCancel={() => {
                if (isEditing) handleCancelEdit();
                onClose();
            }}
            width={650}
            footer={
                isEditing
                    ? [
                        <Button key="cancel" icon={<CloseOutlined />} onClick={handleCancelEdit} disabled={saving || cargando}>
                            Cancelar
                        </Button>,
                        <Button key="save" type="primary" icon={<SaveOutlined />} loading={saving || cargando} onClick={handleSave}>
                            Guardar Cambios
                        </Button>
                    ]
                    : [
                        <Button key="close" onClick={onClose}>
                            Cerrar
                        </Button>,
                        <Button key="edit" type="primary" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                            Editar
                        </Button>
                    ]
            }
        >
            <Divider style={{ margin: '12px 0 24px 0' }} />

            <Form form={form} layout="vertical">
                <Title level={5}>Información General</Title>

                {isEditing ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
                        <Form.Item
                            name="nombre"
                            label="Nombre"
                            rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                        >
                            <Input prefix={<UserOutlined />} placeholder="Nombre completo" />
                        </Form.Item>

                        <Form.Item label="Usuario (No modificable)">
                            <Input
                                prefix={<LockOutlined />}
                                value={usuario.username}
                                disabled
                                style={{ backgroundColor: '#f5f5f5', color: 'rgba(0, 0, 0, 0.85)' }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="roles"
                            label="Roles"
                            rules={[{ required: true, message: 'Selecciona al menos un rol' }]}
                        >
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Selecciona los roles"
                                options={rolesDisponibles.map((rol: RolDto) => ({
                                    value: rol.rolId,
                                    label: rol.descripcion || rol.nombre
                                }))}
                            />
                        </Form.Item>
                    </div>
                ) : (
                    <Descriptions bordered column={1} size="middle">
                        <Descriptions.Item label={<Space><UserOutlined /> Nombre</Space>}>
                            {usuario.nombre}
                        </Descriptions.Item>
                        <Descriptions.Item label={<Space><LockOutlined /> Username</Space>}>
                            {usuario.username}
                        </Descriptions.Item>
                        <Descriptions.Item label={<Space><CalendarOutlined /> Último Acceso</Space>}>
                            {usuario?.fechaUltimoAcesso ? formatearFechaLocal(usuario.fechaUltimoAcesso) : 'Sin acceso registrado'}
                        </Descriptions.Item>
                    </Descriptions>
                )}

                <Divider orientation="horizontal">Roles y Permisos Asignados</Divider>

                {!isEditing && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '100%' }}>
                        {usuario.roles && usuario.roles.length > 0 ? (
                            usuario.roles.map((rol) => (
                                <div key={rol.rolId} style={{ border: '1px solid #f0f0f0', padding: '12px', borderRadius: '8px' }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
                                        <Space>
                                            <SafetyCertificateOutlined style={{ color: '#1890ff' }} />
                                            <Text strong>{rol.descripcion || rol.nombre}</Text>
                                        </Space>
                                        <div>
                                            <Text type="secondary" style={{ fontSize: '12px' }}>Permisos:</Text>
                                            <div style={{ marginTop: '4px', display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                                                {rol.permisos && rol.permisos.length > 0 ? (
                                                    rol.permisos.map((permiso) => (
                                                        <Tag key={permiso.permisoId} color="cyan">
                                                            {permiso.descripcion || permiso.nombre}
                                                        </Tag>
                                                    ))
                                                ) : (
                                                    <Tag>Sin permisos específicos</Tag>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <Tag color="default">Sin roles asignados</Tag>
                        )}
                    </div>
                )}
            </Form>
        </Modal>
    );
};

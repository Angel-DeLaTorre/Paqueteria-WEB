import { useState, useEffect } from 'react';
import { Table, Button, Card, Space, Form, Input, Select, Col, Tooltip, Tag } from 'antd';
import { UserAddOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { CatalogoModal } from '@components/ModalCatalogo';
import { UsuarioDetalleModal } from './UsuarioDetalleModal';
import type {RolDto, UsuarioRespuestaDto, UsuarioCrearDto, UsuarioActualizarDto} from '@types';
import { useUsuario, useRol, useNotification } from '@hooks';
import { formatearFechaLocal } from '@utils';

const UsuariosScreen = () => {
    const { usuarios, cargando, obtenerUsuarios, crearUsuario, actualizarUsuario } = useUsuario();
    const { roles } = useRol();
    const { showNotification } = useNotification();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [form] = Form.useForm();

    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState<UsuarioRespuestaDto | null>(null);
    const [isDetalleModalVisible, setIsDetalleModalVisible] = useState(false);

    useEffect(() => {
        const cargarDatos = async () => {
            const respuesta = await obtenerUsuarios();
            if (!respuesta.esExitoso) {
                showNotification({
                    type: 'error',
                    message: 'Error al obtener usuarios',
                    description: respuesta.detalleError?.descripcion || 'No se pudo cargar la lista.'
                });
            }
        };

        void cargarDatos();
    }, [obtenerUsuarios, showNotification]);

    // Columnas de la Tabla
    const columns = [
        {
            title: 'Nombre',
            dataIndex: 'nombre',
            key: 'nombre',
            sorter: (a: UsuarioRespuestaDto, b: UsuarioRespuestaDto) => a.nombre.localeCompare(b.nombre),
            render: (text: string, record: UsuarioRespuestaDto) => (
                <a onClick={() => {
                    setUsuarioSeleccionado(record);
                    setIsDetalleModalVisible(true);
                }}>
                    {text}
                </a>
            )
        },
        { title: 'Username', dataIndex: 'username', key: 'username' },
        {
            title: 'Ultimo Acceso',
            dataIndex: 'fechaUltimoAcesso',
            key: 'fechaUltimoAcesso',
            render: (fecha: string | null) => fecha ? formatearFechaLocal(fecha) : 'Sin acceso registrado'
        },
        {
            title: 'Rol',
            dataIndex: 'roles',
            key: 'roles',
            render: (rolesUsuario: RolDto[]) => (
                <Space wrap>
                    {rolesUsuario?.map((r) => (
                        <Tag key={r.rolId} color="blue">{r.descripcion || r.nombre}</Tag>
                    ))}
                </Space>
            )
        },
        {
            title: 'Acciones',
            key: 'acciones',
            render: (record: UsuarioRespuestaDto) => (
                <Space size="middle">
                    <Tooltip title="Ver / Editar detalles">
                        <Button
                            icon={<EyeOutlined />}
                            type="text"
                            onClick={() => {
                                setUsuarioSeleccionado(record);
                                setIsDetalleModalVisible(true);
                            }}
                        />
                    </Tooltip>
                    <Button icon={<DeleteOutlined />} type="text" danger />
                </Space>
            ),
        },
    ];

    const onSave = async () => {
        try {
            // Validamos y obtenemos los valores directamente de la instancia del formulario
            const values = await form.validateFields();
            const respuesta = await crearUsuario(values as UsuarioCrearDto);

            if (respuesta.esExitoso) {
                showNotification({
                    type: 'success',
                    message: 'Éxito',
                    description: 'Usuario creado correctamente.'
                });
                setIsModalVisible(false);
                form.resetFields();
                await obtenerUsuarios();
            } else {
                showNotification({
                    type: 'error',
                    message: 'Error al crear usuario',
                    description: respuesta.detalleError?.descripcion || 'Ocurrió un error inesperado.'
                });
            }
        } catch (error) {
            console.error('Validación de formulario fallida:', error);
        }
    };

    const handleActualizarUsuarioExitoso = async (datosActualizados: UsuarioActualizarDto) => {
        try {
            const respuesta = await actualizarUsuario(datosActualizados);
            if (respuesta?.esExitoso) {
                showNotification({
                    type: 'success',
                    message: 'Éxito',
                    description: 'Usuario actualizado correctamente.'
                });
                await obtenerUsuarios();
            } else {
                showNotification({
                    type: 'error',
                    message: 'Error al actualizar el usuario',
                    description: respuesta?.detalleError?.descripcion || 'Ocurrió un problema al procesar la solicitud.'
                });
            }
        } catch (error) {
            showNotification({
                type: 'error',
                message: 'Error al actualizar el usuario',
                description: 'Ocurrió un problema al procesar la solicitud.'
            });
            console.error(error);
        }
    };

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
                    columns={columns}
                    dataSource={usuarios}
                    rowKey="id"
                    pagination={{ pageSize: 10 }}
                    loading={cargando}
                />
            </Card>

            {/* Modal para Crear Usuario */}
            <CatalogoModal
                title="Gestión de Usuario"
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                onSave = {onSave}
                loading = {cargando}
                form={form}
            >
                <Col span={6}>
                    <Form.Item
                        name="nombre"
                        label="Nombre"
                        rules={[{ required: true, message: 'El nombre es obligatorio' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item
                        name="username"
                        label="Usuario"
                        rules={[{ required: true, message: 'El usuario es obligatorio' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        name="password"
                        label="Contraseña"
                        rules={[{ required: true, message: 'La contraseña es obligatoria' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>

                <Col span={6}>
                    <Form.Item
                        name="roles"
                        label="Rol"
                        rules={[{ required: true, message: 'Selecciona al menos un rol' }]}
                    >
                        <Select
                            mode="multiple"
                            allowClear
                            placeholder="Selecciona un rol"
                            options={roles.map((rol: RolDto) => ({
                                value: rol.rolId,
                                label: rol.descripcion || rol.nombre
                            }))}
                        />
                    </Form.Item>
                </Col>
            </CatalogoModal>

            {/* Modal de Detalle y Edición por Usuario */}
            <UsuarioDetalleModal
                visible={isDetalleModalVisible}
                usuario={usuarioSeleccionado}
                rolesDisponibles={roles}
                cargando={cargando}
                onClose={() => {
                    setIsDetalleModalVisible(false);
                    setUsuarioSeleccionado(null);
                }}
                onSaveSuccess={handleActualizarUsuarioExitoso}
            />
        </div>
    );
};

export default UsuariosScreen;

import React, { useEffect, useState } from 'react';
import { Table, Button, Card, Form, Input, Space, Col, Switch, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, HomeOutlined } from '@ant-design/icons';
import { CatalogoModal } from '@components/ModalCatalogo';
import { useSucursal, useNotification } from "@hooks";
import type { SucursalDto, SucursalActualizarDto } from "@types";
import { DireccionFormFields } from "@components/DireccionModal.tsx";
import type { ColumnsType } from "antd/es/table";

const { Text } = Typography;

const SucursalScreen: React.FC = () => {
    const { sucursales, cargando, obtenerSucursales, crearSucursal, actualizarSucursal } = useSucursal();
    const { showNotification } = useNotification();
    const [form] = Form.useForm();

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [sucursalSeleccionada, setSucursalSeleccionada] = useState<SucursalDto | null>(null);

    useEffect(() => {
        void obtenerSucursales();
    }, [obtenerSucursales]);

    const handleNuevaSucursal = () => {
        setSucursalSeleccionada(null);
        form.resetFields();
        setIsModalVisible(true);
    };

    const handleEditarSucursal = (record: SucursalDto) => {
        setSucursalSeleccionada(record);
        form.setFieldsValue({
            codigo: record.codigo,
            nombre: record.nombre,
            telefono: record.telefono,
            esMatriz: record.esMatriz ?? false,
            direccion: record.direccion
        });
        setIsModalVisible(true);
    };

    const columns: ColumnsType<SucursalDto> = [
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
            width: '20%',
            sorter: (a: SucursalDto, b: SucursalDto) => a.nombre.localeCompare(b.nombre)
        },
        {
            title: 'Teléfono',
            dataIndex: 'telefono',
            key: 'telefono',
            width: '15%'
        },
        {
            title: 'Dirección',
            dataIndex: 'direccion',
            key: 'direccion',
            width: '40%',
            render: (direccion) => {
                if (!direccion) return <Text type="secondary">Sin dirección</Text>;

                const linea1 = [
                    direccion.calle && `${direccion.calle}`,
                    direccion.numeroExterior && `#${direccion.numeroExterior}`,
                    direccion.numeroInterior && `Int. ${direccion.numeroInterior}`
                ].filter(Boolean).join(' ');

                const linea2 = [
                    direccion.colonia && `Col. ${direccion.colonia}`,
                    direccion.codigoPostal && `C.P. ${direccion.codigoPostal}`
                ].filter(Boolean).join(', ');

                const linea3 = [
                    direccion.ciudad || direccion.municipio,
                    direccion.estado
                ].filter(Boolean).join(', ');

                return (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', fontSize: '13px' }}>
                        {linea1 && <div><Text strong>{linea1}</Text></div>}
                        {linea2 && <div><Text type="secondary">{linea2}</Text></div>}
                        {linea3 && <div><Text type="secondary">{linea3}</Text></div>}
                    </div>
                );
            }
        },
        {
            title: 'Acciones',
            key: 'acciones',
            width: '15%',
            render: (_, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditOutlined />}
                        type="text"
                        onClick={() => handleEditarSucursal(record)}
                    />
                    <Button icon={<DeleteOutlined />} type="text" danger />
                </Space>
            ),
        },
    ];

    const onSave = async () => {
        try {
            const values = await form.validateFields();

            if (sucursalSeleccionada) {
                const payloadUpdate: SucursalActualizarDto = {
                    sucursalId: sucursalSeleccionada.sucursalId,
                    nombre: values.nombre,
                    codigo: values.codigo,
                    esMatriz: values.esMatriz ?? false,
                    telefono: values.telefono,
                    direccion: values.direccion
                };

                const respuesta = await actualizarSucursal(payloadUpdate);

                if (respuesta.esExitoso) {
                    showNotification({
                        type: 'success',
                        message: 'Éxito',
                        description: 'Sucursal actualizada correctamente'
                    });
                    setIsModalVisible(false);
                    form.resetFields();
                    setSucursalSeleccionada(null);
                    await obtenerSucursales();
                } else {
                    showNotification({
                        type: 'error',
                        message: 'Error',
                        description: respuesta.detalleError?.descripcion || 'No se pudo actualizar la sucursal'
                    });
                }
            } else {
                const respuesta = await crearSucursal(values);

                if (respuesta.esExitoso) {
                    showNotification({
                        type: 'success',
                        message: 'Éxito',
                        description: 'Sucursal registrada correctamente'
                    });
                    setIsModalVisible(false);
                    form.resetFields();
                    await obtenerSucursales();
                } else {
                    showNotification({
                        type: 'error',
                        message: 'Error',
                        description: respuesta.detalleError?.descripcion || 'No se pudo crear la sucursal'
                    });
                }
            }
        } catch {
            // Error de validación de campos del formulario
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
                        onClick={handleNuevaSucursal}
                    >
                        Nueva Sucursal
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={sucursales}
                    rowKey="sucursalId"
                    pagination={{ pageSize: 10 }}
                    loading={cargando}
                />
            </Card>

            <CatalogoModal
                title={sucursalSeleccionada ? "Editar Sucursal" : "Registro de Sucursal"}
                open={isModalVisible}
                onCancel={() => {
                    setIsModalVisible(false);
                    setSucursalSeleccionada(null);
                }}
                onSave={onSave}
                form={form}
                loading={cargando}
            >
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

                <Col span={12}>
                    <Form.Item
                        name="esMatriz"
                        label="¿Es Matriz?"
                        valuePropName="checked"
                        initialValue={false}
                    >
                        <Switch />
                    </Form.Item>
                </Col>

                <DireccionFormFields form={form} />
            </CatalogoModal>
        </div>
    );
};

export default SucursalScreen;
import React, { useState } from 'react';
import { Modal, Form, Col, Divider, Select, Card, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useCliente, useSucursal } from "@hooks";
import { CatalogoModal } from '@components/ModalCatalogo';
import type { GuiaCreateDto, DireccionClienteDto, ArticuloFila } from "@types";
import { ArticulosTable } from "./ArticulosTable.tsx";

const { confirm } = Modal;
const { Text } = Typography;

interface GuiaAltaModalProps {
    open: boolean;
    onCancel: () => void;
    onSave: (values: GuiaCreateDto) => void;
    loading: boolean;
}

export const GuiaAltaModal: React.FC<GuiaAltaModalProps> = ({
                                                                open,
                                                                onCancel,
                                                                onSave
                                                            }) => {
    const [form] = Form.useForm<GuiaCreateDto>();
    const { clientes } = useCliente();
    const { sucursales, loading: loadingSucursales } = useSucursal();

    // Estados locales para las direcciones dinámicas
    const [direccionesOrigen, setDireccionesOrigen] = useState<DireccionClienteDto[]>([]);
    const [direccionesDestino, setDireccionesDestino] = useState<DireccionClienteDto[]>([]);
    const [dirSucursalDestino, setDirSucursalDestino] = useState<string>("");
    const [articulos, setArticulos] = useState<ArticuloFila[]>([]);

    /**
     * Maneja el cambio de cliente y filtra sus direcciones disponibles
     */
    const handleClienteChange = (clienteId: string, tipo: 'origen' | 'destino') => {
        const cliente = clientes.find(c => c.clienteId === clienteId);
        const direcciones = cliente?.direcciones || [];

        if (tipo === 'origen') {
            setDireccionesOrigen(direcciones);
            // Resetea limpiamente el campo de dirección hijo al cambiar de cliente
            form.setFieldsValue({ direccionOrigen: undefined });
        } else {
            setDireccionesDestino(direcciones);
            form.setFieldsValue({ direccionDestino: undefined });
        }
    };

    /**
     * Actualiza el string informativo de la sucursal destino seleccionada
     */
    const handleSucursalChange = (sucursalId: string, tipo: 'origen' | 'destino') => {
        const sucursal = sucursales.find(s => s.sucursalId === sucursalId);
        if (sucursal && tipo === 'destino') {
            const { calle, numeroExterior, municipioNombre } = sucursal.direccion || {};
            setDirSucursalDestino(`${calle} #${numeroExterior}, ${municipioNombre}`);
        }
    };

    /**
     * Interceptor de cierre para evitar pérdida accidental de datos
     */
    const handleCancel = () => {
        if (form.isFieldsTouched()) {
            confirm({
                title: '¿Estás seguro de cerrar esta ventana?',
                icon: <ExclamationCircleFilled />,
                content: 'Tienes cambios sin guardar que se perderán permanentemente.',
                okText: 'Sí, cerrar',
                okType: 'danger',
                cancelText: 'Continuar editando',
                onOk() {
                    form.resetFields();
                    setDireccionesOrigen([]);
                    setDireccionesDestino([]);
                    setDirSucursalDestino("");
                    onCancel();
                },
            });
        } else {
            onCancel();
        }
    };

    /**
     * Se ejecuta al pasar todas las validaciones nativas de Ant Design
     */
    const onFinish = (values: GuiaCreateDto) => {
        // Acoplamos los artículos recolectados de la tabla al DTO final
        const payload = {
            ...values,
            articulos: articulos
        };
        onSave(payload);
    };

    // Mapeos limpios de opciones para optimizar el renderizado del DOM
    const clienteOptions = clientes.map(c => ({ label: c.nombre, value: c.clienteId }));
    const sucursalOptions = sucursales.map(s => ({ label: s.nombre, value: s.sucursalId }));

    return (
        <CatalogoModal
            title="Generar Nueva Guía"
            open={open}
            onCancel={handleCancel}
            onSave={() => form.submit()}
            //confirmLoading={loading} // Inyecta el spinner de carga nativo
            form={form}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                style={{ width: '100%', display: 'flex', flexWrap: 'wrap' }}
            >
                {/* COLUMNA REMITENTE */}
                <Col span={12} style={{ paddingRight: '8px' }}>
                    <Card
                        size="small"
                        title="Remitente"
                        styles = {{ header: { backgroundColor: '#f6ffed' } }}
                    >
                        <Form.Item name="clienteOrigenId" label="Cliente" rules={[{ required: true, message: 'Requerido' }]}>
                            <Select
                                placeholder="Buscar Cliente..."
                                onChange={(val) => handleClienteChange(val, 'origen')}
                                options={clienteOptions}
                                showSearch = {{
                                    filterOption: (input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="direccionOrigenId"
                            label="Seleccionar Bodega / Domicilio"
                            rules={[{ required: true, message: 'Seleccione una dirección' }]}
                        >
                            <Select
                                disabled={direccionesOrigen.length === 0}
                                placeholder={direccionesOrigen.length > 0 ? "Seleccione dirección..." : "Seleccione primero un cliente"}
                                options={direccionesOrigen.map(d => ({
                                    label: `${d.direccion.calle} #${d.direccion.numeroExterior}, Col. ${d.direccion.colonia}`,
                                    value: d.direccionId // Se usa el ID real de la entidad dirección
                                }))}
                            />
                        </Form.Item>
                    </Card>
                </Col>

                {/* COLUMNA DESTINATARIO */}
                <Col span={12} style={{ paddingLeft: '8px' }}>
                    <Card
                        size="small"
                        title="Destinatario"
                        styles = {{ header: { backgroundColor: '#e6f7ff' } }}
                    >
                        <Form.Item name="clienteDestinoId" label="Cliente" rules={[{ required: true, message: 'Requerido' }]}>
                            <Select
                                placeholder="Buscar Cliente..."
                                onChange={(val) => handleClienteChange(val, 'destino')}
                                options={clienteOptions}
                                showSearch = {{
                                    filterOption: (input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                                }}
                            />
                        </Form.Item>

                        <Form.Item
                            name="direccionDestinoId"
                            label="Seleccionar Punto de Entrega"
                            rules={[{ required: true, message: 'Seleccione una dirección' }]}
                        >
                            <Select
                                disabled={direccionesDestino.length === 0}
                                placeholder={direccionesDestino.length > 0 ? "Seleccione dirección..." : "Seleccione primero un cliente"}
                                options={direccionesDestino.map(d => ({
                                    label: `${d.direccion.calle} #${d.direccion.numeroExterior}, Col. ${d.direccion.colonia}`,
                                    value: d.direccionId,
                                }))}
                            />
                        </Form.Item>
                    </Card>
                </Col>

                <Divider orientation="horizontal">Logística de Sucursales</Divider>

                <Col span={12} style={{ paddingRight: '8px' }}>
                    <Form.Item
                        name="sucursalOrigenId"
                        label="Sucursal de Admisión (Origen)"
                        rules={[{ required: true, message: 'Requerido' }]}
                    >
                        <Select
                            placeholder="Seleccione sucursal de salida"
                            loading={loadingSucursales}
                            options={sucursalOptions}
                        />
                    </Form.Item>
                </Col>

                <Col span={12} style={{ paddingLeft: '8px' }}>
                    <Form.Item
                        name="sucursalDestinoId"
                        label="Sucursal de Llegada (Destino)"
                        rules={[{ required: true, message: 'Requerido' }]}
                    >
                        <Select
                            placeholder="Seleccione sucursal destino"
                            loading={loadingSucursales}
                            onChange={(val) => handleSucursalChange(val, 'destino')}
                            options={sucursalOptions}
                        />
                    </Form.Item>
                    {dirSucursalDestino && (
                        <div style={{ padding: '6px 12px', background: '#e6f7ff', borderRadius: '4px', border: '1px solid #91d5ff', marginTop: '4px' }}>
                            <Text type="secondary">Ubicación destino: </Text>
                            <Text strong>{dirSucursalDestino}</Text>
                        </div>
                    )}
                </Col>

                <Divider orientation="horizontal">Artículos del Envío</Divider>

                <Col span={24}>
                    {/* CORREGIDO: Escucha el cambio real de los datos de la tabla */}
                    <ArticulosTable onChange={(data) => setArticulos(data)} />
                </Col>
            </Form>
        </CatalogoModal>
    );
};
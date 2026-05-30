import React, { useState } from 'react';
import { Modal, Form, Col, Divider, Select, Card, Typography } from 'antd';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useCliente, useSucursal } from "@hooks";
import { CatalogoModal } from '@components/ModalCatalogo';
import type { GuiaCreateDto, DireccionClienteDto, ArticuloDto } from "@types";
import {ArticulosTable} from "./ArticulosTable.tsx";
const { confirm } = Modal;
const { Text } = Typography;

export const GuiaAltaModal: React.FC<any> = ({ open, onCancel, onSave }) => {

    const [form] = Form.useForm<GuiaCreateDto>();
    const { clientes } = useCliente();
    const { sucursales, loading: loadingSucursales } = useSucursal();

    const [direccionesOrigen, setDireccionesOrigen] = useState<DireccionClienteDto[]>([]);
    const [direccionesDestino, setDireccionesDestino] = useState<DireccionClienteDto[]>([]);
    const [dirSucursalDestino, setDirSucursalDestino] = useState<string>("");
    const [articulos, setArticulos] = useState<ArticuloDto[]>([]);

    // Al seleccionar cliente, filtramos sus direcciones
    const handleClienteChange = (clienteId: string, tipo: 'origen' | 'destino') => {

        const cliente = clientes.find(c => c.clienteId === clienteId);

        if (tipo === 'origen') {
            setDireccionesOrigen(cliente?.direcciones || []);
            form.setFieldValue(['direccionOrigen', 'clienteId'], undefined); // Resetear selección previa
        } else {
            setDireccionesDestino(cliente?.direcciones || []);
            form.setFieldValue(['direccionDestino', 'clienteId'], undefined);
        }
    };

    const handleSucursalChange = (sucursalId: string, tipo: 'origen' | 'destino') => {
        const sucursal = sucursales.find(s => s.sucursalId === sucursalId);
        if (sucursal) {
            // Formateamos la dirección para mostrarla en la UI
            const dirStr = `${sucursal.direccion?.calle} #${sucursal.direccion?.numeroExterior}, ${sucursal.direccion?.municipioNombre}`;

            if (tipo === 'destino') {
                setDirSucursalDestino(dirStr);
            }
        }
    };

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
                    onCancel();
                },
            });
        } else {
            onCancel();
        }
    };

    return (
        <CatalogoModal
            title = "Generar Nueva Guía"
            open = { open }
            onCancel = { handleCancel }
            onSave = { () => form.submit() }
            form = { form }
        >


            <Col span={12}>
                <Card
                    size="small"
                    title="Remitente"
                    styles = {{ header: { backgroundColor: '#f6ffed' } }}
                >

                    <Form.Item name="clienteOrigenId" label="Cliente" rules={[{ required: true }]}>
                        <Select
                            placeholder="Buscar Cliente..."
                            onChange={(val) => handleClienteChange(val, 'origen')}
                            options={clientes.map(c => ({ label: c.nombre, value: c.clienteId }))}
                            showSearch = {{
                                filterOption: (input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }}

                        />
                    </Form.Item>

                    <Form.Item
                        name={['direccionOrigen', 'clienteId']}
                        label="Seleccionar Bodega / Domicilio"
                        rules={[{ required: true, message: 'Seleccione una dirección' }]}
                    >
                        <Select
                            disabled = { direccionesOrigen.length === 0 }
                            placeholder = { direccionesOrigen.length > 0 ? "Seleccione dirección..." : "Seleccione primero un cliente" }
                            options={direccionesOrigen.map(d => ({
                                label: `${d.direccion.calle} #${d.direccion.numeroExterior}, Col. ${d.direccion.colonia}`,
                                value: d.direccion.municipioId
                            }))}
                        />
                    </Form.Item>
                </Card>
            </Col>

            {/* COLUMNA DESTINO */}
            <Col span={12}>
                <Card size="small" title="Destinatario"
                      styles = {{ header: { backgroundColor: '#e6f7ff' } }}
                >
                    <Form.Item name="clienteDestinoId" label="Cliente" rules={[{ required: true }]}>
                        <Select
                            placeholder="Buscar Cliente..."
                            onChange={(val) => handleClienteChange(val, 'destino')}
                            options={clientes.map(c => ({ label: c.nombre, value: c.clienteId }))}
                            showSearch = {{
                                filterOption: (input, option) =>
                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name={['direccionDestino', 'clienteId']}
                        label="Seleccionar Punto de Entrega"
                        rules={[{ required: true, message: 'Seleccione una dirección' }]}
                    >
                        <Select
                            disabled={direccionesDestino.length === 0}
                            placeholder={direccionesDestino.length > 0 ? "Seleccione dirección..." : "Seleccione primero un cliente"}
                            options={direccionesDestino.map(d => ({
                                label: `${d.direccion.calle} #${d.direccion.numeroExterior}, Col. ${d.direccion.colonia}`,
                                value: d.direccion.municipioId,
                            }))}
                        />
                    </Form.Item>
                </Card>
            </Col>



            <Divider orientation="horizontal">Logística de Sucursales</Divider>

            <Col span={12}>
                <Form.Item
                    name="sucursalOrigenId"
                    label="Sucursal de Admisión (Origen)"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Seleccione sucursal de salida"
                        loading={loadingSucursales}
                        options={sucursales.map(s => ({ label: s.nombre, value: s.sucursalId }))}
                    />
                </Form.Item>
            </Col>
            <Col span={12}>
                <Form.Item
                    name="sucursalDestinoId"
                    label="Sucursal de Llegada (Destino)"
                    rules={[{ required: true }]}
                >
                    <Select
                        placeholder="Seleccione sucursal destino"
                        loading={loadingSucursales}
                        onChange={(val) => handleSucursalChange(val, 'destino')}
                        options={sucursales.map(s => ({ label: s.nombre, value: s.sucursalId }))}
                    />
                </Form.Item>
                {dirSucursalDestino && (
                    <div style={{ padding: '4px 8px', background: '#e6f7ff', borderRadius: '4px', border: '1px solid #91d5ff' }}>
                        <Text>Ubicación destino: </Text>
                        <Text>{dirSucursalDestino}</Text>
                    </div>
                )}
            </Col>


            <Divider orientation="horizontal">Artículos del Envío</Divider>

            <Col span={24}>
                <ArticulosTable onChange={(data) => setArticulos( articulos )} />
            </Col>

        </CatalogoModal>
    );
};
import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Form,
    Card,
    Row,
    Col,
    Typography,
    Button,
    Space,
    Tag,
    Descriptions,
    Table,
    Spin,
    InputNumber,
    Switch,
    Select,
    Input
} from 'antd';
import {
    ArrowLeftOutlined,
    EditOutlined,
    SaveOutlined,
    CloseOutlined,
    PrinterOutlined
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useGuia, useSeguro, useNotification } from "@hooks";
import type { ArticulosGuiaDto, GuiaActualizarDto, GuiaDto } from "@types";
import { ArticulosFormList } from "./ArticulosFormList";
import { catSatProdServOptions, catSatUnidadOptions, catSatEmbalajeOptions } from "@types";
import {pdfImprimirUtil} from "@utils";

const { Title, Text } = Typography;

export const GuiaDetalleScreen: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const { obtenerGuiaPorId, actualizarGuia, generarEtiquita, generarCarta } = useGuia();
    const { seguros } = useSeguro();
    const { showNotification } = useNotification();

    const [guia, setGuia] = useState<GuiaDto | null>(null);
    const [cargando, setCargando] = useState<boolean>(true);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [guardando, setGuardando] = useState<boolean>(false);
    const [estaAsegurado, setEstaAsegurado] = useState<boolean>(false);

    // 1. Cargar la guía por ID
    const cargarGuia = useCallback(async () => {
        if (!id) return;

        setCargando(true);
        try {
            const respuesta = await obtenerGuiaPorId(id);
            if (respuesta.esExitoso && respuesta.datos) {
                const data = respuesta.datos;
                setGuia(data);
                setEstaAsegurado(data.estaAsegurado);

                form.setFieldsValue({
                    ...data,
                    articulosGuia: data.articulosGuia || []
                });
            } else {
                showNotification({
                    type: 'error',
                    message: 'Error',
                    description: respuesta.detalleError?.descripcion || 'No se encontró la guía solicitada'
                });
                navigate(-1);
            }
        } catch (error) {
            console.error('Error al obtener el detalle de la guía:', error);
            showNotification({
                type: 'error',
                message: 'Error de conexión',
                description: 'Ocurrió un error al cargar la información de la guía'
            });
        } finally {
            setCargando(false);
        }
    }, [id, obtenerGuiaPorId, form, navigate, showNotification]);

    useEffect(() => {
        void cargarGuia();
    }, [cargarGuia]);

    const handleImprimirEtiqueta =  async (guiaId : string) => {
        const respuesta = await generarEtiquita(guiaId);
        if (respuesta.esExitoso && respuesta.datos) {
            pdfImprimirUtil(respuesta.datos);
        } else {
            showNotification({
                type: 'error',
                message: 'Error al generar el reporte',
                description: respuesta.detalleError?.descripcion || 'No se pudo generar el reporte.'
            });
        }
    };

    const handleImprimirCarta =  async (guiaId : string) => {
        const respuesta = await generarCarta(guiaId);
        if (respuesta.esExitoso && respuesta.datos) {
            pdfImprimirUtil(respuesta.datos);
        } else {
            showNotification({
                type: 'error',
                message: 'Error al generar el reporte',
                description: respuesta.detalleError?.descripcion || 'No se pudo generar el reporte.'
            });


        }
    }

    // 2. Recálculo automático de costos durante la edición
    const handleValuesChange = (changedValues: Record<string, unknown>, allValues: Record<string, number | boolean>) => {
        const camposCostos = [
            'flete', 'seguro', 'recoleccion', 'entregaA',
            'maniobras', 'peaje', 'lineas', 'condonaIva'
        ];

        const isCostoModificado = Object.keys(changedValues).some(key => camposCostos.includes(key));

        if (isCostoModificado) {
            const flete = (allValues.flete as number) || 0;
            const cobroSeguro = (allValues.cobroSeguro as number) || 0;
            const recoleccion = (allValues.recoleccion as number) || 0;
            const entregaA = (allValues.entregaA as number) || 0;
            const maniobras = (allValues.maniobras as number) || 0;
            const peaje = (allValues.peaje as number) || 0;
            const lineas = (allValues.lineas as number) || 0;

            const subtotal = flete + cobroSeguro + recoleccion + entregaA + maniobras + peaje + lineas;
            const iva = allValues.condonaIva ? 0 : (subtotal * 0.16);
            const ivaRetenido = subtotal * 0.04;
            const total = (subtotal + iva) - ivaRetenido;

            form.setFieldsValue({
                subtotal: Number(subtotal.toFixed(2)),
                iva: Number(iva.toFixed(2)),
                ivaRetenido: Number(ivaRetenido.toFixed(2)),
                total: Number(total.toFixed(2))
            });
        }
    };

    // 3. Guardar cambios
    const handleSave = async () => {
        if (!guia) return;

        try {
            const values = await form.validateFields();
            setGuardando(true);

            const payload: GuiaActualizarDto = {
                ...guia,
                ...values,
                seguroId: values.estaAsegurado ? values.seguroId : null,
                polizaSeguro: values.estaAsegurado ? values.polizaSeguro : null,
            };

            const respuesta = await actualizarGuia(payload);
            if (respuesta.esExitoso) {
                showNotification({
                    type: 'success',
                    message: 'Éxito',
                    description: 'Guía actualizada correctamente.'
                });
                setIsEditing(false);
                await cargarGuia();
            } else {
                showNotification({
                    type: 'error',
                    message: 'Error al actualizar',
                    description: respuesta.detalleError?.descripcion || 'No se pudo guardar la guía'
                });
            }
        } catch (error) {
            console.error('Error al validar o actualizar la guía:', error);
        } finally {
            setGuardando(false);
        }
    };

    // Columnas para la tabla en modo lectura de artículos
    const articulosColumns: ColumnsType<ArticulosGuiaDto> = [
        {
            title: '#',
            render: (_, __, index) => index + 1,
            width: 50,
        },
        {
            title: 'Clave SAT',
            dataIndex: 'claveProdServSat',
            key: 'claveProdServSat',
            render: (text) => <Tag>{text}</Tag>,
        },
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            key: 'descripcion',
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            key: 'cantidad',
            align: 'right',
        },
        {
            title: 'Peso (kg)',
            dataIndex: 'pesoUnitarioKg',
            key: 'pesoUnitarioKg',
            align: 'right',
        },
        {
            title: 'Valor Unitario',
            dataIndex: 'valorUnidad',
            key: 'valorUnidad',
            align: 'right',
            render: (val) => `$${Number(val).toFixed(2)}`,
        },
        {
            title: 'Peligroso',
            dataIndex: 'esMaterialPeligroso',
            key: 'esMaterialPeligroso',
            render: (val) => val ? <Tag color="red">Sí</Tag> : <Tag color="green">No</Tag>,
        },
    ];

    if (cargando) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Spin size="large" description="Cargando información de la guía..." />
            </div>
        );
    }

    if (!guia) return null;

    return (
        <div style={{ padding: '24px' }}>
            {/* ENCABEZADO Y ACCIONES */}
            <Row justify="space-between" align="middle" style={{ marginBottom: 24 }}>
                <Col>
                    <Space size="middle">
                        <Button icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} />
                        <Title level={3} style={{ margin: 0 }}>
                            Guía: {guia.clave}
                        </Title>
                        <Tag color={guia.estaAsegurado ? "blue" : "default"}>
                            {guia.estaAsegurado ? "Asegurado" : "Sin Seguro"}
                        </Tag>
                    </Space>
                </Col>
                <Col>
                    <Space>
                        {!isEditing ? (
                            <>
                                <Button icon={<PrinterOutlined />} onClick={() => handleImprimirEtiqueta(guia.guiaId)}>Imprimir Etiqueta</Button>
                                <Button icon={<PrinterOutlined />} onClick={() => handleImprimirCarta(guia.guiaId)}>Imprimir Carta</Button>
                                <Button type="primary" icon={<EditOutlined />} onClick={() => setIsEditing(true)}>
                                    Editar / Modificar
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button icon={<CloseOutlined />} onClick={() => setIsEditing(false)} disabled={guardando}>
                                    Cancelar
                                </Button>
                                <Button type="primary" icon={<SaveOutlined />} loading={guardando} onClick={handleSave}>
                                    Guardar Cambios
                                </Button>
                            </>
                        )}
                    </Space>
                </Col>
            </Row>

            <Form form={form} layout="vertical" onValuesChange={handleValuesChange}>
                {/* REMITENTE Y DESTINATARIO */}
                <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
                    <Col xs={24} md={12}>
                        <Card size="small" title="Origen (Remitente)">
                            <Descriptions column={1} size="small" bordered>
                                <Descriptions.Item label="Cliente">
                                    {guia.clienteOrigen.nombre || 'N/A'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Dirección">
                                    {`${guia.direccionOrigen?.direccion?.calle || ''} #${guia.direccionOrigen?.direccion?.numeroExterior || ''}, Col. ${guia.direccionOrigen?.direccion?.colonia || ''}`}
                                </Descriptions.Item>
                                <Descriptions.Item label="Sucursal Admisión">
                                    {guia.sucursalOrigenNombre || 'N/A'}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>

                    <Col xs={24} md={12}>
                        <Card size="small" title="Destino (Destinatario)">
                            <Descriptions column={1} size="small" bordered>
                                <Descriptions.Item label="Cliente">
                                    {guia.clienteDestino?.nombre || 'N/A'}
                                </Descriptions.Item>
                                <Descriptions.Item label="Dirección">
                                    {`${guia.direccionDestino?.direccion?.calle || ''} #${guia.direccionDestino?.direccion?.numeroExterior || ''}, Col. ${guia.direccionDestino?.direccion?.colonia || ''}`}
                                </Descriptions.Item>
                                <Descriptions.Item label="Sucursal Entrega">
                                    {guia.sucursalDestinoNombre || 'N/A'}
                                </Descriptions.Item>
                            </Descriptions>
                        </Card>
                    </Col>
                </Row>

                {/* PAGO Y SEGURO */}
                <Card title="Condiciones de Pago y Seguro" size="small" style={{ marginBottom: 24 }}>
                    {isEditing ? (
                        <Row gutter={[16, 16]}>
                            <Col xs={24} sm={8}>
                                <Form.Item name="estaAsegurado" valuePropName="checked" label="¿Mercancía Asegurada?">
                                    <Switch checked={estaAsegurado} onChange={(val) => setEstaAsegurado(val)} />
                                </Form.Item>
                            </Col>
                            {estaAsegurado && (
                                <>
                                    <Col xs={24} sm={8}>
                                        <Form.Item name="seguroId" label="Aseguradora">
                                            <Select options={seguros.map(s => ({ label: s.nombre, value: s.seguroId }))} />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} sm={8}>
                                        <Form.Item name="polizaSeguro" label="Póliza">
                                            <Input />
                                        </Form.Item>
                                    </Col>
                                </>
                            )}
                        </Row>
                    ) : (
                        <Descriptions column={{ xs: 1, sm: 3 }} bordered size="small">
                            <Descriptions.Item label="Forma de Pago">{guia.formaPago}</Descriptions.Item>
                            <Descriptions.Item label="¿Asegurado?">{guia.estaAsegurado ? 'Sí' : 'No'}</Descriptions.Item>
                            <Descriptions.Item label="Póliza">{guia.polizaSeguro || 'N/A'}</Descriptions.Item>
                        </Descriptions>
                    )}
                </Card>

                {/* DESGLOSE FINANCIERO */}
                <Card title="Desglose de Costos" size="small" style={{ marginBottom: 24 }}>
                    {isEditing ? (
                        <Row gutter={[16, 16]}>
                            <Col xs={12} md={6}>
                                <Form.Item name="flete" label="Flete">
                                    <InputNumber prefix="$" style={{ width: '100%' }} precision={2} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Item name="recoleccion" label="Recolección">
                                    <InputNumber prefix="$" style={{ width: '100%' }} precision={2} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Item name="entregaA" label="Entrega a Domicilio">
                                    <InputNumber prefix="$" style={{ width: '100%' }} precision={2} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Item name="maniobras" label="Maniobras">
                                    <InputNumber prefix="$" style={{ width: '100%' }} precision={2} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Item name="subtotal" label="Subtotal">
                                    <InputNumber prefix="$" disabled style={{ width: '100%' }} precision={2} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Item name="iva" label="IVA">
                                    <InputNumber prefix="$" disabled style={{ width: '100%' }} precision={2} />
                                </Form.Item>
                            </Col>
                            <Col xs={12} md={6}>
                                <Form.Item name="total" label="Total">
                                    <InputNumber prefix="$" disabled style={{ width: '100%', fontWeight: 'bold' }} precision={2} />
                                </Form.Item>
                            </Col>
                        </Row>
                    ) : (
                        <Descriptions column={{ xs: 2, sm: 4 }} bordered size="small">
                            <Descriptions.Item label="Flete">${guia.flete}</Descriptions.Item>
                            <Descriptions.Item label="Recolección">${guia.recoleccion}</Descriptions.Item>
                            <Descriptions.Item label="Entrega">${guia.entregaA}</Descriptions.Item>
                            <Descriptions.Item label="Maniobras">${guia.maniobras}</Descriptions.Item>
                            <Descriptions.Item label="Subtotal">${guia.subtotal}</Descriptions.Item>
                            <Descriptions.Item label="IVA">${guia.iva}</Descriptions.Item>
                            <Descriptions.Item label="Retención 4%">${guia.ivaRetenido}</Descriptions.Item>
                            <Descriptions.Item label="Total Final">
                                <Text type="success" strong>${guia.total}</Text>
                            </Descriptions.Item>
                        </Descriptions>
                    )}
                </Card>

                {/* ARTÍCULOS */}
                <Card title="Artículos Contenidos" size="small">
                    {isEditing ? (
                        <ArticulosFormList
                            catSatProdServ={catSatProdServOptions}
                            catSatUnidad={catSatUnidadOptions}
                            catSatEmbalaje={catSatEmbalajeOptions}
                        />
                    ) : (
                        <Table
                            columns={articulosColumns}
                            dataSource={guia.articulosGuia}
                            rowKey={(record) => record.articuloGuiaId ?? record.articuloId ?? crypto.randomUUID()}
                            pagination={false}
                            size="small"
                        />
                    )}
                </Card>
            </Form>
        </div>
    );
};
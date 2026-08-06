import React, { useState } from 'react';
import {
    Form,
    Col,
    Divider,
    Select,
    Card,
    Typography,
    Button,
    Space,
    Row,
    Switch,
    Input,
    InputNumber, Tag
} from 'antd';
import {useCliente, useGuia, useSeguro, useSucursal} from "@hooks";
import type { GuiaCreateDto, DireccionClienteDto, ArticuloGuiaCreateDto } from "@types";
import { ArticulosFormList } from "@modules/Guias/ArticulosFormList.tsx";

const { Title } = Typography;

interface CatalogoOption {
    value: string;
    label: string;
}

interface CatalogoNumber {
    value: number;
    label: string;

}

const catSatProdServOptions: CatalogoOption[] = [
    { value: '78101802', label: '78101802 - Servicios de transporte de carga' },
    { value: '24111507', label: '24111507 - Cajas de cartón' },
    { value: '31162800', label: '31162800 - Empaquetaduras' },
];

const catSatUnidadOptions: CatalogoOption[] = [
    { value: 'KGM', label: 'KGM - Kilogramo' },
    { value: 'H87', label: 'H87 - Pieza' },
    { value: 'XBX', label: 'XBX - Caja' },
];

const catSatEmbalajeOptions: CatalogoOption[] = [
    { value: '4G', label: '4G - Cajas de cartón' },
    { value: '1A1', label: '1A1 - Tambores de acero' },
    { value: '5H4', label: '5H4 - Bolsas de plástico' },
];

const formaPago: CatalogoNumber[] = [
    { value: 1, label: 'CreditoOrigen' },
    { value: 2, label: 'CreditoDestino' },
    { value: 3, label: 'Prepagado' },
    { value: 4, label: 'PorCobrarDestino' },
    { value: 5, label: 'Pagado' },
];

const GuiasAlta: React.FC = () => {
    const [form] = Form.useForm<GuiaCreateDto>();
    const { clientes } = useCliente();
    const { sucursales, loading: loadingSucursales } = useSucursal();
    const { seguros, loading: loadingSeguros } = useSeguro();
    const { handleCreate: guardarGuia } = useGuia();

    const [estaAsegurado, setEstaAsegurado] = useState<boolean>(false);
    const [condonaIva, setCondonaIva] = useState<boolean>(false);

    const [direccionesOrigen, setDireccionesOrigen] = useState<DireccionClienteDto[]>([]);
    const [direccionesDestino, setDireccionesDestino] = useState<DireccionClienteDto[]>([]);

    const clienteOptions = clientes.map(c => ({ label: c.nombre, value: c.clienteId }));
    const sucursalOptions = sucursales.map(s => ({ label: s.nombre, value: s.sucursalId }));
    const segurosOptions = seguros.map(s => ({ label: s.nombre, value: s.seguroId }));

    const handleClienteChange = (clienteId: string, tipo: 'origen' | 'destino') => {
        const cliente = clientes.find(c => c.clienteId === clienteId);
        const direcciones = cliente?.direcciones || [];

        if (tipo === 'origen') {
            setDireccionesOrigen(direcciones);
            form.setFieldsValue({ direccionOrigenId: undefined });
        } else {
            setDireccionesDestino(direcciones);
            form.setFieldsValue({ direccionDestinoId: undefined });
        }
    };

    const handleSucursalChange = (sucursalId: string, tipo: 'origen' | 'destino') => {
        const sucursal = sucursales.find(s => s.sucursalId === sucursalId);
        if (sucursal && (tipo === 'destino' || tipo === 'origen')) {
            console.log(sucursal);
        }
    };

    const onFinish = async (values: GuiaCreateDto) => {
        const payload = {
            ...values,
            seguroId: values.estaAsegurado ? values.seguroId : null,
            polizaSeguro: values.estaAsegurado ? values.polizaSeguro : null,
            articulosGuia: (values.articulosGuia || []).map((item: ArticuloGuiaCreateDto) => ({
                claveProdServSat: item.claveProdServSat,
                descripcion: item.descripcion,
                cantidad: item.cantidad,
                claveUnidadSat: item.claveUnidadSat,
                pesoUnitarioKg: item.pesoUnitarioKg,
                claveTipoEmbalajeSat: item.claveTipoEmbalajeSat ?? null,
                valorUnidad: item.valorUnidad,
                largo: item.largo,
                ancho: item.ancho,
                alto: item.alto,
                esMaterialPeligroso: item.esMaterialPeligroso ?? false,
            })),
        };
        console.log("Datos a enviar:", payload);
        const result = await guardarGuia(values);
        console.log(result);

    };

    const handleValuesChange = (changedValues: Partial<GuiaCreateDto>, allValues: GuiaCreateDto) => {
        const camposCostos = [
            'flete', 'seguro', 'recoleccion', 'entregaA',
            'maniobras', 'peaje', 'lineas', 'condonaIva'
        ];

        // Verificamos si la llave modificada pertenece a los costos
        const isCostoModificado = Object.keys(changedValues).some(key => camposCostos.includes(key));

        if (isCostoModificado) {
            const flete = allValues.flete || 0;
            const cobroSeguro = allValues.cobroSeguro || 0;
            const recoleccion = allValues.recoleccion || 0;
            const entregaA = allValues.entregaA || 0;
            const maniobras = allValues.maniobras || 0;
            const peaje = allValues.peaje || 0;
            const lineas = allValues.lineas || 0;

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

    return (
        <div style={{ width: '100%' }}>
            <Title level={2} style={{ marginBottom: 24 }}>Generar Nueva Guía</Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onValuesChange={handleValuesChange}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px', marginBottom: '16px' }}>
                    <Button type="primary" htmlType="submit">
                        Guardar Guía
                    </Button>
                </div>

                {/* SECCIÓN REMITENTE Y DESTINATARIO */}
                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
                        <Card
                            size="small"
                            title="Remitente"
                            styles={{ header: { backgroundColor: '#f6ffed' } }}
                        >
                            <Form.Item name="clienteOrigenId" label="Cliente" rules={[{ required: true, message: 'Requerido' }]}>
                                <Select
                                    placeholder="Buscar Cliente..."
                                    onChange={(val) => handleClienteChange(val, 'origen')}
                                    options={clienteOptions}
                                    showSearch={{
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
                                        value: d.direccionId
                                    }))}
                                />
                            </Form.Item>
                        </Card>
                    </Col>

                    <Col xs={24} md={12}>
                        <Card
                            size="small"
                            title="Destinatario"
                            styles={{ header: { backgroundColor: '#e6f7ff' } }}
                        >
                            <Form.Item name="clienteDestinoId" label="Cliente" rules={[{ required: true, message: 'Requerido' }]}>
                                <Select
                                    placeholder="Buscar Cliente..."
                                    onChange={(val) => handleClienteChange(val, 'destino')}
                                    options={clienteOptions}
                                    showSearch={{
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
                </Row>

                <Divider orientation="horizontal">Logística de Sucursales</Divider>

                <Row gutter={[16, 16]}>
                    <Col xs={24} md={12}>
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

                    <Col xs={24} md={12}>
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
                    </Col>
                </Row>

                <Divider orientation="horizontal">Condiciones de Pago y Seguro</Divider>

                <Row gutter={[16, 16]} align="middle">
                    {/* Forma de Pago */}
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="formaPago"
                            label="Forma de pago"
                            rules={[{ required: true, message: 'Requerido' }]}
                        >
                            <Select
                                placeholder="Forma de pago"
                                options={formaPago}
                                showSearch={{
                                    filterOption: (input, option) =>
                                        (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                }}
                            />
                        </Form.Item>
                    </Col>

                    {/* Valor Unitario Tonelada */}
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="valorUnitarioTonealda"
                            label="Valor unit. cuota convenida por tonelada"
                            initialValue={0}
                        >
                            <InputNumber style={{ width: '100%' }} min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    {/* Valor Declarado */}
                    <Col xs={24} sm={8}>
                        <Form.Item name="valorDeclarado" label="Valor declarado" initialValue={0}>
                            <InputNumber style={{ width: '100%' }} min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    {/* Switch: ¿Mercancía Asegurada? */}
                    <Col xs={24} sm={8}>
                        <Form.Item
                            name="estaAsegurado"
                            valuePropName="checked"
                            initialValue={false}
                            style={{ marginBottom: 0 }}
                        >
                            <Space>
                                <Switch
                                    checked={estaAsegurado}
                                    onChange={ (checked) => {
                                        setEstaAsegurado(checked)
                                        form.setFieldsValue({ estaAsegurado: checked });
                                        handleValuesChange({ estaAsegurado: checked }, form.getFieldsValue());
                                    }}
                                />
                                <span style={{ fontWeight: 500 }}>¿Mercancía Asegurada?</span>
                            </Space>
                        </Form.Item>
                    </Col>

                    {/* CAMPOS CONDICIONALES BASADOS EN EL ESTADO LOCAL */}
                    {estaAsegurado && (
                        <>
                            {/* Aseguradora */}
                            <Col xs={24} sm={8}>
                                <Form.Item
                                    name="seguroId"
                                    label="Aseguradora"
                                    rules={[{ required: estaAsegurado, message: 'Seleccione la aseguradora' }]}
                                >
                                    <Select
                                        placeholder="Seleccione aseguradora..."
                                        options={segurosOptions}
                                        loading={loadingSeguros}
                                        showSearch={{
                                            filterOption: (input, option) =>
                                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            {/* Número de Póliza */}
                            <Col xs={24} sm={8}>
                                <Form.Item
                                    name="polizaSeguro"
                                    label="Número de Póliza"
                                    rules={[{ required: estaAsegurado, message: 'Ingrese el número de póliza' }]}
                                >
                                    <Input placeholder="Ej. POL-2026-99482" />
                                </Form.Item>
                            </Col>
                        </>
                    )}
                </Row>

                <Divider orientation="horizontal">Costos</Divider>

                <Row gutter={[16, 16]}>
                    {/* --- BLOQUE 1: CONCEPTOS MANUALES (INPUTS) --- */}
                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="flete" label="Flete" initialValue={0}>
                            <InputNumber style={{ width: '100%' }} prefix="$" min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="seguro" label="Seguro" initialValue={0}>
                            <InputNumber style={{ width: '100%' }} prefix="$" min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="recoleccion" label="Recolección" initialValue={0}>
                            <InputNumber style={{ width: '100%' }} prefix="$" min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="entregaA" label="Entrega a Domicilio" initialValue={0}>
                            <InputNumber style={{ width: '100%' }} prefix="$" min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="maniobras" label="Maniobras" initialValue={0}>
                            <InputNumber style={{ width: '100%' }} prefix="$" min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="peaje" label="Peaje / Casetas" initialValue={0}>
                            <InputNumber style={{ width: '100%' }} prefix="$" min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={8}>
                        <Form.Item name="lineas" label="Líneas / Transbordo" initialValue={0}>
                            <InputNumber style={{ width: '100%' }} prefix="$" min={0} precision={2} />
                        </Form.Item>
                    </Col>

                    {/* --- BLOQUE 2: CONFIGURACIÓN IMPUESTOS --- */}
                    <Col xs={24} sm={12} md={16} style={{ display: 'flex', alignItems: 'center' }}>
                        <Form.Item
                            name="condonaIva"
                            valuePropName="checked"
                            initialValue={false}
                            style={{ marginBottom: 24 }}
                        >
                            <Space size="middle">
                                <Switch
                                    checked={condonaIva}
                                    onChange={(checked) => {
                                        setCondonaIva(checked);
                                        form.setFieldsValue({ condonaIva: checked });
                                        handleValuesChange({ condonaIva: checked }, form.getFieldsValue());
                                    }}
                                />
                                <div>
                                <span style={{ fontWeight: 600, display: 'block' }}>
                                    Condonar / Exentar IVA
                                </span>
                                    {condonaIva
                                        ? 'Tasa de IVA del 0% aplicada'
                                        : 'Aplica IVA general del 16%'}
                                </div>
                            </Space>
                        </Form.Item>
                    </Col>

                    {/* --- BLOQUE 3: TOTALES Y LIQUIDACIÓN (RESUMEN DESTACADO) --- */}
                    <Col span={24}>
                        <Card
                            size="small"
                            title="Resumen del Cálculo"
                            style={{ backgroundColor: '#fafafa', border: '1px solid #d9d9d9' }}
                        >
                            <Row gutter={[16, 16]}>
                                {/* Subtotal */}
                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="subtotal" label="Subtotal" initialValue={0}>
                                        <InputNumber style={{ width: '100%' }} prefix="$" disabled precision={2} />
                                    </Form.Item>
                                </Col>

                                {/* IVA Calculado */}
                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item
                                        name="iva"
                                        label={
                                            <Space>
                                                <span>IVA</span>
                                                <Tag color={condonaIva ? "default" : "blue"}>
                                                    {condonaIva ? '0%' : '16%'}
                                                </Tag>
                                            </Space>
                                        }
                                        initialValue={0}
                                    >
                                        <InputNumber style={{ width: '100%' }} prefix="$" disabled precision={2} />
                                    </Form.Item>
                                </Col>

                                {/* IVA Retenido */}
                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="ivaRetenido" label="Retención IVA (4%)" initialValue={0}>
                                        <InputNumber style={{ width: '100%' }} prefix="$" disabled precision={2} />
                                    </Form.Item>
                                </Col>

                                {/* Total Final */}
                                <Col xs={24} sm={12} md={6}>
                                    <Form.Item name="total" label={<strong>Total a Cobrar</strong>} initialValue={0}>
                                        <InputNumber
                                            style={{ width: '100%', fontWeight: 'bold' }}
                                            prefix="$"
                                            disabled
                                            precision={2}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <Divider orientation="horizontal">Artículos del Envío</Divider>

                <div style={{ marginBottom: '24px' }}>
                    <ArticulosFormList
                        catSatProdServ={catSatProdServOptions}
                        catSatUnidad={catSatUnidadOptions}
                        catSatEmbalaje={catSatEmbalajeOptions}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #f0f0f0', paddingTop: '16px' }}>
                    <Button type="primary" htmlType="submit">
                        Guardar Guía
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default GuiasAlta;
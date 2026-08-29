import React, { useState, useEffect, useMemo } from 'react';
import {
    Form,
    Col,
    Divider,
    Select,
    Typography,
    Button,
    Row,
    Input,
    DatePicker,
    Card,
    Table,
    Tag,
    Space,
    Alert,
    Checkbox
} from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { useSucursal, useChofer, useGuia, useAsignacion } from '@hooks';
import type {GuiaDto, AsignacionCrearDto, GuiaFiltroDto} from '@types';

const { Title, Text } = Typography;

const AsignacionesAlta: React.FC = () => {
    const [form] = Form.useForm<AsignacionCrearDto>();

    // Estados locales para selección y búsqueda
    const [selectedGuiaIds, setSelectedGuiaIds] = useState<React.Key[]>([]);
    // Almacena la entidad completa de las guías seleccionadas para evitar que 'desaparezcan' de la vista
    const [guiasSeleccionadasObjetos, setGuiasSeleccionadasObjetos] = useState<GuiaDto[]>([]);

    const [desactivarFiltroSucursal, setDesactivarFiltroSucursal] = useState<boolean>(false);
    const [searchFolio, setSearchFolio] = useState<string>('');

    // Escucha del valor actual de la sucursal de origen en el formulario
    const sucursalOrigenSeleccionada = Form.useWatch('sucursalOrigenId', form);

    // Hooks de datos
    const { sucursales, cargando: loadingSucursales, obtenerSucursales } = useSucursal();
    const { choferes, loading: loadingChoferes } = useChofer();
    const { guias, cargando: loadingGuias, obtenerGuiasFiltro } = useGuia();
    const { handleCreate: guardarAsignacion } = useAsignacion();

    const [filtro] = useState<GuiaFiltroDto>({
        estaAsignado: false, // Muestra asignados y no asignados por defecto
        pagina: 1,
        tamanoPagina: 20
    });

    useEffect(() => {
        void obtenerSucursales();
        void obtenerGuiasFiltro(filtro);
    }, [obtenerGuiasFiltro, obtenerSucursales, filtro, form, ]);

    // Mapeos para Selects
    const sucursalOptions = sucursales.map((s) => ({
        label: s.nombre,
        value: s.sucursalId,
    }));

    const choferOptions = choferes.map((c) => ({
        label: `${c.nombre} ${c.apellidoPaterno ?? ''}`.trim(),
        value: c.choferId,
    }));

    // 1. Filtrado de guías según el criterio actual (sucursal y búsqueda)
    const guiasBusqueda = useMemo(() => {
        return guias.filter((g: GuiaDto) => {
            const cumpleSucursal = desactivarFiltroSucursal
                ? true
                : sucursalOrigenSeleccionada
                    ? g.sucursalOrigenId === sucursalOrigenSeleccionada
                    : true;

            const cumpleFolio = searchFolio.trim() === ''
                ? true
                : g.clave?.toLowerCase().includes(searchFolio.toLowerCase().trim());

            return cumpleSucursal && cumpleFolio;
        });
    }, [guias, sucursalOrigenSeleccionada, desactivarFiltroSucursal, searchFolio]);

    // 2. Combinación de los resultados de búsqueda con las guías previamente seleccionadas
    // Evita duplicados comparando la propiedad 'guiaId'
    const guiasParaTabla = useMemo(() => {
        const mapaGuias = new Map<string, GuiaDto>();

        // Agregamos las guías de la búsqueda actual
        guiasBusqueda.forEach((g: GuiaDto) => mapaGuias.set(g.guiaId, g));

        // Forzamos la inclusión de las guías seleccionadas anteriormente
        guiasSeleccionadasObjetos.forEach((g: GuiaDto) => {
            if (!mapaGuias.has(g.guiaId)) {
                mapaGuias.set(g.guiaId, g);
            }
        });

        return Array.from(mapaGuias.values());
    }, [guiasBusqueda, guiasSeleccionadasObjetos]);

    // Handler para la selección de filas
    const handleRowSelectionChange = (newSelectedRowKeys: React.Key[], selectedRows: GuiaDto[]) => {
        setSelectedGuiaIds(newSelectedRowKeys);

        // Actualizamos el acumulador de objetos manteniendo los anteriores seleccionados
        setGuiasSeleccionadasObjetos((prevObjetos) => {
            const mapa = new Map<string, GuiaDto>();
            // Mantenemos objetos previos si su ID sigue estando en newSelectedRowKeys
            prevObjetos.forEach((obj) => {
                if (newSelectedRowKeys.includes(obj.guiaId)) {
                    mapa.set(obj.guiaId, obj);
                }
            });
            // Añadimos los nuevos elementos seleccionados en esta acción
            selectedRows.forEach((row) => {
                if (row && newSelectedRowKeys.includes(row.guiaId)) {
                    mapa.set(row.guiaId, row);
                }
            });
            return Array.from(mapa.values());
        });
    };

    const guiasColumns: ColumnsType<GuiaDto> = [
        {
            title: 'Folio / Clave',
            dataIndex: 'clave',
            key: 'clave',
            render: (text: string) => <Text strong copyable>{text}</Text>,
        },
        {
            title: 'Fecha Envío',
            dataIndex: 'fechaEnvio',
            key: 'fechaEnvio',
            render: (fecha: Date) => new Date(fecha).toLocaleDateString('es-MX'),
        },
        {
            title: 'Origen',
            key: 'origen',
            render: (_, record: GuiaDto) => (
                <span>{record.direccionOrigen?.direccion?.colonia || 'Origen N/A'}</span>
            ),
        },
        {
            title: 'Destino',
            key: 'destino',
            render: (_, record: GuiaDto) => (
                <span>{record.direccionDestino?.direccion?.colonia || 'Destino N/A'}</span>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            render: (monto: string) => (
                <Text type="success" strong>
                    ${parseFloat(monto || '0').toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </Text>
            ),
        },
        {
            title: 'Estado',
            dataIndex: 'cobroSeguro',
            key: 'estado',
            render: (seguro: string) =>
                parseFloat(seguro) > 0 ? <Tag color="blue">Asegurado</Tag> : <Tag>Estándar</Tag>,
        },
    ];

    const onFinish = async (values: AsignacionCrearDto) => {
        const payload: AsignacionCrearDto = {
            ...values,
            guiasId: selectedGuiaIds.map((id) => id.toString()),
            fechaPartida: values.fechaPartida
        };

        console.log('Datos de asignación a guardar:', payload);
        const result = await guardarAsignacion(payload);
        console.log(result);
    };

    return (
        <div style={{ width: '100%' }}>
            <Title level={2} style={{ marginBottom: 24 }}>
                Generar Nueva Asignación
            </Title>

            <Form form={form} layout="vertical" onFinish={onFinish}>
                {/* BARRA SUPERIOR DE ACCIONES */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        borderBottom: '1px solid #f0f0f0',
                        paddingBottom: '16px',
                        marginBottom: '16px',
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Guardar Asignación ({selectedGuiaIds.length} guías)
                    </Button>
                </div>

                {/* SECCIÓN 1: LOGÍSTICA Y SUCURSALES */}
                <Card size="small" title="Información de Ruta y Sucursales" style={{ marginBottom: 24 }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item
                                name="sucursalOrigenId"
                                label="Sucursal de Origen"
                                rules={[{ required: true, message: 'Seleccione la sucursal de origen' }]}
                            >
                                <Select
                                    placeholder="Seleccione sucursal de salida"
                                    loading={loadingSucursales}
                                    options={sucursalOptions}
                                    showSearch={{
                                        filterOption: (input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item
                                name="sucursalDestinoId"
                                label="Sucursal de Destino"
                                rules={[{ required: true, message: 'Seleccione la sucursal de destino' }]}
                            >
                                <Select
                                    placeholder="Seleccione sucursal de llegada"
                                    loading={loadingSucursales}
                                    options={sucursalOptions}
                                    showSearch={{
                                        filterOption: (input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                    }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* SECCIÓN 2: SELECCIÓN DE GUÍAS DE LA SUCURSAL */}
                <Divider orientation="horizontal">Guías Disponibles para Asignar</Divider>

                <Card size="small" style={{ marginBottom: 24 }}>
                    <Space orientation="vertical" style={{ width: '100%' }} size="middle">

                        {/* BARRA DE CONTROLES SOBRE LA TABLA */}
                        <Row gutter={[16, 16]} align="middle" justify="space-between">
                            <Col xs={24} md={12}>
                                <Input
                                    placeholder="Buscar por folio / clave de guía..."
                                    prefix={<SearchOutlined />}
                                    value={searchFolio}
                                    onChange={(e) => setSearchFolio(e.target.value)}
                                    allowClear
                                />
                            </Col>
                            <Col xs={24} md={12} style={{ textAlign: 'right' }}>
                                <Checkbox
                                    checked={desactivarFiltroSucursal}
                                    onChange={(e) => setDesactivarFiltroSucursal(e.target.checked)}
                                >
                                    Mostrar guías de todas las sucursales (Omitir filtro de origen)
                                </Checkbox>
                            </Col>
                        </Row>

                        <Alert
                            title={`Mostrando ${guiasParaTabla.length} guías en la vista (${selectedGuiaIds.length} seleccionadas en total). Las guías previamente marcadas permanecerán seleccionadas aunque cambies la búsqueda.`}
                            type="info"
                            showIcon
                        />

                        <Table
                            rowSelection={{
                                type: 'checkbox',
                                selectedRowKeys: selectedGuiaIds,
                                onChange: handleRowSelectionChange,
                                preserveSelectedRowKeys: true, // Propiedad de AntD para reservar referencias de claves seleccionadas
                            }}
                            columns={guiasColumns}
                            dataSource={guiasParaTabla}
                            rowKey="guiaId"
                            loading={loadingGuias}
                            size="small"
                            pagination={{
                                pageSize: 5,
                                showSizeChanger: true,
                                showTotal: (total) => `Total: ${total} guías visibles`,
                            }}
                        />
                    </Space>
                </Card>

                {/* SECCIÓN 3: ASIGNACIÓN DE OPERADOR Y TIEMPOS */}
                <Card size="small" title="Operador y Salida" style={{ marginBottom: 24 }}>
                    <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                            <Form.Item name="choferId" label="Chofer / Operador">
                                <Select
                                    placeholder="Buscar y seleccionar chofer..."
                                    loading={loadingChoferes}
                                    options={choferOptions}
                                    allowClear
                                    showSearch={{
                                        filterOption: (input, option) =>
                                            (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                    }}
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={12}>
                            <Form.Item name="fechaPartida" label="Fecha y Hora de Partida">
                                <DatePicker
                                    showTime
                                    style={{ width: '100%' }}
                                    format="DD/MM/YYYY HH:mm"
                                    placeholder="Seleccione fecha y hora"
                                />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>

                {/* SECCIÓN 4: CAMPOS DE ESTATUS OPCIONALES */}
                <Divider orientation="horizontal">Estados de Control (ST1 - ST4)</Divider>

                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} md={6}>
                        <Form.Item name="st1" label="Estatus 1 (ST1)">
                            <Input placeholder="Ej. EN_ESPERA" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item name="st2" label="Estatus 2 (ST2)">
                            <Input placeholder="Ej. EN_TRANSITO" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item name="st3" label="Estatus 3 (ST3)">
                            <Input placeholder="Ej. LLEGADA_ADUANA" />
                        </Form.Item>
                    </Col>

                    <Col xs={24} sm={12} md={6}>
                        <Form.Item name="st4" label="Estatus 4 (ST4)">
                            <Input placeholder="Ej. FINALIZADO" />
                        </Form.Item>
                    </Col>
                </Row>

                {/* BARRA INFERIOR DE ACCIONES */}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        borderTop: '1px solid #f0f0f0',
                        paddingTop: '16px',
                        marginTop: '24px',
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Guardar Asignación ({selectedGuiaIds.length} guías)
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AsignacionesAlta;
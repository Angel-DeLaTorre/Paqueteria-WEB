import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Card, Tag, Space, Typography } from 'antd';
import { FileAddOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type { GuiaDto } from "@types";
import { useGuia, useNotification } from "@hooks";
import { ROUTES } from '@router/rutas';
import {pdfImprimirUtil} from "@utils";

const { Text } = Typography;

const GuiasScreen: React.FC = () => {
    const navigate = useNavigate();
    const { guias, cargando, obtenerGuias, generarEtiquita } = useGuia();
    const { showNotification } = useNotification();

    const [idImprimiendo, setIdImprimiendo] = useState<string | null>(null);

    useEffect(() => {
        const cargarDatos = async () => {
            const respuesta = await obtenerGuias();
            if (!respuesta.esExitoso) {
                showNotification({
                    type: 'error',
                    message: 'Error al consultar guías',
                    description: respuesta.detalleError?.descripcion || 'No se pudo cargar la lista de guías.'
                });
            }
        };

        void cargarDatos();
    }, [obtenerGuias, showNotification]);

    const handleImprimir =  async (guiaId : string) => {
        setIdImprimiendo(guiaId);
        try{
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
        } finally {
            setIdImprimiendo(null);
        }

    };

    const columns: ColumnsType<GuiaDto> = [
        {
            title: 'Folio / Clave',
            dataIndex: 'clave',
            key: 'clave',
            render: (text) => <Text strong copyable>{text}</Text>,
            fixed: 'left',
            width: 150,
        },
        {
            title: 'Fecha Envío',
            dataIndex: 'fechaEnvio',
            key: 'fechaEnvio',
            render: (fecha: Date) => new Date(fecha).toLocaleDateString(),
            sorter: (a, b) => {
                const fechaA = a.fechaEnvio ? new Date(a.fechaEnvio).getTime() : 0;
                const fechaB = b.fechaEnvio ? new Date(b.fechaEnvio).getTime() : 0;
                return fechaA - fechaB;
            },
        },
        {
            title: 'Origen',
            key: 'origen',
            render: (_, record) => (
                <span>{record.direccionOrigen?.direccion?.calle}, {record.direccionOrigen?.direccion?.colonia}</span>
            ),
        },
        {
            title: 'Destino',
            key: 'destino',
            render: (_, record) => (
                <span>{record.direccionDestino?.direccion?.calle}, {record.direccionDestino?.direccion?.colonia}</span>
            ),
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            render: (monto: string) => (
                <Text type="success" strong>
                    ${parseFloat(monto).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </Text>
            ),
        },
        {
            title: 'Seguro',
            dataIndex: 'cobroSeguro',
            key: 'cobroSeguro',
            render: (seguro: string) => parseFloat(seguro) > 0 ? <Tag color="blue">Asegurado</Tag> : <Tag>N/A</Tag>,
        },
        {
            title: 'Acciones',
            key: 'acciones',
            fixed: 'right',
            width: 120,
            render: (_, record) => {
                const estaCargandoEste = idImprimiendo === record.guiaId;
                const hayAlgunaCargaActiva = idImprimiendo !== null;

                return (
                    <Space size="small">
                        <Button
                            icon={<EyeOutlined />}
                            type="text"
                            title="Ver detalle"
                            disabled={hayAlgunaCargaActiva}
                            onClick={() => navigate(`/app/guias/${record.guiaId}`)}
                        />
                        <Button
                            icon={<PrinterOutlined />}
                            type="text"
                            title="Imprimir Guía"
                            loading={estaCargandoEste}
                            disabled={hayAlgunaCargaActiva} // Bloquea los demás botones mientras uno imprime
                            onClick={() => handleImprimir(record.guiaId)}
                        />
                    </Space>
                );
            },
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Consulta de Guías de Embarque"
                extra={
                    <Button
                        type="primary"
                        icon={<FileAddOutlined />}
                        onClick={() => navigate(ROUTES.CATALOGOS.GUIAS_ALTA)}
                    >
                        Nueva Guía
                    </Button>
                }
            >
                <Table
                    columns = {columns}
                    dataSource={guias}
                    rowKey="guiaId"
                    loading={cargando}
                    scroll={{ x: 1300 }}
                    pagination={{
                        total: guias.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total: ${total} guías`
                    }}
                />
            </Card>
        </div>
    );
};

export default GuiasScreen;
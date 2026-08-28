import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Card, Tag, Space, Typography } from 'antd';
import { FileAddOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { ROUTES } from '@router/rutas';
import {useAsignacion, useNotification} from "@hooks";
import type { AsignacionDto } from "@types";

// Importación del Modal extra
import { AsignacionDetalleModal } from './AsignacionDetalle';

const { Text } = Typography;

const AsignacionesScreen: React.FC = () => {
    const navigate = useNavigate();
    const { showNotification } = useNotification();
    const { fetchAsignaciones, generarReporteSalida, asignaciones, cargando } = useAsignacion();

    // Estado para controlar el Modal
    const [selectedAsignacion, setSelectedAsignacion] = useState<AsignacionDto | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const cargarDatos = async () => {
            const respuesta = await fetchAsignaciones();
            if (!respuesta.esExitoso) {
                showNotification({
                    type: 'error',
                    message: 'Error al obtener asiganciones',
                    description: respuesta.detalleError?.descripcion || 'No se pudo cargar la lista.'
                });
            }
        };

        void cargarDatos();
    }, [fetchAsignaciones, showNotification]);


    // Handlers para acciones
    const handleVerDetalle = (record: AsignacionDto) => {
        setSelectedAsignacion(record);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedAsignacion(null);
    };

    const handleImprimir =  async (record: AsignacionDto) => {
        const respuesta = await generarReporteSalida(record.id);

        if (respuesta.esExitoso && respuesta.datos) {
            // Creamos la URL temporal del Blob y lanzamos la impresión
            const blob = new Blob([respuesta.datos], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);

            const iframe = document.createElement('iframe');
            iframe.style.display = 'none';
            iframe.src = blobUrl;
            document.body.appendChild(iframe);

            iframe.onload = () => {
                try {
                    iframe.contentWindow?.print();
                } catch (error) {
                    console.error('Error al invocar la impresión:', error);
                }
            };
        } else {
            showNotification({
                type: 'error',
                message: 'Error al generar el reporte',
                description: respuesta.detalleError?.descripcion || 'No se pudo generar el reporte.'
            });
        }
    };

    const columns: ColumnsType<AsignacionDto> = [
        {
            title: 'ID Asignación',
            dataIndex: 'clave',
            key: 'clave',
            render: (text: string) => <Text strong copyable>{text}</Text>,
            fixed: 'left',
            width: 180,
        },
        {
            title: 'Fecha Partida',
            dataIndex: 'fechaPartida',
            key: 'fechaPartida',
            render: (fecha?: string | Date) =>
                fecha ? new Date(fecha).toLocaleDateString('es-MX') : 'N/A',
            sorter: (a, b) => {
                const timeA = a.fechaPartida ? new Date(a.fechaPartida).getTime() : 0;
                const timeB = b.fechaPartida ? new Date(b.fechaPartida).getTime() : 0;
                return timeA - timeB;
            },
            width: 130,
        },
        {
            title: 'Sucursal Origen',
            key: 'sucursalOrigen',
            render: (_, record) => record.sucursalOrigen?.nombre || 'N/A',
        },
        {
            title: 'Sucursal Destino',
            key: 'sucursalDestino',
            render: (_, record) => record.sucursalDestino?.nombre || 'N/A',
        },
        {
            title: 'Chofer ID',
            dataIndex: 'choferId',
            key: 'choferId',
            render: (choferId?: string) => choferId ? <Tag color="blue">{choferId}</Tag> : <Tag>Sin Asignar</Tag>,
        },
        {
            title: 'Estatus (ST1 - ST4)',
            key: 'estatus',
            render: (_, record) => (
                <Space size="small" wrap>
                    {record.st1 && <Tag color="green">{record.st1}</Tag>}
                    {record.st2 && <Tag color="cyan">{record.st2}</Tag>}
                    {record.st3 && <Tag color="orange">{record.st3}</Tag>}
                    {record.st4 && <Tag color="red">{record.st4}</Tag>}
                    {!record.st1 && !record.st2 && !record.st3 && !record.st4 && <Tag>Sin Estado</Tag>}
                </Space>
            ),
        },
        {
            title: 'Acciones',
            key: 'acciones',
            fixed: 'right',
            width: 120,
            render: (_, record) => (
                <Space size="small">
                    <Button
                        icon={<EyeOutlined />}
                        type="text"
                        title="Ver detalle"
                        onClick={() => handleVerDetalle(record)}
                    />
                    <Button
                        icon={<PrinterOutlined />}
                        type="text"
                        title="Imprimir Asignación"
                        onClick={() => handleImprimir(record)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Consulta de Asignaciones"
                extra={
                    <Button
                        type="primary"
                        icon={<FileAddOutlined />}
                        onClick={() => navigate(ROUTES.CATALOGOS.ASIGNACIONES_ALTA)}
                    >
                        Nueva Asignación
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={asignaciones}
                    rowKey="id"
                    loading={cargando}
                    scroll={{ x: 1300 }}
                    pagination={{
                        total: asignaciones.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total: ${total} asignaciones`,
                    }}
                />
            </Card>

            {/* Modal de Detalle */}
            <AsignacionDetalleModal
                visible={isModalOpen}
                asignacion={selectedAsignacion}
                onClose={handleCloseModal}
                onPrint={handleImprimir}
            />
        </div>
    );
};

export default AsignacionesScreen;
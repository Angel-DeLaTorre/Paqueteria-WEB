import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Card, Tag, Space, Typography } from 'antd';
import { FileAddOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';

const { Text } = Typography;

// 1. Interfaces basadas en el récord AsignacionResponseDto
export interface Sucursal {
    id: string;
    nombre: string;
    direccion?: string;
}

export interface AsignacionResponseDto {
    id: string; // Mapeado de Guid
    sucursalOrigen?: Sucursal | null;
    sucursalDestino?: Sucursal | null;
    choferId?: string | null; // Mapeado de Guid?
    fechaPartida?: string | Date | null; // Mapeado de DateTime?
    st1?: string | null;
    st2?: string | null;
    st3?: string | null;
    st4?: string | null;
}

// Mock/Hook ficticio de asignaciones para mantener el patrón de diseño original
const useAsignacion = () => {
    return {
        asignaciones: [] as AsignacionResponseDto[],
        loading: false,
        refresh: () => {},
    };
};

const AsignacionesScreen: React.FC = () => {
    const navigate = useNavigate();
    const { refresh, asignaciones, loading } = useAsignacion();

    useEffect(() => {
        refresh();
    }, [refresh]);

    // 2. Definición de columnas ajustadas al DTO de Asignaciones
    const columns: ColumnsType<AsignacionResponseDto> = [
        {
            title: 'ID Asignación',
            dataIndex: 'id',
            key: 'id',
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
            render: () => (
                <Space size="small">
                    <Button icon={<EyeOutlined />} type="text" title="Ver detalle" />
                    <Button icon={<PrinterOutlined />} type="text" title="Imprimir Asignación" />
                </Space>
            ),
        },
    ];

    // 3. Renderizado del contenedor y la tabla
    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Consulta de Asignaciones"
                extra={
                    <Button
                        type="primary"
                        icon={<FileAddOutlined />}
                        onClick={() => navigate('/asignaciones/alta')}
                    >
                        Nueva Asignación
                    </Button>
                }
            >
                <Table
                    columns={columns}
                    dataSource={asignaciones}
                    rowKey="id"
                    loading={loading}
                    scroll={{ x: 1300 }}
                    pagination={{
                        total: asignaciones.length,
                        pageSize: 10,
                        showSizeChanger: true,
                        showTotal: (total) => `Total: ${total} asignaciones`,
                    }}
                />
            </Card>
        </div>
    );
};

export default AsignacionesScreen;
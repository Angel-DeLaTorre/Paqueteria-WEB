import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Card, Tag, Space, Typography } from 'antd';
import { FileAddOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type {GuiaDto} from "@types";
import { useGuia } from "@hooks";

import { ROUTES } from '@router/rutas';

const { Text } = Typography;

const GuiasScreen: React.FC = () => {

    const navigate = useNavigate();

    const { refresh, guias, loading } = useGuia();

    useEffect(() => {
        refresh();
    }, [refresh]);

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
            sorter: (a, b) => new Date(a.fechaEnvio).getTime() - new Date(b.fechaEnvio).getTime(),
        },
        {
            title: 'Origen',
            key: 'origen',
            render: (_, record) => (
                <span>{record.direccionOrigen.direccion.calle}, {record.direccionOrigen.direccion.colonia}</span>
            ),
        },
        {
            title: 'Destino',
            key: 'destino',
            render: (_, record) => (
                <span>{record.direccionDestino.direccion.calle}, {record.direccionDestino.direccion.colonia}</span>
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
            render: () => (
                <Space size="small">
                    <Button icon={<EyeOutlined />} type="text" title="Ver detalle" />
                    <Button icon={<PrinterOutlined />} type="text" title="Imprimir Guía" />
                </Space>
            ),
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
                    columns={columns}
                    dataSource={guias}
                    rowKey="guiaId"
                    loading={loading}
                    scroll={{ x: 1300 }} // Scroll horizontal para laptops de sucursal
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
import React, { useState } from 'react';
import { Table, Button, Card, Tag, Space, Typography } from 'antd';
import { FileAddOutlined, EyeOutlined, PrinterOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import type {GuiaCreateDto, GuiaDto} from "@types";
import { useGuia } from "@hooks";
import { GuiaAltaModal } from './GuiaAltaModal';

const { Text } = Typography;

const GuiasScreen: React.FC = () => {

    const { guias, loading, handleCreate : handleCreateGuia } = useGuia();
    const [isModalVisible, setIsModalVisible] = useState(false);

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
                <span>{record.direccionOrigen.calle}, {record.direccionOrigen.colonia}</span>
            ),
        },
        {
            title: 'Destino',
            key: 'destino',
            render: (_, record) => (
                <span>{record.direccionDestino.calle}, {record.direccionDestino.colonia}</span>
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

    const onSaveGuia = async (values: GuiaCreateDto) => {
        const success = await handleCreateGuia(values);
        if (success) {
            setIsModalVisible(false);
        }
    };

    return (
        <div style={{ padding: '24px' }}>
            <Card
                title="Consulta de Guías de Embarque"
                extra={
                    <Button
                        type="primary"
                        icon={<FileAddOutlined />}
                        onClick={() => setIsModalVisible(true)}
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

            <GuiaAltaModal
                open = { isModalVisible }
                onCancel = { () => setIsModalVisible(false) }
                onSave = { onSaveGuia }
                loading = { loading }
            />

        </div>
    );
};

export default GuiasScreen;
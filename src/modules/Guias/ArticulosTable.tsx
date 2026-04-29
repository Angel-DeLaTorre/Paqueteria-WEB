import React, {useCallback, useState} from 'react';
import { Table, Button, Input, InputNumber, Popconfirm, Typography } from 'antd';
import {DeleteOutlined, PlusOutlined} from '@ant-design/icons';

interface ArticuloFila {
    key: string;
    articuloId?: string;
    descripcion: string;
    cantidad: number;
    peso: number;
    valorUnitario: number;
}
type ArticuloValue = string | number | undefined;

export const ArticulosTable: React.FC<{ onChange: (data: ArticuloFila[]) => void }> = ({ onChange }) => {
    const [dataSource, setDataSource] = useState<ArticuloFila[]>([]);
    const [count, setCount] = useState(0);

    // Usamos useCallback para que la función no se recree y ayude a la estabilidad
    const handleEdit = useCallback((key: string, field: keyof ArticuloFila, value: ArticuloValue) => {
        setDataSource(prevData => {
            const newData = [...prevData];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                newData[index] = { ...newData[index], [field]: value };
            }
            // Notificamos al padre después de la actualización del estado local
            // Usamos un pequeño timeout o useEffect para asegurar que el cambio se procesó
            return newData;
        });
    }, []);

    // Sincronizar con el padre cuando el dataSource cambie
    React.useEffect(() => {
        onChange(dataSource);
    }, [dataSource, onChange]);

    const columns = [
        {
            title: 'Descripción',
            dataIndex: 'descripcion',
            render: (text: string, record: ArticuloFila) => (
                <Input
                    placeholder="Ej. Caja de herramientas"
                    value={text} // Usamos el valor que viene del render (text)
                    onChange={(e) => handleEdit(record.key, 'descripcion', e.target.value)}
                />
            ),
        },
        {
            title: 'Cantidad',
            dataIndex: 'cantidad',
            width: '12%',
            render: (value: number, record: ArticuloFila) => (
                <InputNumber
                    min={1}
                    value={value}
                    onChange={(val) => handleEdit(record.key, 'cantidad', val ?? 0)}
                />
            ),
        },
        {
            title: 'Peso (kg)',
            dataIndex: 'peso',
            width: '12%',
            render: (value: number, record: ArticuloFila) => (
                <InputNumber
                    min={0.1}
                    step={0.1}
                    value={value}
                    onChange={(val) => handleEdit(record.key, 'peso', val ?? 0)}
                />
            ),
        },
        {
            title: 'Valor Unitario',
            dataIndex: 'valorUnitario',
            width: '15%',
            render: (value: number, record: ArticuloFila) => (
                <InputNumber
                    prefix="$"
                    min={0}
                    value={value}
                    onChange={(val) => handleEdit(record.key, 'valorUnitario', val ?? 0)}
                />
            ),
        },
        {
            title: 'Acciones',
            dataIndex: 'operation',
            width: '8%',
            render: ( _, record: ArticuloFila) => (
                <Popconfirm title="¿Eliminar?" onConfirm={() => handleDelete(record.key)}>
                    <Button type="text" danger icon={<DeleteOutlined />} />
                </Popconfirm>
            ),
        },
    ];

    const handleDelete = (key: string) => {
        const newData = dataSource.filter((item) => item.key !== key);
        setDataSource(newData);
    };

    const handleAdd = () => {
        const newData: ArticuloFila = {
            key: `new-${count}`, // Aseguramos una key única y estable
            descripcion: '',
            cantidad: 1,
            peso: 1,
            valorUnitario: 0,
        };
        setDataSource([...dataSource, newData]);
        setCount(count + 1);
    };

    return (
        <>
            <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography.Text strong>Detalle de Carga / Artículos</Typography.Text>
                <Button onClick={handleAdd} type="primary" icon={<PlusOutlined />} size="small">
                    Agregar Artículo
                </Button>
            </div>
            <Table
                rowKey="key" // Crucial: decirle a AntD qué campo usar como ID único
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                size="small"
                // Evitar que la tabla se re-renderice agresivamente
                components={{
                    body: {
                        // Si el problema persiste, a veces es necesario definir
                        // una fila personalizada estable aquí.
                    }
                }}
            />
        </>

    );
};
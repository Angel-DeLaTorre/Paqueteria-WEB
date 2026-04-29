import React from 'react';
import { Table, Card, Typography } from 'antd';
import {useArticulo} from "@hooks";

const { Title } = Typography;

const Articulos: React.FC = () => {
    const { articulos } = useArticulo();


    const columns = [

        { title: 'ID', dataIndex: 'ArticuloId', key: 'ArticuloId', width: 80 },
        { title: 'Nombre', dataIndex: 'Texto', key: 'Texto' },
        { title: 'Similares', dataIndex: 'Similares', key: 'Similares' },
        { title: 'Material Peligroso', dataIndex: 'MaterialPeligroso', key: 'MaterialPeligroso' },
    ];

    return (
        <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                <Title level={3} style={{ margin: 0 }}>Catálogo de Artículos</Title>
            </div>

            <Table
                columns = { columns }
                dataSource = { articulos }
                rowKey="id"
                pagination={{ pageSize: 5 }}
            />
        </Card>
    );
};

export default Articulos;
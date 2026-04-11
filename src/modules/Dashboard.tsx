import React from 'react';
import { Row, Col, Card, Statistic } from 'antd';
import { InboxOutlined, RocketOutlined } from '@ant-design/icons';

const Dashboard: React.FC = () => {
    return (
        <div>
            <h2 style={{ marginBottom: 24 }}>Panel de Control - Paquetería</h2>
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} lg={6}>
                    <Card hoverable>
                        <Statistic title="Guías Hoy" value={0} prefix={<InboxOutlined />} />
                    </Card>
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card hoverable>
                        <Statistic title="En Tránsito" value={0} prefix={<RocketOutlined />} />
                    </Card>
                </Col>
                {/* Espacios para futuros indicadores de las 5 sucursales */}
                <Col xs={24} sm={12} lg={6}>
                    <Card loading title="Cargando datos..." />
                </Col>
                <Col xs={24} sm={12} lg={6}>
                    <Card loading title="Cargando datos..." />
                </Col>
            </Row>
        </div>
    );
};

export default Dashboard;
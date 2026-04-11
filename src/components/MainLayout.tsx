import React, { useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
    DashboardOutlined,
    InboxOutlined,
    TeamOutlined,
    SettingOutlined,
    LogoutOutlined,
    FolderOpenOutlined, // Icono para Catálogos
    CarOutlined,
    NodeIndexOutlined,
    BarcodeOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const menuItems = [
        { key: '/app/dashboard', icon: <DashboardOutlined />, label: 'Inicio' },
        { key: '/app/guias', icon: <InboxOutlined />, label: 'Guías/Paquetes' },
        { key: '/app/clientes', icon: <TeamOutlined />, label: 'Clientes' },
        { key: 'Catalogos', icon: <FolderOpenOutlined />, label: 'Catalogos',
            children: [
                { key: '/app/choferes', icon: <TeamOutlined />, label: 'Choferes' },
                { key: '/app/rutas', icon: <NodeIndexOutlined />, label: 'Rutas' },
                { key: '/app/articulos', icon: <BarcodeOutlined />, label: 'Artículos' },
                { key: '/app/camiones', icon: <CarOutlined />, label: 'Camiones' },
            ],},
        { key: '/configuracion', icon: <SettingOutlined />, label: 'Configuracion' },
        { key: '/login', icon: <LogoutOutlined />, label: 'Salir', danger: true },
    ];

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            >
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={menuItems}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
                    <div style={{ padding: 24, background: colorBgContainer, borderRadius: borderRadiusLG, minHeight: '80vh' }}>
                        <Outlet /> {/* Aquí se renderizarán las páginas de catálogos */}
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
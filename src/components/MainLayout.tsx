import React, { useMemo, useState } from 'react';
import { Layout, Menu, theme } from 'antd';
import {
    DashboardOutlined,
    InboxOutlined,
    TeamOutlined,
    SettingOutlined,
    LogoutOutlined,
    FolderOpenOutlined,
    NodeIndexOutlined,
    BarcodeOutlined, UserOutlined, FileProtectOutlined, ShopOutlined, TruckOutlined, ProfileOutlined
} from '@ant-design/icons';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from '@router/rutas';
import { PERMISOS } from '@router/permisos';
import { useAuthStore } from "@store/useAuthStore.ts";
import type { MenuProps } from 'antd';

const { Header, Content, Sider } = Layout;

// 1. Definición de tipos fuera del componente para mejor soporte de TS
type MenuItem = Required<MenuProps>['items'][number];

// Creamos un tipo que extiende el MenuItem de Ant Design con nuestra propiedad personalizada
type CustomMenuItem = MenuItem & {
    permission?: string;
    children?: CustomMenuItem[];
};

// 2. Función de filtrado extraída y tipada correctamente
const filterMenu = (items: CustomMenuItem[], hasPermission: (p: string) => boolean): MenuItem[] => {
    return items
        .filter((item) => {
            // Si no tiene propiedad permission, se permite
            if (!item?.permission) return true;
            return hasPermission(item.permission);
        })
        .map((item) => {
            if (item.children) {
                return {
                    ...item,
                    children: filterMenu(item.children, hasPermission)
                };
            }
            return item;
        })
        .filter((item) => {
            // Si el ítem tiene la propiedad children pero el arreglo está vacío, lo ocultamos
            if ('children' in item && Array.isArray(item.children) && item.children.length === 0) {
                return false;
            }
            return true;
        }) as MenuItem[]; // Cast final para que Ant Design lo acepte sin quejas
};

const MainLayout: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { token: { colorBgContainer, borderRadiusLG } } = theme.useToken();

    const hasPermission = useAuthStore((state) => state.hasPermission);

    // 3. Definición del menú usando el tipo personalizado
    const menuItems: CustomMenuItem[] = useMemo(() => [
        {
            key: ROUTES.DASHBOARD,
            icon: <DashboardOutlined />,
            label: 'Inicio',
            // Opcional: si el inicio es público, quita el permission
        },
        {
            key: ROUTES.CATALOGOS.GUIAS,
            icon: <InboxOutlined />,
            label: 'Guías/Paquetes',
            permission: PERMISOS.GUIAS.CONSULTA
        },
        {
            key: ROUTES.CATALOGOS.CLIENTES,
            icon: <TeamOutlined />,
            label: 'Clientes',
            permission: PERMISOS.CLIENTES.CONSULTA
        },
        {
            key: ROUTES.CATALOGOS.ASIGNACIONES,
            icon: <TruckOutlined />,
            label: 'Asignaciones',
            permission: PERMISOS.ASIGNACIONES.CONSULTA
        },
        {
            key: 'Guias',
            icon: <FolderOpenOutlined />,
            label: 'Guias',
            children: [
                {
                    key: ROUTES.CATALOGOS.GUIAS,
                    icon: <ProfileOutlined />,
                    label: 'Guias',
                    permission: PERMISOS.GUIAS.CONSULTA
                },
                {
                    key: ROUTES.CATALOGOS.GUIAS_ALTA,
                    icon: <ProfileOutlined />,
                    label: 'Nueva Guia',
                    permission: PERMISOS.GUIAS.CONSULTA
                },
            ],
        },
        {
            key: 'Catalogos',
            icon: <FolderOpenOutlined />,
            label: 'Catálogos',
            children: [
                {
                    key: ROUTES.CATALOGOS.ARTICULOS,
                    icon: <BarcodeOutlined />,
                    label: 'Artículos',
                    permission: PERMISOS.ARTICULOS.CONSULTA
                },
                {
                    key: ROUTES.CATALOGOS.CHOFERES,
                    icon: <TeamOutlined />,
                    label: 'Choferes',
                    permission: PERMISOS.CHOFERES.CONSULTA
                },
                {
                    key: ROUTES.CATALOGOS.RUTAS,
                    icon: <NodeIndexOutlined />,
                    label: 'Rutas',
                    permission: PERMISOS.RUTAS.CONSULTA
                },
                {
                    key: ROUTES.CATALOGOS.SUCURSALES,
                    icon: <ShopOutlined />,
                    label: 'Sucursales',
                    permission: PERMISOS.SUCURSALES.CONSULTA
                },
                {
                    key: ROUTES.CATALOGOS.SEGUROS,
                    icon: <FileProtectOutlined />,
                    label: 'Seguros',
                    permission: PERMISOS.SEGUROS.CONSULTA
                },
            ],
        },
        { key: ROUTES.USUARIOS, icon: <UserOutlined/>, label: 'Usuarios' },
        { key: '/configuracion', icon: <SettingOutlined />, label: 'Configuración' },
        { key: ROUTES.LOGIN, icon: <LogoutOutlined />, label: 'Salir', danger: true },
    ], []);

    // 4. Memorización del menú filtrado
    const authorizedMenu = useMemo(() => {
        return filterMenu(menuItems, hasPermission);
    }, [hasPermission, menuItems]);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0
                }}
            >
                <div style={{ height: 32, margin: 16, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 6 }} />
                <Menu
                    theme="dark"
                    mode="inline"
                    selectedKeys={[location.pathname]}
                    items={authorizedMenu}
                    onClick={({ key }) => navigate(key)}
                />
            </Sider>
            <Layout style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}>
                <Header style={{ padding: 0, background: colorBgContainer }} />
                <Content style={{ margin: '24px 16px', overflow: 'initial' }}>
                    <div style={{
                        padding: 24,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                        minHeight: '80vh'
                    }}>
                        <Outlet />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

export default MainLayout;
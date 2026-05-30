import { createBrowserRouter, Navigate } from 'react-router-dom';

import { ROUTES } from '@router/rutas'
import { PERMISOS } from '@router/permisos'
import { ProtectedRoute } from "@router/ProtectedRoute";

import MainLayout from '@components/MainLayout';
import Login from '@modules/Login';
import Dashboard from '@modules/Dashboard';
import Articulos from "@modules/catalogos/Articulos";
import Clientes from "@modules/catalogos/Clientes";
import UsuariosScreen from "@modules/Usuarios/Usuarios";
import ChoferScreen from "@modules/catalogos/Choferes";
import SucursalScreen from "@modules/catalogos/Sucursales";
import GuiasScreen from "@modules/Guias/GuiasScreen";

import { Unauthorized } from "@modules/Unauthorize";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/app/login" replace />,
    },
    {
        path: '/app/login',
        element: <Login />,
    },
    {
        path: '/app/unauthorized',
        element: <Unauthorized />,
    },
    {
        element: <MainLayout />,
        children: [
            {
                element: <ProtectedRoute />,
                children: [
                    {
                        path: ROUTES.DASHBOARD,
                        element: <Dashboard />,
                    },
                ]
            },
            {
                element: <ProtectedRoute requiredPermission = { PERMISOS.GUIAS.CONSULTA } />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.GUIAS,
                        element: <GuiasScreen />,
                    }
                ]
            },
            {
                element: <ProtectedRoute requiredPermission="asignaciones.consultar" />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.ASIGNACIONES,
                        element: <div>Módulo de Asignaciones (Próximamente)</div>,
                    }
                ]
            },
            {
                element: <ProtectedRoute requiredPermission="rutas.consultar" />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.RUTAS,
                        element: <div>Modulo de rutas</div>
                    }
                ]
            },
            {
                element: <ProtectedRoute requiredPermission="suguros.consultar" />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.SEGUROS,
                        element: <div>Modulo de Seguros</div>
                    }
                ]
            },
            {
                element: <ProtectedRoute requiredPermission="sucursales.consultar" />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.SUCURSALES,
                        element: <SucursalScreen />
                    }
                ]
            },
            {
                element: <ProtectedRoute requiredPermission="usuarios.consultar" />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.USUARIOS,
                        element: <UsuariosScreen />
                    }
                ]
            },
            {
                element: <ProtectedRoute requiredPermission="clientes.consultar" />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.CLIENTES,
                        element: <Clientes />,
                    }
                ],
            },
            {
                element: <ProtectedRoute requiredPermission="choferes.consultar" />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.CHOFERES,
                        element: <ChoferScreen />,
                    }
                ],
            },
            {
                element: <ProtectedRoute requiredPermission="articulos.consultar" />,
                children: [
                    {
                        path: ROUTES.CATALOGOS.ARTICULOS,
                        element: <Articulos />,
                    }
                ]
            },
        ],
    },
]);
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';

import Login from '../modules/Login';
import Dashboard from '../modules/Dashboard';
import Articulos from "../modules/catalogos/Articulos";
import Clientes from "../modules/catalogos/Clientes";
import UsuariosScreen from "../modules/Usuarios/Usuarios.tsx";
import ChoferScreen from "../modules/catalogos/Choferes.tsx";
import SucursalScreen from "../modules/catalogos/Sucursales.tsx";
import GuiasScreen from "../modules/Guias/GuiasScreen.tsx";

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
        path: '/app',
        element: <MainLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'guias',
                element: <GuiasScreen />,
            },
            {
                path: 'asignaciones',
                element: <div>Módulo de Asignaciones (Próximamente)</div>,
            },
            {
                path: 'rutas',
                element: <div>Modulo de rutas</div>
            },
            {
                path: 'seguros',
                element: <div>Modulo de Seguros</div>
            },
            {
                path: 'sucursales',
                element: <SucursalScreen />
            },
            {
                path: 'usuarios',
                element: <UsuariosScreen />
            },
            {
                path: 'clientes',
                element: <Clientes />,
            },
            {
                path: 'choferes',
                element: <ChoferScreen />,
            },
            {
                path: 'articulos',
                element: <Articulos />,
            },
        ],
    },
]);
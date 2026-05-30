import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@store/useAuthStore';

interface ProtectedRouteProps {
    requiredPermission?: string;
}

export const ProtectedRoute = ({ requiredPermission }: ProtectedRouteProps) => {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const isTokenActive = useAuthStore((state) => state.isTokenActive);
    const hasPermission = useAuthStore((state) => state.hasPermission);

    const isSessionActive = isAuthenticated && isTokenActive();

    if (!isSessionActive) {
        return <Navigate to="/app/login" replace />;
    }

    if (requiredPermission && !hasPermission(requiredPermission)) {
        return <Navigate to="/app/unauthorized" replace />;
    }

    return <Outlet />;
};
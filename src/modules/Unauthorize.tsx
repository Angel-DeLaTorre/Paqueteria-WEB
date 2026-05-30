import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../router/rutas.ts';

export const Unauthorized = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80vh', // Centra verticalmente en el espacio disponible de la pantalla
            backgroundColor: '#f5f5f5', // Un fondo gris tenue muy limpio
            padding: '24px',
            borderRadius: '8px'
        }}>
            <Result
                status="403"
                title="403"
                subTitle="Lo sentimos, no tienes autorización para acceder a este módulo."
                extra={
                    <Button
                        type="primary"
                        onClick={() => navigate(ROUTES.DASHBOARD)}
                    >
                        Volver al Inicio
                    </Button>
                }
            />
        </div>
    );
};
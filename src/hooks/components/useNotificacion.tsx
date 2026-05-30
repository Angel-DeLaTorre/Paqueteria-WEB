import { App } from 'antd';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationParams {
    type: NotificationType;
    message: string;
    description: string;
    errorCode?: string;
}

export const useNotification = () => {
    const { notification } = App.useApp();

    const showNotification = ({ type, message, description, errorCode }: NotificationParams) => {
        notification[type]({
            title: <span style={{ fontWeight: 600 }}>{message}</span>,
            placement: 'topRight',
            duration: 4.5,
            description: (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <span style={{ color: 'rgba(0, 0, 0, 0.65)' }}>{description}</span>
                    {errorCode && (
                        <span
                            style={{
                                color: '#8c8c8c',
                                fontSize: '11px',
                                fontFamily: 'monospace',
                                marginTop: '2px'
                            }}
                        >
                            {errorCode}
                        </span>
                    )}
                </div>
            ),
        });
    };

    return { showNotification };
};
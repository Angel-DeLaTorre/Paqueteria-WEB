import React from 'react';
import {Form, Modal, Row} from 'antd';
import type { FormInstance } from 'antd';

interface CatalogoModalProps
{
    title: string;
    open: boolean;
    onCancel: () => void;
    onSave: () => void;
    loading?: boolean;
    form: FormInstance; // Pasamos la instancia del form para que el Modal sepa qué enviar
    children: React.ReactNode; // Aquí irá el contenido específico (Inputs, Selects, etc.)
    width?: number | string;
}

export const CatalogoModal: React.FC<CatalogoModalProps> = (
    {
        title,
        open,
        onCancel,
        onSave,
        loading = false,
        form,
        children,
        width = 1000, // Tamaño estándar para catálogos
    }) => {
    return (
        <Modal
            title={
                <div style={{ marginBottom: '10px', fontSize: '1.2rem', borderBottom: '1px solid #f0f0f0', paddingBottom: '10px' }}>
                    {title}
                </div>
            }
            open = { open }
            onCancel = { onCancel }
            onOk = { onSave }
            confirmLoading = { loading }
            width = { width }
            destroyOnHidden // Limpia el estado interno al cerrar
            okText = "Guardar"
            cancelText = "Cancelar"
            styles={{
                body: {
                    maxHeight: '65vh', // Ocupa máximo el 65% de la altura de la ventana
                    overflowY: 'auto', // Habilita el scroll vertical
                    overflowX: 'hidden', // Evita scroll horizontal innecesario
                    padding: '10px 24px', // Un poco de espacio para que el scroll no pegue a los inputs
                }
            }}
        >
            <Form
                form = { form }
                layout = "vertical"
                preserve = { false }
                style={{ marginTop: '20px' }}
            >
                <Row gutter={[16, 0]}>
                    { children }
                </Row>
            </Form>
        </Modal>
    );
};
import React from 'react';
import {Form, Modal} from 'antd';
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
        width = 600, // Tamaño estándar para catálogos
    }) => {
    return (
        <Modal
            title={title}
            open={open}
            onCancel={onCancel}
            onOk={onSave} // Ejecuta la función de guardado
            confirmLoading={loading}
            width={width}
            destroyOnHidden // Limpia el estado interno al cerrar
            okText="Guardar"
            cancelText="Cancelar"
        >
            <Form
                form = { form }
                layout = "vertical"
                preserve = { false }
            >
                {children}
            </Form>
        </Modal>
    );
};
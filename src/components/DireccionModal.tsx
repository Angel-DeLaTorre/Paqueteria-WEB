import React, { useEffect } from 'react';
import { Form, Input, Col, Divider, Select, type FormInstance } from 'antd';
import { useMunicipio } from "@hooks";
import { ESTADOS_MEXICO } from "@constants/Estados";

interface DireccionFormFieldsProps {
    form: FormInstance;
    fieldName?: string;
}

export const DireccionFormFields: React.FC<DireccionFormFieldsProps> = (
    {
        form,
        fieldName = 'direccion'
    }) =>
{
    // Observamos el idEstado dentro del objeto 'direccion'
    const estadoId = Form.useWatch([fieldName, 'idEstado'], form);
    const { municipios, fetchMunicipiosByEstado, loading : loadMunicipios, setMunicipios } = useMunicipio();

    // Envolvemos la carga en un efecto controlado
    useEffect(() => {
        let isSubscribed = true;

        const loadMunicipios = async () => {
            if (estadoId) {
                try {
                    // Manejamos la promesa explícitamente
                    await fetchMunicipiosByEstado(estadoId);

                    if (isSubscribed) {
                        form.setFieldValue([fieldName, 'municipioId'], undefined);
                    }
                } catch (error) {
                    console.error("Error al cargar municipios:", error);
                }
            } else {
                if (setMunicipios) setMunicipios([]);
            }
        };
        void loadMunicipios();
        return () => {
            isSubscribed = false;
        };
    }, [estadoId, form, fetchMunicipiosByEstado, setMunicipios, fieldName]);

    return (
        <>
            <Col span={24}>
                <Divider orientation="horizontal" plain>Dirección</Divider>
            </Col>

            <Col span={12}>
                <Form.Item name={[fieldName, 'calle']} label="Calle">
                    <Input placeholder="Calle" />
                </Form.Item>
            </Col>

            <Col span={12}>
                <Form.Item name={[fieldName, 'colonia']} label="Colonia">
                    <Input placeholder="Colonia o zona" />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item name={[fieldName, 'numeroExterior']} label="Número Exterior">
                    <Input placeholder="Ext." />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item name={[fieldName, 'numeroInterior']} label="Número Interior">
                    <Input placeholder="Int." />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item name={[fieldName, 'codigoPostal']} label="C.P.">
                    <Input placeholder="Código Postal" />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item
                    name={[fieldName, 'idEstado']}
                    label="Estado"
                    rules={[{ required: true, message: 'Requerido' }]}
                >
                    <Select
                        placeholder = "Estado"
                        options={ESTADOS_MEXICO.map(e => ({
                            value: e.estadoId,
                            label: `${e.nombre} (${e.estadoId})`
                        }))}
                        showSearch={{
                            filterOption: (input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }}
                    />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item
                    name={[fieldName, 'municipioId']}
                    label="Municipio / Ciudad"
                    rules={[{ required: true, message: 'El municipio es obligatorio' }]}
                >
                    <Select
                        showSearch = {{
                            filterOption : (input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                        }}
                        placeholder = { estadoId ? "Seleccione un municipio" : "Primero elija un estado" }
                        disabled = { !estadoId }
                        loading = { loadMunicipios }
                        options={municipios.map(m => ({
                            value: m.municipioId,
                            label: m.nombre
                        }))}
                    />
                </Form.Item>
            </Col>

            <Col span={8}>
                <Form.Item name={[fieldName, 'localidad']} label="Localidad">
                    <Input placeholder="Localidad" />
                </Form.Item>
            </Col>
        </>
    );
};
import React from 'react';
import {
    Form,
    Input,
    InputNumber,
    Select,
    Switch,
    Button,
    Card,
    Row,
    Col,
    Popconfirm,
    Space,
} from 'antd';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';

interface ArticulosFormListProps {
    // Puedes pasar catálogos desde el padre o consumirlos internamente
    catSatProdServ?: { label: string; value: string }[];
    catSatUnidad?: { label: string; value: string }[];
    catSatEmbalaje?: { label: string; value: string }[];
}

export const ArticulosFormList: React.FC<ArticulosFormListProps> = ({
                                                                        catSatProdServ = [],
                                                                        catSatUnidad = [],
                                                                        catSatEmbalaje = [],
                                                                    }) => {
    return (
        <Form.List
            name="articulosGuia"
            rules={[
                {
                    validator: async (_, articulos) => {
                        if (!articulos || articulos.length < 1) {
                            return Promise.reject(new Error('Debe agregar al menos un artículo a la guía.'));
                        }
                    },
                },
            ]}
        >
            {(fields, { add, remove }, { errors }) => (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {fields.map(({ key, name, ...restField }, index) => (
                        <Card
                            key={key}
                            size="small"
                            title={`Artículo #${index + 1}`}
                            extra={
                                <Popconfirm
                                    title="¿Eliminar este artículo?"
                                    onConfirm={() => remove(name)}
                                    okText="Sí"
                                    cancelText="No"
                                >
                                    <Button type="text" danger icon={<DeleteOutlined />}>
                                        Eliminar
                                    </Button>
                                </Popconfirm>
                            }
                            style={{ backgroundColor: '#fafafa', borderColor: '#d9d9d9' }}
                        >
                            <Row gutter={[12, 0]}>
                                {/* --- SECCIÓN 1: DATOS SAT --- */}
                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'claveProdServSat']}
                                        label="Clave Prod/Serv SAT"
                                        rules={[{ required: true, message: 'Requerido' }]}
                                    >
                                        <Select
                                            placeholder="Seleccione clave"
                                            options={catSatProdServ}
                                            showSearch={{
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'claveUnidadSat']}
                                        label="Clave Unidad SAT"
                                        rules={[{ required: true, message: 'Requerido' }]}
                                    >
                                        <Select
                                            placeholder="Seleccione unidad"
                                            options={catSatUnidad}
                                            showSearch={{
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} sm={12} md={8}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'claveTipoEmbalajeSat']}
                                        label="Tipo Embalaje SAT (Opcional)"
                                    >
                                        <Select
                                            allowClear
                                            placeholder="Seleccione embalaje"
                                            options={catSatEmbalaje}
                                            showSearch={{
                                                filterOption: (input, option) =>
                                                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase()),
                                            }}
                                        />
                                    </Form.Item>
                                </Col>

                                {/* --- SECCIÓN 2: DESCRIPCIÓN Y CANTIDADES --- */}
                                <Col xs={24} sm={16} md={16}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'descripcion']}
                                        label="Descripción"
                                        rules={[{ required: true, message: 'Ingrese la descripción' }]}
                                    >
                                        <Input placeholder="Descripción detallada de la mercancía" />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={8} md={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'cantidad']}
                                        label="Cantidad"
                                        initialValue={1}
                                        rules={[{ required: true, message: 'Requerido' }]}
                                    >
                                        <InputNumber style={{ width: '100%' }} min={1} />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={8} md={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'valorUnidad']}
                                        label="Valor Unidad"
                                        initialValue={0}
                                        rules={[{ required: true, message: 'Requerido' }]}
                                    >
                                        <InputNumber style={{ width: '100%' }} prefix="$" min={0} precision={2} />
                                    </Form.Item>
                                </Col>

                                {/* --- SECCIÓN 3: PESO Y DIMENSIONES --- */}
                                <Col xs={12} sm={8} md={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'pesoUnitarioKg']}
                                        label="Peso Unit. (kg)"
                                        initialValue={0.1}
                                        rules={[{ required: true, message: 'Requerido' }]}
                                    >
                                        <InputNumber style={{ width: '100%' }} min={0.001} step={0.1} precision={3} />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={8} md={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'largo']}
                                        label="Largo (cm)"
                                        initialValue={0}
                                    >
                                        <InputNumber style={{ width: '100%' }} min={0} precision={2} />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={8} md={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'ancho']}
                                        label="Ancho (cm)"
                                        initialValue={0}
                                    >
                                        <InputNumber style={{ width: '100%' }} min={0} precision={2} />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={8} md={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'alto']}
                                        label="Alto (cm)"
                                        initialValue={0}
                                    >
                                        <InputNumber style={{ width: '100%' }} min={0} precision={2} />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={8} md={4}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'volumen']}
                                        label="Volumen (cm)"
                                        initialValue={0}
                                    >
                                        <InputNumber style={{ width: '100%' }} min={0} precision={2} />
                                    </Form.Item>
                                </Col>

                                {/* --- SECCIÓN 4: BANDERAS --- */}
                                <Col xs={24} sm={8} md={8} style={{ display: 'flex', alignItems: 'center' }}>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'esMaterialPeligroso']}
                                        valuePropName="checked"
                                        initialValue={false}
                                        style={{ marginBottom: 0 }}
                                    >
                                        <Space style={{ marginTop: '8px' }}>
                                            <Switch />
                                            <span style={{ fontSize: '13px' }}>¿Es Material Peligroso?</span>
                                        </Space>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Card>
                    ))}

                    <Button
                        type="dashed"
                        onClick={() =>
                            add({
                                cantidad: 1,
                                pesoUnitarioKg: 0.1,
                                valorUnidad: 0,
                                largo: 0,
                                ancho: 0,
                                alto: 0,
                                esMaterialPeligroso: false,
                            })
                        }
                        block
                        icon={<PlusOutlined />}
                        style={{ height: '40px' }}
                    >
                        Agregar Artículo
                    </Button>

                    <Form.ErrorList errors={errors} />
                </div>
            )}
        </Form.List>
    );
};
import AxiosClient from '@/apis/AxiosClient';
import SaveButton from '@/components/Button/Save.Button';
import CardComponent from '@/components/CardComponent';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import LoadingComponent from '@/components/Loading';
import TopBar from '@/components/TopBar';
import UploadComponent from '@/components/Upload';
import Container from '@/layout/Container';
import rules from '@/rules/rules';
import { Notification } from '@/utils';
import { Col, Form, Input, InputNumber, Row, Select } from 'antd';
import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import NewsEditor from '../components/Editor';

const FormProductPage = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { id } = useParams();

    const [categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const statusCurrent = React.useRef<any>(null);

    const [form] = Form.useForm();

    const fileEdit = React.useRef<any>(null);
    const refContent = React.useRef<any>(null);
    const refAttribute = React.useRef<any>(null);
    const handleSubmit = (values: any) => {
        setLoading(true);

        const dataSend = {
            ...values,
            file: values?.file
                ? values?.file?.filter((file: any) => file?.originFileObj)?.map((file: any) => file.originFileObj)
                : '',
            old_image: values?.file
                ?.filter((file: any) => file?.url)
                ?.map((file: any) => file.url)
                ?.join(','),
            price: values?.price ? values?.price : '',
        };

        const formData = new FormData();
        Object.keys(dataSend).forEach((key) => {
            if (key === 'file') {
                dataSend[key].forEach((file: any) => {
                    formData.append(key, file);
                });
            } else {
                formData.append(key, dataSend[key] || '');
            }
        });

        if (id) {
            AxiosClient.patch('/product/' + id, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((data) => {
                    Notification('success', 'Cập nhật thành công');
                    navigate(location?.state?.prevUrl || -1, { state: location.state });
                })
                .finally(() => setLoading(false));
        } else {
            AxiosClient.post('/product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((data) => {
                    console.log('🚀 ~ handleSubmit ~ data:', data);
                    Notification('success', 'Thêm thành công');
                    navigate(location?.state?.prevUrl || -1, { state: location.state });
                })
                .finally(() => setLoading(false));
        }
    };

    React.useEffect(() => {
        AxiosClient.get('/category', {
            params: {
                limit: 100,
                page: 1,
            },
        }).then((response) => {
            setCategories(response.data);
        });
    }, []);

    const handleCallbackContent = React.useCallback((description: string) => {
        form.setFieldsValue({ description });
    }, []);

    const handleCallbackAttribute = React.useCallback((attribute: string) => {
        form.setFieldsValue({ attribute });
    }, []);

    React.useEffect(() => {
        if (!id) return;
        AxiosClient.get('/product/' + id).then((res: any) => {
            console.log(
                'data',
                res.images.split(',').map((image: any) => {
                    return {
                        url: image,
                        uid: image,
                        name: 'img voucher',
                    };
                })
            );
            if (res) {
                form.setFieldsValue({
                    name: res?.name,
                    category_id: res?.category_id,
                    price: res?.price,
                    attribute: res?.attribute,
                    description: res?.description,
                    file: res.images.split(',').map((image: any) => {
                        return {
                            url: image,
                            uid: image,
                            name: 'img voucher',
                        };
                    }),
                });

                fileEdit.current = res.images.split(',').map((image: any) => {
                    return {
                        url: image,
                        uid: image,
                        name: 'img voucher',
                    };
                });
                refContent.current = res?.description == 'null' ? '' : res?.description;
                refAttribute.current = res?.attribute;
            }
        });
    }, [id]);

    return (
        <FormComponent form={form} onSubmit={handleSubmit}>
            <TopBar
                back
                title={id ? `Cập nhật xe` : 'Thêm mới xe'}
                extra={[<SaveButton key="saveNew" htmlType="submit" />]}
            />
            <Container>
                <CardComponent>
                    <Row>
                        {/* col bên trái */}
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng nhập tên xe!')]}
                                    name="name"
                                    label="Tên xe"
                                    inputField={<Input placeholder="Nhập tên xe" />}
                                />
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng chọn hãng xe!')]}
                                    name="category_id"
                                    label="Hãng xe"
                                    inputField={
                                        <Select placeholder="Chọn hãng xe">
                                            {categories.map((item: any) => {
                                                return (
                                                    <Select.Option key={item.id} value={item.id}>
                                                        {item.name}
                                                    </Select.Option>
                                                );
                                            })}
                                        </Select>
                                    }
                                />
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng chọn ảnh xe!')]}
                                    name="file"
                                    label={<div>Ảnh sản phẩm</div>}
                                    inputField={
                                        <UploadComponent
                                            // isUploadServerWhenUploading
                                            accept=".png, .jpg, .jpeg"
                                            initialFile={fileEdit.current}
                                            uploadType="list"
                                            listType="picture-card"
                                            maxLength={5}
                                            onSuccessUpload={(url: any) => {
                                                form.setFieldsValue({
                                                    file: url,
                                                });
                                            }}
                                        >
                                            Tải lên
                                        </UploadComponent>
                                    }
                                />
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} lg={12}>
                            <Row>
                                <FormItemComponent
                                    rules={[rules.required('Vui lòng nhập giá xe!')]}
                                    name="price"
                                    label="Giá xe"
                                    inputField={
                                        <InputNumber
                                            min={1}
                                            style={{ width: '100%' }}
                                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                            parser={(value: any) => (value ? value.replace(/[^0-9]/g, '') : '')}
                                            placeholder="Nhập giá xe"
                                            addonAfter="VND"
                                        />
                                    }
                                />
                            </Row>
                        </Col>
                        <Col xs={24} sm={24} lg={24}>
                            <div>
                                <p>Thuộc tính</p>
                                <Form.Item wrapperCol={{ span: 24 }} name="attribute">
                                    <NewsEditor
                                        height={400}
                                        handleCallbackContent={handleCallbackAttribute}
                                        handleCallbackContentNotDebounce={() => { }}
                                        refContent={refAttribute.current}
                                    />
                                </Form.Item>
                            </div>
                        </Col>
                    </Row>

                    <div>
                        <p>Nội dung tin tức</p>
                        <Form.Item wrapperCol={{ span: 24 }} name="description">
                            <NewsEditor
                                handleCallbackContent={handleCallbackContent}
                                handleCallbackContentNotDebounce={() => { }}
                                refContent={refContent.current}
                            />
                        </Form.Item>
                    </div>
                </CardComponent>
            </Container>
            {loading && <LoadingComponent />}
        </FormComponent>
    );
};

export default FormProductPage;

import AxiosClient from '@/apis/AxiosClient';
import SaveButton from '@/components/Button/Save.Button';
import FormComponent from '@/components/FormComponent';
import FormItemComponent from '@/components/FormComponent/FormItemComponent';
import ModalComponent from '@/components/ModalComponent';
import UploadComponent from '@/components/Upload';
import rules from '@/rules/rules';
import { Notification, uuid, wait } from '@/utils';
import { Button, Col, Form, Input, Row, Select, Space } from 'antd';
import React from 'react';
const { Option } = Select;

const initialValue = {
    name: '',
    icon: '',
};

const CategoryFormPage = ({
    values,
    modalVisible,
    handleCloseForm,
}: {
    values?: any | null;
    modalVisible: boolean;
    handleCloseForm: any;
}) => {
    const [form] = Form.useForm();
    const [file, setFile] = React.useState<any>(null);
    const [loadingModal, setLoadingModal] = React.useState(false);

    const formReset = () => {
        form.setFieldsValue(initialValue);
    };
    React.useEffect(() => {
        if (values) {
            setLoadingModal(true);
            form.setFieldsValue({ ...values, icon: values.logo });
            wait(500).then(() => setLoadingModal(false));
        }
    }, [values]);
    const handleSubmit = React.useCallback(
        async (data: any) => {
            setLoadingModal(true);
            const dataSend = {
                ...data,
                icon: data?.icon?.originFileObj || data.icon,
            };

            const formData = new FormData();
            Object.keys(dataSend).forEach((key) => {
                formData.append(key, dataSend[key]);
            });

            if (values?.id) {
                const res: any = await AxiosClient.patch(`/category/${values?.id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (!res?.code) {
                    Notification('success', 'Cập nhật hãng xe thành công');
                    handleCloseForm();
                    formReset();
                }
            } else {
                const res: any = await AxiosClient.post('/category', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                if (!res?.code) {
                    Notification('success', 'Thêm hãng xe thành công');
                    handleCloseForm();
                    formReset();
                }
            }
            setLoadingModal(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [values, file]
    );

    return (
        <ModalComponent
            title={values ? 'Cập nhật hãng xe' : 'Thêm hãng xe'}
            modalVisible={modalVisible}
            loading={loadingModal}
            width={600}
        >
            <FormComponent layoutType="vertical" form={form} onSubmit={handleSubmit}>
                <Row style={{ flexDirection: 'row' }} gutter={[20, 0]}>
                    <Col span={24}>
                        <Row>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng nhập tên !')]}
                                name="name"
                                label="Tên hãng xe"
                                inputField={<Input placeholder="Nhập tên hãng xe" />}
                            />
                        </Row>
                    </Col>

                    <Col span={24}>
                        <Row>
                            <FormItemComponent
                                rules={[rules.required('Vui lòng chọn ảnh !')]}
                                label="Ảnh danh mục"
                                name="icon"
                                inputField={
                                    <UploadComponent
                                        accept=".png, .jpg, .jpeg"
                                        uploadType="single"
                                        listType="picture-card"
                                        maxLength={1}
                                        onSuccessUpload={(file: any) => {
                                            setFile(file);
                                            form.setFieldsValue({ icon: file });
                                        }}
                                        isShowFileList
                                        initialFile={values?.logo && [{ url: values?.logo, uid: uuid(), name: 'icon' }]}
                                    />
                                }
                            />
                        </Row>
                    </Col>
                </Row>
                <Row style={{ width: '100%' }} align="bottom">
                    <Space>
                        <Button
                            type="default"
                            onClick={() => {
                                handleCloseForm('notRefresh');
                                formReset();
                            }}
                        >
                            Đóng
                        </Button>
                        <SaveButton htmlType="submit" />
                    </Space>
                </Row>
            </FormComponent>
        </ModalComponent>
    );
};

export default CategoryFormPage;

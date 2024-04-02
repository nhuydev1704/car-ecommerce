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
            form.setFieldsValue({ ...values });
            wait(500).then(() => setLoadingModal(false));
        }
    }, [values]);
    const handleSubmit = React.useCallback(
        async (data: any) => {
            setLoadingModal(true);
            const dataSend = {
                ...data,
                icon: data.icon.originFileObj,
            };

            const formData = new FormData();
            Object.keys(dataSend).forEach((key) => {
                formData.append(key, dataSend[key]);
            });

            if (values) {
                // const res = await accountService.update(values.id, {
                //     ...rest,
                //     fullName: data.fullName?.trim(),
                //     email: data.email?.trim(),
                //     role: data.group,
                //     avatar:
                //         file ||
                //         values?.avatar ||
                //         'https://res.cloudinary.com/hunre/image/upload/v1676274313/user_ljdkgx.png',
                //     status: !!data.status,
                //     isRoot: true,
                // });
                // if (res.status) {
                //     Notification('success', 'Cập nhật tài khoản thành công');
                //     handleCloseForm();
                //     formReset();
                // }
            } else {
                const res = await AxiosClient.post('/category', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('🚀 ~ res:', res);
                // if (res.status) {
                //     Notification('success', 'Thêm tài khoản thành công');
                //     handleCloseForm();
                //     formReset();
                // }
            }
            setLoadingModal(false);
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [values, file]
    );

    return (
        <ModalComponent
            title={values ? 'Cập nhật danh mục' : 'Thêm danh mục'}
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
                                label="Tên danh mục"
                                inputField={<Input placeholder="Nhập tên danh mục" />}
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
                                        initialFile={values?.icon && [{ url: values?.icon, uid: uuid(), name: 'icon' }]}
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

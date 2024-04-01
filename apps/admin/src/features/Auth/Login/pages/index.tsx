import AxiosClient from '@/apis/AxiosClient';
import LocalStorage from '@/apis/LocalStorage';
import { Notification } from '@/utils';
import { Button, Checkbox, Form, Input, Row } from 'antd';
import React from 'react';
import Wrapper from '../../Wrapper';
import InfoLogin from '../components/InfoLogin';

const LoginPage = () => {
    const [loading, setLoading] = React.useState(false);

    const handleSubmit = async (value: { username: string; password: string }) => {
        setLoading(true);

        AxiosClient.post('/auth/login', value)
            .then((res: any) => {
                LocalStorage.setToken(res.tokens.access.access);
                window.location.reload();
                Notification('success', 'Đăng nhập thành công');
            })
            .finally(() => setLoading(false));
    };

    return (
        <div style={{ height: '100vh', width: '100vw' }}>
            <div className="gx-app-login-wrap">
                <div className="gx-app-login-container">
                    <Wrapper loading={loading}>
                        <div className="gx-app-login-main-content">
                            <InfoLogin />
                            <div className="gx-app-login-content">
                                <Form onFinish={handleSubmit} className="gx-signin-form gx-form-row">
                                    <Form.Item
                                        name="username"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng tài khoản',
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Nhập tài khoản" />
                                    </Form.Item>
                                    <Form.Item
                                        className="gx-mb-1"
                                        name="password"
                                        rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
                                    >
                                        <Input.Password type="password" placeholder="Nhập mật khẩu" />
                                    </Form.Item>
                                    <Row justify="end">
                                        <Form.Item className="gx-m-0" initialValue={true}>
                                            <Checkbox checked>Nhớ mật khẩu</Checkbox>
                                        </Form.Item>
                                    </Row>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit" className="gx-mb-0">
                                            Đăng nhập
                                        </Button>
                                        {/* <span>hoặc </span>
                                        <Link to={routerPage.register}>Đăng ký</Link> */}
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                    </Wrapper>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;

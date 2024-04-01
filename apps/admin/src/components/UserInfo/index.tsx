import { Avatar, Popover, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import React from 'react';
import LocalStorage from '@/apis/LocalStorage';

const UserInfo = () => {
    const userMenuOptions = (
        <ul className="gx-user-popover">
            {/* <li>My Account</li> */}
            <li
                onClick={() => {
                    LocalStorage.removeToken();
                    window.location.reload();
                }}
            >
                Logout
            </li>
        </ul>
    );
    return (
        <Row wrap={false} justify="start" className="gx-avatar-row gx-m-0">
            <Popover placement="bottomRight" content={userMenuOptions} trigger="click">
                <Avatar
                    className="gx-size-40 gx-pointer gx-mr-3"
                    style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    }}
                    alt=""
                >
                    Admin
                </Avatar>
                <span className="gx-avatar-name">
                    Admin
                    <DownOutlined className="gx-fs-sm gx-ml-4" />
                </span>
            </Popover>
        </Row>
    );
};

export default UserInfo;

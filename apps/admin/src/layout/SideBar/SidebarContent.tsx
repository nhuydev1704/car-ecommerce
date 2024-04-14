import CustomScrollbars from '@/components/CustomScrollbars';
import UserInfo from '@/components/UserInfo';
import { MenuFoldOutlined, MenuUnfoldOutlined, NotificationOutlined } from '@ant-design/icons';
import { Menu, Row } from 'antd';
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { items } from './Sidebar.Menu';
import icon from './icon.png';

const SidebarContent = ({
    collapsed,
    handleCallbackCollapsed,
}: {
    collapsed?: boolean;
    handleCallbackCollapsed?: () => void;
}) => {
    const location = useLocation();
    const navigate = useNavigate();

    const selectedKeys = location.pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1] || 'dashboard';

    return (
        <>
            <Row
                align="middle"
                className="gx-m-0 gx-layout-sider-header"
                style={{ background: '#BB0D0D', padding: '0 30px 0 70px' }}
            >
                {!collapsed && (
                    <Link
                        className="gx-d-flex gx-pointer"
                        to="/"
                        style={{
                            justifyContent: 'center',
                            width: '100%',
                        }}
                    >
                        <img height="72px" alt="" src={icon} />
                    </Link>
                )}
                <div className="gx-linebar" onClick={handleCallbackCollapsed}>
                    {collapsed ? (
                        <MenuUnfoldOutlined className="gx-icon-btn" />
                    ) : (
                        <MenuFoldOutlined className="gx-icon-btn" />
                    )}
                </div>
            </Row>
            <div className="gx-sidebar-content">
                {/* top sidebar */}
                <div className="gx-sidebar-notifications" style={{ paddingTop: '20px' }}>
                    {/* user info */}
                    <UserInfo />
                    {/* menu action */}
                    {/* <ul className="gx-app-nav gx-mt-4">
                        <li>
                            <NotificationOutlined />
                        </li>
                        <li>
                            <NotificationOutlined />
                        </li>
                        <li>
                            <NotificationOutlined />
                        </li>
                    </ul> */}
                </div>
                {/* sidebar menu */}
                <CustomScrollbars className="gx-layout-sider-scrollbar">
                    <div className="gx-menu-group">
                        <MenuStyled
                            defaultOpenKeys={[defaultOpenKeys]}
                            selectedKeys={[selectedKeys]}
                            theme="dark"
                            mode="inline"
                            items={items}
                            onClick={(e) => navigate('/' + e.key)}
                        />
                    </div>
                </CustomScrollbars>
            </div>
        </>
    );
};

const MenuStyled = styled(Menu)`
    * {
        font-weight: 600;
    }
`;

export default React.memo(SidebarContent);

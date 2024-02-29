// This is the layout component that wraps around all the pages

import React from 'react';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { EnvironmentOutlined, UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { UserAddOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const { Header, Content, Footer } = Layout;

const items = [
    {
        key: '/home',
        icon: <VideoCameraOutlined />,
        label: 'Home'
    },
    {
        key: '/user',
        icon: <UserOutlined />,
        label: 'User'
    },
    {
        key: '/plant',
        icon: <EnvironmentOutlined />,
        label: 'Plant'
    },
    {
        key: '/upload',
        icon: <UploadOutlined />,
        label: 'Upload'
    },
    {
        key: '/signup',
        icon: <UserAddOutlined />,
        label: 'Signup'
    }
]

const MainLayout = () => {

    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    // Get the current location
    // When the page is loaded, the menu item of the current page is highlighted
    const location = useLocation()
    // Get the key of the current location
    const selectedKey = location.pathname

    // It is used for the display of breadcrumb
    const pathnames = location.pathname.split('/').filter(x => x);

    // Use the navigate hook to navigate to the clicked menu item
    const navigate = useNavigate()
    const onMenuClick = (item) => {
        console.log("Menu is clicked", item)
        navigate(item.key)
    }

    return (
        <Layout>
            {/* Header */}
            <Header
                style={{
                    position: 'sticky',
                    top: 0,
                    zIndex: 1,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div className="demo-logo" />
                {/* Top nav buttons */}
                <Menu
                    theme="dark"
                    mode="horizontal"
                    selectedKeys={selectedKey}
                    items={items}
                    style={{
                        flex: 1,
                        minWidth: 0,
                    }}
                    // Get the key of the clicked menu item
                    onClick={onMenuClick}
                />
            </Header>

            {/* Content area */}
            <Content
                style={{
                    padding: '0 48px',
                }}
            >
                {/* Breadcrumb */}
                <Breadcrumb style={{ margin: '16px 0' }}>
                    {/* Make sure it always displays 'Home' */}
                    {!pathnames.includes('home') && (
                        <Breadcrumb.Item key="home">
                            <Link to="/home">
                                Home
                            </Link>
                        </Breadcrumb.Item>
                    )}
                    {/* Render the following Breadcrumb Item based on pathnames */}
                    {pathnames.map((value, index) => {
                        // Capitalize the first letter of the path name
                        const capitalizedValue = value.charAt(0).toUpperCase() + value.slice(1);
                        const to = `/${pathnames.slice(0, index + 1).join('/')}`;

                        return (
                            <Breadcrumb.Item key={to}>
                                <Link to={to}>
                                    {capitalizedValue}
                                </Link>
                            </Breadcrumb.Item>
                        );
                    })}
                </Breadcrumb>

                {/* Route page Content */}
                <div
                    style={{
                        padding: 24,
                        minHeight: 380,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet />
                </div>
            </Content>

            {/* Footer */}
            <Footer
                style={{
                    textAlign: 'center',
                }}
            >
                Ant Design ©{new Date().getFullYear()} Created by Ant UED
            </Footer>
        </Layout>
    );
};

export default MainLayout;
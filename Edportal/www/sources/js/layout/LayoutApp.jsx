import { FloatButton, Layout, theme } from 'antd';
import LeftMenu from '../components/LeftMenu';
import RightMenu from '../components/RightMenu';
import React, {useEffect} from 'react';
import { Outlet } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

const { Header, Content, Sider } = Layout;

const LayoutApp = ({ children, ...props }) => {
    return (
        <Layout className='min-h-screen'>
            <Header className="header d-flex justify-content-between" style={{ background: 'rgb(0,33,64)' }}>
                <div className='header-left' style={{ color: "white", fontSize: '40px', display: 'flex', alignItems: "center" }}>
                    <img src="" width="150" className="img-fluid py-4" alt="Logo" />
                </div>
                <RightMenu />
            </Header>
            <Layout>
                <LeftMenu />
                <Layout id="lay-out-app" style={{
                    padding: '20px',
                    maxHeight: "calc(100vh - 64px)",
                    overflowY: "auto"
                }}>
                    <Content className="content flex-grow-1">
                        <Outlet />
                        <FloatButton.BackTop 
                            visibilityHeight={100} 
                            className="brother-button-back" 
                            target={() => document.getElementById('lay-out-app')} 
                        />
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
};

export default LayoutApp;

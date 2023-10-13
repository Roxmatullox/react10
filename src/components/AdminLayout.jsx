import  { useState } from 'react';

import   "./AdminLayout.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme, Modal } from 'antd';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
const { Header, Sider, Content } = Layout;
const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const location = useLocation()

  const navigate = useNavigate()

  const logout = () =>{
    Modal.confirm({
      title: 'Confirm',
      onOk : ()=>{
        navigate("/")
        localStorage.removeItem("Login")
      }
    });
  }

  return (
    <Layout>
      <Sider className='admin-aside' trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[location.pathname]}
          items={[
            {
              key: '/teachers',
              icon: <UserOutlined />,
              label: <NavLink to="/teachers" >Teachers</NavLink>,
            },
            {
              key: '/students',
              icon: <UserOutlined />,
              label: <NavLink to="/students" >Students</NavLink>,
            },
            {
              key: '4',
              label: <Button onClick={logout} >Logout</Button>,
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
          className='admin-main'
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminLayout;
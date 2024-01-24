import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { AiOutlineBgColors, AiOutlineDashboard, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai";
import { BsCartPlus } from "react-icons/bs";
import { CiViewList } from "react-icons/ci";
import { SiBrandfolder } from "react-icons/si";
import { BiCategoryAlt, BiFontSize } from "react-icons/bi";
import { FaClipboardList } from "react-icons/fa6";
import { FaBlogger } from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { IoIosNotifications } from "react-icons/io";
import { Layout, Menu, Button, theme } from 'antd';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';
const { Header, Sider, Content } = Layout;
const MainLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { updateUser } = useUser();
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const { user } = useUser();
  useEffect(() => {
    // Sử dụng thông tin người dùng (ở đây lấy username)
    const storedUsername = localStorage.getItem('fullname');

    // Set thông tin người dùng vào UserContext (hoặc thực hiện các công việc khác)
    updateUser({ fullname: storedUsername, token: localStorage.getItem('accessToken') });

    // ... Các công việc khác sau khi có thông tin người dùng
  }, []);
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h2 className='text-white fs-5 text-center py-2 mb-0'>
            <a href='/admin'><span className='sm-logo'>AD</span>
            <span className='lg-logo'>Admin</span></a>
          </h2>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['']}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: '',
              icon: <AiOutlineDashboard className='fs-4' />,
              label: 'Dashboard',
            },
            {
              key: 'customers',
              icon: <AiOutlineUser className='fs-4' />,
              label: 'Customers',
            },
            {
              key: 'Product Management',
              icon: <AiOutlineShoppingCart className='fs-4' />,
              label: 'Product Management',
              children: [
                {
                  key: 'add-clothes',
                  icon: <BsCartPlus className='fs-4' />,
                  label: 'Add Clothes',
                },
                {
                  key: 'product',
                  icon: <CiViewList className='fs-4' />,
                  label: 'Product List',
                },
                {
                  key: 'image-list',
                  icon: <SiBrandfolder className='fs-4' />,
                  label: 'Image List',
                },
                {
                  key: 'category-list',
                  icon: <BiCategoryAlt className='fs-4' />,
                  label: 'Category List',
                },
                {
                  key: 'color-list',
                  icon: <AiOutlineBgColors className='fs-4' />,
                  label: 'Color List',
                },
                {
                  key: 'size-list',
                  icon: <BiFontSize className='fs-4' />,
                  label: 'Size List',
                }
              ]
            },
            {
              key: 'orders',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Orders',
            },
            {
              key: 'blog',
              icon: <FaBlogger className='fs-4' />,
              label: 'Blogs',
              children: [
                {
                  key: 'add-blog',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog',
                },
                {
                  key: 'blog',
                  icon: <FaBlogger className='fs-4' />,
                  label: 'Blog',
                },
                {
                  key: 'add-blog-category',
                  icon: <ImBlog className='fs-4' />,
                  label: 'Add Blog Category',
                },
                {
                  key: 'blog-category',
                  icon: <FaBlogger className='fs-4' />,
                  label: 'Blog Category',
                }
              ]
            },
            {
              key: 'enquiries',
              icon: <FaClipboardList className='fs-4' />,
              label: 'Enquiries',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className='d-flex justify-content-between ps-1 pe-5'
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
          <div className='d-flex gap-3 align-items-center'>
            <div className='position-relative'>
              <IoIosNotifications className='fs-4' />
              <span className='badge bg-warning rounded-circle p-1 position-absolute'>3</span>
            </div>
            <div className='d-flex gap-3 align-items-center m-3'>
              <h5 className='name'>{user.fullname}</h5>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
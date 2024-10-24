import React from 'react'; // Import React here
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Divider, Dropdown, Space } from "antd";
import { useContext, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';

export default function RightMenu() {
  const navigate = useNavigate();
  const userInfo = localStorage.getItem('userInfo');
  const userInfoJson = JSON.parse(userInfo);
  const items = [
    {
      label: "Log out",
      key: "1",
      icon: <UserOutlined />,
    },
  ];

  const handleMenuClick = (e) => {
    console.log("click", e);
    if (e.key === "1") {
      navigate('/admin/user/login');

      localStorage.removeItem('userInfo');
      localStorage.removeItem('accessToken');

    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <div className="header-right">
      <Space
        split={
          <Divider
            type="vertical"
            style={{ fontSize: 20, background: "white" }}
          />
        }
      >
        <Dropdown.Button
          menu={menuProps}
          placement="bottom"
          icon={<UserOutlined />}
        >
          Hi {`${userInfoJson?.username}`}
        </Dropdown.Button>
      </Space>
    </div>
  );
}

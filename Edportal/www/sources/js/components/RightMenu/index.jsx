import React from 'react'; // Import React here
import { BellOutlined, UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Divider, Dropdown, Space } from "antd";
import { useContext, useEffect } from "react";

export default function RightMenu() {
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
      //logout();
    }
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  // const { logout, me } = useContext(AuthContext);
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
          Hi {`Teddy`},
        </Dropdown.Button>
      </Space>
    </div>
  );
}

import React, { useEffect, useState } from "react"; // Import React here
import { Layout, Menu, theme } from "antd";
import { toArray, omit } from "lodash";
import { Link, useLocation } from "react-router-dom"; // Change this import
import { MENU } from "../../menu";

const { Sider } = Layout;
const MENU_ARRAY = toArray(MENU);

const MenuApp = () => {
    const location = useLocation(); // Use useLocation from react-router
    const currentRoute = location.pathname; // Get the current route from location

    const [dataSource, setDataSource] = useState([]);
    const [openKeys, setOpenKeys] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState([]);
    const [collapsed, setCollapsed] = useState(false);

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const renderMenu = (arrayData) => {
        return arrayData
            .map((item) => {
                const { children, title, path, isDisabled, icon } = item;
                const result = toArray(omit(item, ['title', "path", "isDisabled", "icon", 'resource']) || {}) || [];

                const model = {
                    label: isDisabled ? title : <Link to={path}>{title}</Link>,
                    key: path,
                    children: !!result?.length ? renderMenu(result) : undefined,
                    icon,
                };

                return model;
            })
            .filter((obj) => (obj.children && obj.children.length > 0) || obj.children === undefined);
    };

    useEffect(() => {
        setDataSource(renderMenu(MENU_ARRAY));
        setSelectedKeys([currentRoute]);
    }, [currentRoute]);

    return (
        <Sider
            width={200}
            style={{ background: colorBgContainer }}
            collapsible
            collapsed={collapsed}
            onCollapse={setCollapsed}
        >
            <Menu
                mode="inline"
                selectedKeys={selectedKeys}
                className="min-vh-100 overflow-auto"
                openKeys={openKeys}
                onOpenChange={setOpenKeys}
                items={dataSource}
            />
        </Sider>
    );
};

export default MenuApp;
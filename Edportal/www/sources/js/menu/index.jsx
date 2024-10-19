import React from 'react'; // Import React
import {
  ApartmentOutlined,
  AppstoreOutlined,
  BarsOutlined,
  CloudDownloadOutlined,
  CloudServerOutlined,
  ContainerOutlined,
  CreditCardOutlined,
  DollarOutlined,
  EyeOutlined,
  GiftOutlined,
  GlobalOutlined,
  GoldOutlined,
  MailOutlined,
  ProjectOutlined,
  SafetyOutlined,
  SettingOutlined,
  ShopOutlined,
  ShoppingOutlined,
  SwapOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from '@ant-design/icons'

export const MENU = {
  PRODUCT_CATALOG: {
    title: 'Product catalogs',
    path: '/product-catalogs',
    isDisabled: true,
    icon: <ProjectOutlined />,
    resource: 'PERMISSIONS_RESOURCE.PRODUCT_CATALOG',
    CATALOGS: {
      title: 'Catalogs',
      path: '/buyers/catalogs',
      icon: <GoldOutlined />,
      resource: 'PERMISSIONS_RESOURCE.CATALOGS',
    },
    CATEGORIES: {
      title: 'Categories',
      path: '/buyers/categories',
      icon: <BarsOutlined />,
      resource: 'PERMISSIONS_RESOURCE.GLOBAL_TOP_CATEGORIES',
    },
    GLOBAL_PRODUCT: {
      title: 'Global products',
      path: '/products/products-global',
      icon: <ShoppingOutlined />,
      resource: 'PERMISSIONS_RESOURCE.GLOBAL_PRODUCTS',
    }
  },
  PRODUCT_CONFIGURATIONS: {
    title: 'Location',
    path: '/admin/location',
    isDisabled: false,
    icon: <SettingOutlined />
  }
}


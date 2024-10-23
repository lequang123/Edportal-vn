import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Space } from "antd";
import { useContext } from "react";
// import { AuthContext } from "../../auth/AuthProvider.jsx";
import LayoutLogin from "../../layout/LayoutLogin";
import React from "react";

const Login = () => {
  // const { login } = useContext(AuthContext);

  const onFinish = (values) => {
    var model = {
      username: values.username,
      password: values.password,
    };
    //login(model);
  };

  return (
    <div className="d-flex flex-column justify-content-center min-vh-100" style={{'background-color': 'rgb(156,163,175)'}}>
    <div className="mx-auto bg-white" style={{'border-radius': '0.375rem'}}>
      <Form
        name="normal_login"
        className="login-form pt-3 pl-4 pr-4"
        onFinish={onFinish}
      >
        <div className="text-center mb-3">
          <div className="d-flex justify-content-center">
            <img
              src="/asset/brother-logo.png"
              width="150"
              className="img-fluid py-3"
              alt="Logo"
            />
          </div>
        </div>

        <div className="text-center mb-3">
          <h3>Account Login</h3>
        </div>

        <div className="mb-2 ml-2">
          <label className="form-label">
            Username <span className="text-danger">*</span>
          </label>
        </div>
        <Form.Item name="username" rules={[{ required: true }]}>
          <Input
            prefix={<UserOutlined className="me-2" />}
            placeholder="Username"
          />
        </Form.Item>

        <div className="mb-2">
          <label className="form-label">
            Password <span className="text-danger">*</span>
          </label>
        </div>
        <Form.Item name="password" rules={[{ required: true }]}>
          <Input.Password
            placeholder="input password"
            prefix={<LockOutlined className="me-2" />}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>

        <Form.Item className="d-flex justify-content-center">
          <Button
            type="primary"
            htmlType="submit"
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  </div>
  );
};

Login.layout = LayoutLogin;

export default Login;

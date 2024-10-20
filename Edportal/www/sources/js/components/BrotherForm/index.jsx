import { Loading3QuartersOutlined } from "@ant-design/icons";
import { Form, Spin } from "antd";
import { omit } from "lodash";
import React from "react";

const BrotherForm = (props) => {
  const { loading = false } = props || {};
  return (
    <Spin
      size="large"
      spinning={loading}
      indicator={<Loading3QuartersOutlined spin />}
    >
      <Form scrollToFirstError={{
        behavior: 'smooth',
        block: "center"
      }}
        {...omit(props, ["loading", "scrollToFirstError"])}
      >
        {props?.children}
      </Form>
    </Spin>
  );
};

export default BrotherForm;

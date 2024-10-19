import { Button, Form, Modal, Select, Spin } from "antd";
import { useEffect, useState } from "react";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { uniqBy } from "lodash";

export default function ModalUser(props) {
  const {
    setModalUser,
    modalUser,
    onSubmit,
    isLoadingForm = false,
  } = props || {};
  const { productDetail, title, open } = modalUser || {};
  const [form] = Form.useForm();
  const [userAPI, setUsersApi] = useState<[]>([]);
  
  const handleToggleModal = () => {
    setModalUser((pre)=> ({
      ...pre,
      open: false,
      productDetail: undefined,
    }));
  };

  return (
    <Modal
      open={open}
      title={title}
      destroyOnClose={true}
      onCancel={handleToggleModal}
      footer={[
        <Button key="back" onClick={handleToggleModal} disabled={isLoadingForm}>
          Back
        </Button>,
        <Button
          key="submit"
          type="primary"
          loading={isLoadingForm}
          onClick={() =>
            form.validateFields().then(async (values) => {
              onSubmit && onSubmit(values);
            })
          }
        >
          Submit
        </Button>,
      ]}
    >
      <Spin
        size="large"
        spinning={isLoadingForm}
        indicator={<Loading3QuartersOutlined spin />}
      >
        <Form
          layout={"vertical"}
          form={form}
          className="grid grid-cols-1 gap-3"
        >
          <Form.Item
            label="Executive Approver"
            name={"userSelect"}
            rules={[{ required: true }]}
          >
            <Select
              className="w-full"
              allowClear
              mode="multiple"
              options={(uniqBy(userAPI || [], 'Email'))?.map((item) => ({
                value: item.Email,
                label: item.Email,
              }))}
            //options={userAPI?.map((item: any) => ({ value: item.Email, label: item.FirstName + item.LastName }))}
            />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
}

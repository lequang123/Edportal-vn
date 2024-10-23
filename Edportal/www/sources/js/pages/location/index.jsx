import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Input, Switch, Form, Modal, InputNumber, message, Space } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { cloneDeep } from "lodash";
import InputWrapper from "../../components/InputWrapper";
import TableWithSitecoreApi from "../../components/TableWithSitecoreApi";
import { useSearchLocation, useAddLocation, useDeleteLocation, useUpdateLocation } from "../../queries/adminQueries";
import { Link } from "react-router-dom"; 
import { PlusCircleOutlined, EditOutlined, DeleteOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import BrotherForm from '../../components/BrotherForm/index'
const { confirm } = Modal;

dayjs.extend(customParseFormat);

const Location = () => {
  const DATASOURCE_TABLE_DEFAULT_SITECORE = {
    data: [],
    pagingation: {},
    requestParams: {},
  };

  const [dataSource, setDataSource] = useState(cloneDeep(DATASOURCE_TABLE_DEFAULT_SITECORE));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  const [form] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const columnDefault = [
    {
      title: 'ID',
      dataIndex: 'locationId',
      key: 'locationId',
      width: 180,
      render: (value) => value,
    },
    {
      title: 'City',
      dataIndex: 'city',
      key: 'city',
      width: 180,
      render: (value) => value,
    },
    {
      title: 'Program Count',
      dataIndex: 'programCount',
      key: 'programCount',
      render: (value) => value,
    },
    ,
    {
      title: 'Date Created',
      dataIndex: 'dateCreated',
      key: 'dateCreated',
      render: (value) => value.toString(),
    },
    {
      title: "Action",
      dataIndex: "Action",
      key: "Action",
      render: (value, record) => {
        return (
          <>
            <Space>
                <Button
                  type="primary"
                  size={"small"}
                  icon={<EditOutlined  />}
                  onClick={() => onUpdate(record)}
                ></Button>
                <Button
                  type="primary"
                  danger
                  ghost
                  size={"small"}
                  icon={<DeleteOutlined  />}
                  onClick={async () => {
                    onDelete({ ...record });
                  }}
                ></Button>
            </Space>
          </>
        );
      },
    }
  ];

  const getModelSearch = ({ PageSize, PageIndex, Keyword }) => {
    const { pagingation, requestParams } = cloneDeep(dataSource) || {};

    return {
      PageSize: PageSize >= 0 ? PageSize : pagingation?.PageSize || 10,
      PageIndex: PageIndex >= 0 ? PageIndex : pagingation?.PageIndex || 0,
      Keyword: Keyword || Keyword === "" ? Keyword : requestParams?.Keyword || undefined,
    };
  };

  const loadingForm = () => {
    return resUseSearchLocation?.isLoading || false;
  };

  const onChange = async ({ pagination }) => {
    const model = {
      PageSize: pagination?.PageSize,
      PageIndex: pagination?.PageIndex,
      Keyword: dataSource?.requestParams.search
    };
    await resUseSearchLocation.mutateAsync(model);
  };

  const onSearch = () => {
    const model = getModelSearch({ Keyword: dataSource?.requestParams.search || '', PageIndex: 0 });
    resUseSearchLocation.mutate(model);
  };

  useEffect(() => {
    const fetchData = () => {
      const model = getModelSearch({ Keyword: dataSource?.requestParams.search || '', PageIndex: 0 });
      var test = resUseSearchLocation.mutate(model);
      console.log(test);
    };
  
    fetchData();
  }, []);

  const resUseSearchLocation = useSearchLocation({
    onSuccess: (res, variables) => {
      console.log('resUseSearchLocation', res)
      const { PageSize, PageIndex } = variables || {};
      const data= res || {};
      setDataSource((prev) => {
        let clone = cloneDeep(prev);

        if (data) {
          clone.data = data;
        }

        if (!clone.pagingation) {
          clone.pagingation = {};
        }

        if (!clone.requestParams) {
          clone.requestParams = {};
        }

        clone.pagingation.PageSize = PageSize;
        clone.pagingation.PageIndex = PageIndex;
        clone.pagingation.DataCount = res.length;

        return clone;
      });
    }
  });

  const resUseAddLocation = useAddLocation({
    onSuccess: (res) => {
      const model = getModelSearch({ Keyword: dataSource?.requestParams.search || '', PageIndex: 0 });
      resUseSearchLocation.mutate(model);
      message.success('Location added successfully!', 3);

      form.resetFields();

      setShowCreateModal(false);
    }
  });

  const resUseUpdateLocation = useUpdateLocation({
    onSuccess: (res) => {
      const model = getModelSearch({ Keyword: dataSource?.requestParams.search || '', PageIndex: 0 });
      resUseSearchLocation.mutate(model);
      message.success('Location updated successfully!', 3);

      form.resetFields();

      setShowUpdateModal(false);
    }
  });

  const onUpdate = ({ ...data }) => {
    formUpdate.setFieldsValue(data);
    setShowUpdateModal(true);
  }

  const onDelete = async ({ ...data }) => {
    confirm({
      title: `Are you sure delete this ${data.city}?`,
      icon: <ExclamationCircleFilled  />,
      content: "",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      async onOk() {
        await resDeleteLocation.mutateAsync(data);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const resDeleteLocation = useDeleteLocation({
    onSuccess: (res) => {
      message.open({
        type: "success",
        key: "success",
        content: "Delete success",
        duration: 10,
      });

      const model = getModelSearch({ Keyword: dataSource?.requestParams.search || '', PageIndex: 0 });
      resUseSearchLocation.mutate(model);
    },
  });

  const renderCreateModal = () => {
    return (
        <Modal
            open={showCreateModal || false}
            title={'Create new location'}
            maskClosable={true}
            onCancel={() => {
              setShowCreateModal(false)
            }}
            footer={[]}
        >
          <BrotherForm
              layout={'vertical'}
              form={form}
              className="grid grid-cols-1 pt-2"
              onFinish={async () => {
                let data = {
                  City: form.getFieldValue('City'),
                  ProgramCount: form.getFieldValue('ProgramCount'),
                }

                console.log(data)
                await resUseAddLocation.mutateAsync(data)
              }}
          >
            <Form.Item noStyle shouldUpdate>
              {() => (
                  <Form.Item
                      name="City"
                      label="City"
                      initialValue=''
                      rules={[
                        { required: true, message: 'City is required' },
                      ]}
                      shouldUpdate
                  >
                    <Input />
                  </Form.Item>
              )}
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {() => (
                  <Form.Item
                      name="ProgramCount"
                      label="Program Count"
                      rules={[
                        { required: true, message: 'Program Count is required' }
                      ]}
                      shouldUpdate
                  >
                    <InputNumber min={0} />
                  </Form.Item>
              )}
            </Form.Item>
            <div className="flex items-center justify-end">
              <Button
                  key="back"
                  className="mr-2"
                  onClick={() => {
                    setShowCreateModal(false)
                  }}
              >
                Cancel
              </Button>
              <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  loading={resUseAddLocation.isLoading}
              >
                Submit
              </Button>
            </div>
          </BrotherForm>
        </Modal>
    )
  }

  const renderUpdateModal = () => {
    return (
        <Modal
            open={showUpdateModal || false}
            title={'Update location'}
            maskClosable={true}
            onCancel={() => {
              setShowUpdateModal(false)
            }}
            footer={[]}
        >
          <BrotherForm
              layout={'vertical'}
              form={formUpdate}
              className="grid grid-cols-1 pt-2"
              onFinish={async () => {
                let data = {
                  LocationId: formUpdate.getFieldValue('locationId'),
                  City: formUpdate.getFieldValue('city'),
                  ProgramCount: formUpdate.getFieldValue('programCount'),
                }

                await resUseUpdateLocation.mutateAsync(data)
              }}
          >
            <Form.Item noStyle shouldUpdate>
              {() => (
                  <Form.Item
                      name="city"
                      label="City"
                      rules={[
                        { required: true, message: 'City is required' },
                      ]}
                      shouldUpdate
                  >
                    <Input />
                  </Form.Item>
              )}
            </Form.Item>
            <Form.Item noStyle shouldUpdate>
              {() => (
                  <Form.Item
                      name="programCount"
                      label="Program Count"
                      rules={[
                        { required: true, message: 'Program Count is required' }
                      ]}
                      shouldUpdate
                  >
                    <InputNumber min={0} />
                  </Form.Item>
              )}
            </Form.Item>
            <div className="flex items-center justify-end">
              <Button
                  key="back"
                  className="mr-2"
                  onClick={() => {
                    setShowUpdateModal(false)
                  }}
              >
                Cancel
              </Button>
              <Button
                  key="submit"
                  type="primary"
                  htmlType="submit"
                  loading={resUseUpdateLocation.isLoading}
              >
                Submit
              </Button>
            </div>
          </BrotherForm>
        </Modal>
    )
  }

  const renderNotificationTable = () => {
    return (
      <TableWithSitecoreApi
        key="table"
        loading={loadingForm()}
        bordered
        rowKey={"locationId"}
        scroll={{ x: 400 }}
        columns={columnDefault}
        dataSource={dataSource?.data}
        onChange={onChange}
        pagination={{}}
        paginationSC={dataSource?.pagingation || {}}
        renderActionButtons={() => {
          return (
              <div className="d-flex flex-row">
                {/* <Link to='create'> */}
                  <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => setShowCreateModal(true)}>
                    Create
                  </Button>
                {/* </Link> */}
              </div>
          );
        }}
      />
    );
  };

  return (
    <>
      <div className="bg-white border border-gray-50 border-opacity-10 p-3 mb-3">
        <div className="filter-items d-flex mb-1">
          <InputWrapper>
            <Input
              allowClear
              autoComplete="off"
              placeholder={"Search by keywords"}
              value={dataSource?.requestParams?.search}
              onChange={(e) => {
                const sourceClone = cloneDeep(dataSource) || {};
                const { requestParams = {} } = sourceClone || {};
                requestParams.search = e.target.value || '';
                setDataSource(sourceClone);
              }}
              onPressEnter={onSearch}
            />
          </InputWrapper>
          <Button type="primary" onClick={onSearch}>
            Search
          </Button>
        </div>
      </div>
      {renderNotificationTable()}
      {renderCreateModal()}
      {renderUpdateModal()}
    </>
  );
};

export default Location;

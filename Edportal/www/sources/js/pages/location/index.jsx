import React, { useEffect, useState } from 'react'; // Import React here
import { Button, DatePicker, Input, Switch } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { cloneDeep } from "lodash";
import InputWrapper from "../../components/InputWrapper";
import TableWithSitecoreApi from "../../components/TableWithSitecoreApi";
import { useSearchLocation } from "../../queries/admin";


dayjs.extend(customParseFormat);

const Location = () => {
  const { RangePicker } = DatePicker;
  const DATASOURCE_TABLE_DEFAULT_SITECORE = {
    data: [],
    pagingation: {},
    requestParams: {},
  };

  const [dataSource, setDataSource] = useState(cloneDeep(DATASOURCE_TABLE_DEFAULT_SITECORE));
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  const columnDefault = [
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
    {
      title: 'Created Date',
      dataIndex: 'CreatedAt',
      key: 'CreatedAt',
      render: (value) => value,
    },
    {
      title: "Email Sent",
      dataIndex: "IsSentMail",
      key: "IsSentMail",
      render: (value, index) => (
        <Switch
          defaultChecked
          disabled
          checked={value || false}
          key={index}
        />
      ),
    },
    {
      title: 'Send Date',
      dataIndex: 'NotifiedAt',
      key: 'NotifiedAt',
      render: (value) => value,
    },
    {
      title: 'Stop Date',
      dataIndex: 'StoppedAt',
      key: 'StoppedAt',
      render: (value) => value,
    }
  ];

  const handleDateChange = (dates) => {
    if (dates) {
      const [start, end] = dates;
      const formattedFromDate = start ? dayjs(start.toISOString()) : null;
      const formattedToDate = end ? dayjs(end.toISOString()) : null;
      formattedFromDate?.isValid() && setFromDate(formattedFromDate);
      formattedToDate?.isValid() && setToDate(formattedToDate);
    } else {
      setFromDate(null);
      setToDate(null);
    }
  };

  const getParamDefault = () => {
    return {};
  };

  const getModelSearch = ({ PageSize, PageIndex, Keyword }) => {
    const { pagingation, requestParams } = cloneDeep(dataSource) || {};

    return {
      PageSize: PageSize >= 0 ? PageSize : pagingation?.PageSize || 10,
      PageIndex: PageIndex >= 0 ? PageIndex : pagingation?.PageIndex || 0,
      Keyword: Keyword || Keyword === "" ? Keyword : requestParams?.Keyword || undefined,
      FromDate: fromDate ? fromDate.startOf('day') : null,
      ToDate: toDate ? toDate.endOf('day') : null,
    };
  };

  const loadingForm = () => {
    return resUseSearchLocation?.isLoading || false;
  };

  const onChange = async ({ pagination }) => {
    const model = useSearchLocation({
      PageSize: pagination?.PageSize,
      PageIndex: pagination?.PageIndex,
      Keyword: dataSource?.requestParams.search
    });

    await resUseSearchLocation.mutateAsync(model);
  };

  const onSearch = () => {
    const model = getModelSearch({ Keyword: dataSource?.requestParams.search || '', PageIndex: 0 });
    resUseSearchLocation.mutate(model);
  };

  useEffect(() => {
    const model = getModelSearch(getParamDefault());
    resUseSearchLocation.mutate(model);
  }, []);

  const resUseSearchLocation = useSearchLocation({
    onSuccess: (res, variables) => {
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

  const renderNotificationTable = () => {
    return (
      <TableWithSitecoreApi
        key="table"
        loading={loadingForm()}
        bordered
        rowKey={"ID"}
        scroll={{ x: 400 }}
        columns={columnDefault}
        dataSource={dataSource?.data}
        onChange={onChange}
        pagination={{}}
        paginationSC={dataSource?.pagingation}
      />
    );
  };

  const handleFilterNotification = async () => {
    const model = getModelSearch({ PageIndex: 0 });
    await resUseSearchLocation.mutateAsync(model);
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
        <div className="filter-items d-flex flex-wrap">
          <InputWrapper title={"Date Range"}>
            <RangePicker value={[fromDate, toDate]} onChange={handleDateChange} />
          </InputWrapper>
          <Button type="primary" onClick={handleFilterNotification}>
            Filter
          </Button>
        </div>
      </div>
      {renderNotificationTable()}
    </>
  );
};

export default Location;

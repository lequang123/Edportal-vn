import { Loading3QuartersOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Input,
  Space,
  Table as TableAntd,
} from "antd";
import { pick } from "lodash";
import React, { useEffect, useState } from "react";
import { TABLE_ACTION, TABLE_ONCHANGE_ACTION_TYPE } from "../../common/enum/index";


const TableWithSitecoreApi = (props) => {
  const {
    paginationSC,
    pagination,
    onChange,
    renderActionButtons,
    onSearch,
    renderTotal,
    isRenderHeader = true,
  } = props || {};
  const [keyword, setKeyword] = useState(undefined);

  let paginationConfig = pagination
    ? {
        current: pagination.current,
        pageSize: pagination.pageSize,
        total: pagination.total,
        showSizeChanger: true,
        showQuickJumper: true,
        hideOnSinglePage: pagination.hideOnSinglePage || false,
        disabled: pagination.disabled,
        pageSizeOptions: pagination.pageSizeOptions,
      }
    : false;

  if (paginationSC && paginationConfig) {
    paginationConfig.current =
      paginationSC.PageIndex >= 0 ? paginationSC.PageIndex + 1 : 1;
    paginationConfig.pageSize = paginationSC.PageSize || 10;
    paginationConfig.total = paginationSC.DataCount || 0;
  }

  const onChangeWrapper = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    let actionType = TABLE_ONCHANGE_ACTION_TYPE.DEFAULT.key;

    pagination = Object.assign(pagination, {
      PageIndex: pagination?.current && pagination.current - 1,
      PageSize: pagination.pageSize,
    });

    pagination = pick(pagination, ["current", "PageIndex", "PageSize"]);

    switch (extra?.action) {
      case TABLE_ACTION.PAGINATE:
        actionType = TABLE_ONCHANGE_ACTION_TYPE.PAGINATION.key;
        break;
      case TABLE_ACTION.FILTER:
        actionType = TABLE_ONCHANGE_ACTION_TYPE.FILTER_ON_HEADER.key;
        break;
    }

    return (
      onChange &&
      onChange({
        pagination,
        filters,
        sorter,
        extra,
        actionType,
      })
    );
  };

  const onSearchTable = (e) => {
    e.preventDefault();
    return (
      onSearch &&
      onSearch(TABLE_ONCHANGE_ACTION_TYPE.SEARCH_KEYWORD.key, keyword)
    );
  };

  return (
    <div className="bg-white">
      {isRenderHeader && (
        <div className="header p-3 flex flex-row items-center justify-between">
          <div className="left flex flex-row items-center justify-content-end">
            <Space>
              {onSearch && (
                <Input
                  name="table-search-input"
                  value={keyword}
                  allowClear
                  autoComplete="off"
                  placeholder={"Search by keywords"}
                  suffix={
                    <SearchOutlined
                      onClick={(e) => onSearchTable(e)}
                    />
                  }
                  onPressEnter={onSearchTable}
                  onChange={(e) => setKeyword(e.target.value || "")}
                />
              )}
              {renderActionButtons && renderActionButtons()}
            </Space>
          </div>
          {renderTotal
            ? renderTotal
            : paginationConfig &&
              !!paginationConfig?.total && (
                <div className="total-count right text-md">
                  <span className="font-normal text-gray-500">Total</span>
                  <span className="font-semibold ml-1">
                    {paginationConfig.total}
                  </span>
                </div>
              )}
        </div>
      )}

      <TableAntd
        {...props}
        pagination={paginationConfig}
        onChange={onChangeWrapper}
        loading={{
          spinning: props.loading || false,
          size: "large",
          indicator: (
            <Loading3QuartersOutlined
              spin={props.loading || false}
            />
          ),
        }}
      />
    </div>
  );
};

export default TableWithSitecoreApi;

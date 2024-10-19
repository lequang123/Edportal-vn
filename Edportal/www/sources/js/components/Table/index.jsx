import { Loading3QuartersOutlined, SearchOutlined } from "@ant-design/icons";
import {
  Input,
  Space,
  Table as TableAntd,
  TablePaginationConfig,
} from "antd";
import { pick } from "lodash";
import { ReactNode } from "react";
import { TABLE_ACTION, TABLE_ONCHANGE_ACTION_TYPE } from "../../../constants/Enum";

const Table = (props) => {
  const {
    paginationOC,
    pagination,
    onChange,
    renderActionButtons,
    onSearch,
    requestParams,
    setRequestParams,
  } = props || {};

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

  if (paginationOC && paginationConfig) {
    paginationConfig.current = paginationOC.page || 0;
    paginationConfig.pageSize = paginationOC.pageSize || 10;
    paginationConfig.total = paginationOC.totalCount || 10;
  }

  const onChangeWrapper = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    let actionType = TABLE_ONCHANGE_ACTION_TYPE.DEFAULT.key;

    pagination = Object.assign(pagination, {
      page: pagination.current,
      pageSize: pagination.pageSize,
    });
    pagination = pick(pagination, ["current", "pageSize", "total", "page"]);

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
    return onSearch && onSearch(TABLE_ONCHANGE_ACTION_TYPE.SEARCH_KEYWORD.key);
  };

  return (
    <div className="bg-white">
      <div className="header p-3 flex flex-row items-center justify-between">
        <div className="left flex flex-row items-center justify-content-end">
          <Space>
            {onSearch && (
              <Input
                name="table-search-input"
                value={requestParams?.search}
                allowClear
                autoComplete="off"
                placeholder={"Search by keywords"}
                suffix={
                  <SearchOutlined
                    onClick={(e) => onSearchTable(e)}
                  />
                }
                onPressEnter={onSearchTable}
                onChange={(e) =>
                  setRequestParams &&
                  setRequestParams({
                    search: e.target.value || "",
                  })
                }
              />
            )}
            {renderActionButtons && renderActionButtons()}
          </Space>
        </div>
        <div className="total-count right text-md">
          {paginationConfig && paginationConfig?.total && (
            <>
              <span className="font-normal text-gray-500">Total</span>
              <span className="font-semibold ml-1">
                {paginationConfig?.total}
              </span>
            </>
          )}
        </div>
      </div>
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

export default Table;

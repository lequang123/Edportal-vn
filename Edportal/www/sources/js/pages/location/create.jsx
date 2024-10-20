import React, { useEffect, useState } from 'react'; // Import React here
import { Button, DatePicker, Input, Switch } from "antd";
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { cloneDeep } from "lodash";
import InputWrapper from "../../components/InputWrapper";
import TableWithSitecoreApi from "../../components/TableWithSitecoreApi";
import { useSearchLocation } from "../../queries/adminQueries";
import { Link } from "react-router-dom"; 
import { PlusCircleOutlined } from '@ant-design/icons';

const CreateLocation = () => {
  return (
    <>
      <div className="bg-white border border-gray-50 border-opacity-10 p-3 mb-3">
        test create
      </div>
    </>
  );
};

export default CreateLocation;

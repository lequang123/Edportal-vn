import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from '../layout/MainLayout'
import { ConfigProvider, message } from 'antd';
import { BrowserRouter as Router} from 'react-router-dom';
import QueryClientProviderWrapper from "../auth/QueryClientProviderWrapper";

const validateMessages = {
    //required: "${name} is required!",
    required: "This field is required!",
  };
  

ReactDOM.render(
    <React.StrictMode>
      <Router>
        <ConfigProvider form={{ validateMessages, }}>
              <QueryClientProviderWrapper>
                  <MainLayout />
              </QueryClientProviderWrapper>
          </ConfigProvider>
      </Router>
    </React.StrictMode>,
document.getElementById('admin-app-container'));
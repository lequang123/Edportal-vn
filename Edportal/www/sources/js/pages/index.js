import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from '../layout/MainLayout'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { ConfigProvider, message } from 'antd';

const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        cacheTime: Infinity,
        staleTime: 0
      },
    },
    queryCache: new QueryCache({
      onError: (error, query) => errorHandler(error)
    }),
    mutationCache: new MutationCache({
      onError: error => errorHandler(error),
    })
});

const validateMessages = {
    //required: "${name} is required!",
    required: "This field is required!",
  };
  

ReactDOM.render(
    <React.StrictMode>
        <ConfigProvider form={{ validateMessages, }}>
            <QueryClientProvider client={queryClient}>
                <MainLayout />
                <ReactQueryDevtools />
            </QueryClientProvider>
        </ConfigProvider>
    </React.StrictMode>,
document.getElementById('app-container'));
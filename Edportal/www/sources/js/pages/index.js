import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from '../layout/MainLayout'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { ConfigProvider, message } from 'antd';

const errorHandler = (error) => {
  if (error.status === 401) {
    // var token = Tokens.GetRefreshToken();
    // if (token) {
    //   return refreshToken({ refreshToken: token, clientID: process.env.CLIENT_ID as string }).then(response => {
    //     const token = response.access_token;
    //     Tokens.SetAccessToken(token);
    //   }).catch(err => {
    //     Tokens.RemoveAccessToken();
    //     Tokens.RemoveRefreshToken();
    //     return Router.push('/login');
    //   });
    // } else {
    //   Tokens.RemoveAccessToken();
    //   Tokens.RemoveRefreshToken();
    //   return Router.push('/login');
    // }
  }

  if (error?.response?.data?.ContentType === "text/html; charset=utf-8") {
    return message.open({
      type: 'error',
      key: "error",
      content: <iframe width={500} height={500} srcDoc={error?.response?.data?.Message}></iframe>,
      duration: 10,
      icon: <></>
    });
  }

  if (error?.response?.data?.Errors && error?.response?.data?.Errors?.length) {
    return message.open({
      type: 'error',
      key: "error",
      content: error?.response?.data?.Errors[0].Message,
      duration: 10
    });
  }

  return message.open({
    type: 'error',
    key: "error",
    content: (!!error.errors && error.errors[0].Message) || (error?.response?.data?.Message),
    duration: 10
  });
}

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
            </QueryClientProvider>
        </ConfigProvider>
    </React.StrictMode>,
document.getElementById('app-container'));
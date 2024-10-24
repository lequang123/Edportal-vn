import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { NavigationProvider } from './NavigationProvider';
import { message } from 'antd';

const QueryClientProviderWrapper = ({ children }) => {
    const navigate = useNavigate();

    const errorHandler = (error) => {
        console.log('error', error);

        if (error.response?.status === 401) {
            navigate('/admin/user/login');
            return;
        }

        if (error.response?.data?.ContentType === "text/html; charset=utf-8") {
            return message.error({
                content: <iframe width={500} height={500} srcDoc={error.response.data.Message}></iframe>,
                duration: 10,
            });
        }

        if (error.response?.data?.Errors?.length) {
            return message.error({
                content: error.response.data.Errors[0].Message,
                duration: 10,
            });
        }

        return message.error({
            content: (error.errors?.[0]?.Message) || (error.response?.data?.Message) || 'An unknown error occurred',
            duration: 10,
        });
    };

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                refetchOnWindowFocus: false,
                retry: false,
                cacheTime: Infinity,
                staleTime: 0,
            },
        },
        queryCache: new QueryCache({
            onError: errorHandler,
        }),
        mutationCache: new MutationCache({
            onError: errorHandler,
        }),
    });

    return (
        <QueryClientProvider client={queryClient}>
            <NavigationProvider>
                {children}
            </NavigationProvider>
        </QueryClientProvider>
    );
};

export default QueryClientProviderWrapper;

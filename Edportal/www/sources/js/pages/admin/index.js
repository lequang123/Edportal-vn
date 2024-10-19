import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './homeSlice';
import AppContainer from './components/AppContainer';

const store = configureStore({
    reducer: homeReducer
});

const Home = () =>{
 return (
    <Provider store={store}>
        <AppContainer />
    </Provider>
 )
}

export default Home;
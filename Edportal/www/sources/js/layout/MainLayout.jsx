import { Routes, Route } from 'react-router-dom';
import React from 'react';
import LayoutApp from './LayoutApp';
import Location from '../pages/location/index';
import CreateLocation from '../pages/location/create';
import Login from '../pages/login/index';

const MainLayout = () =>{
    return (
        <Routes>
            <Route path="/admin" element={<LayoutApp />}>
                <Route path="/admin/location" element={<Location />} />
                <Route path="/admin/location/create" element={<CreateLocation />} />
            </Route>
            <Route path="/admin/login" element={<Login />} />
        </Routes>
    )
}

export default MainLayout;
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LayoutApp from './LayoutApp';
import Location from '../pages/location/index';
import CreateLocation from '../pages/location/create';

const MainLayout = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<LayoutApp />}>
                    <Route path="/admin/location" element={<Location />} />
                    <Route path="/admin/location/create" element={<CreateLocation />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default MainLayout;
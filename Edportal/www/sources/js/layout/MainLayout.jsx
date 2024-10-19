import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import LayoutApp from './LayoutApp';
import Location from '../pages/location/index';

const MainLayout = () =>{
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<LayoutApp />}>
                    <Route path="/admin/location" element={<Location />} />
                </Route>
            </Routes>
        </Router>
    )
}

export default MainLayout;
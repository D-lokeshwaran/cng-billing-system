import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from 'src/components/structure/SideBar';

const MainLayout = () => {

    return (
        <div>
            <SideBar/>
            <Outlet/>
        </div>
    )
}

export default MainLayout;
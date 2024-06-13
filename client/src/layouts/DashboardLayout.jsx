import React from 'react';
import { Outlet } from 'react-router-dom';
import PageLoading from 'src/components/common/PageLoading';
import SideBar from 'src/components/structure/SideBar';

const DashboardLayout = () => {

    return (
        <div>
            <SideBar/>
            <Outlet/>
            <PageLoading/>
        </div>
    )
}

export default DashboardLayout;
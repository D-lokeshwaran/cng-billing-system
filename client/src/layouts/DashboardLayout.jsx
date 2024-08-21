import React from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PromiseLoader from 'src/components/common/loaders/PromiseLoader';
import SideBar from 'src/components/structure/SideBar';
import TopContentBar from 'src/components/topContent/TopContentBar';
import UserContextProvider from 'src/context/UserContext';

const DashboardLayout = () => {

    return (
        <div className="app-layout">
            <Row className="g-0">
                <Col className="sidebar-wrapper p-0" sm="auto" >
                    <SideBar/>
                </Col>
                <Col>
                    <UserContextProvider>
                        <TopContentBar/>
                        <div className="outlet-container container p-3 mt-2">
                            <PromiseLoader/>
                            <Outlet/>
                        </div>
                    </UserContextProvider>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardLayout;

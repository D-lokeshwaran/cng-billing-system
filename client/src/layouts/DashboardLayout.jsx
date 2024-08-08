import React from 'react';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import PageLoading from 'src/components/common/PageLoading';
import SideBar from 'src/components/structure/SideBar';
import TopContentBar from 'src/components/topContent/TopContentBar';
import UserContextProvider from 'src/context/UserContext';

const DashboardLayout = () => {

    return (
        <div>
            <Row className="g-0">
                <Col className="sidebar-container position-fixed h-100" style={{ width: "15.625rem"}}>
                    <SideBar/>
                </Col>
                <Col className="outlet-container container" style={{marginLeft: "15.625rem"}}>
                    <UserContextProvider>
                        <TopContentBar/>
                        <div>
                            <Outlet/>
                            <PageLoading/>
                        </div>
                    </UserContextProvider>
                </Col>
            </Row>
        </div>
    )
}

export default DashboardLayout;
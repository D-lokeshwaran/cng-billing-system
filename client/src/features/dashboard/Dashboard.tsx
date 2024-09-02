import { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import FlexBox from 'src/components/common/FlexBox';
import Overview from './Overview';
import { coreApi } from 'src/utils/api';
import { useState, useEffect } from 'react';
import SimpleTable from 'src/components/table/SimpleTable';
import { trackPromise } from 'react-promise-tracker';
import {
   Coins01Icon,
   UserMultiple02Icon,
   SaleTag02Icon,
   HourglassIcon
} from "hugeicons-react"

type DashboardInfoType = {
    totalRevenue: number,
    customers: number,
    sales: number,
    activeBills: number,
    monthlyRevenue: {
        revenue: number,
        month: string
    }[]
}

const Dashboard = () => {

    const [ dashboardInfo, setDashboardInfo ] = useState<DashboardInfoType>(!null);

    useEffect(() => {
        retrieveDashboardInfo()
    }, [])

    const retrieveDashboardInfo = async () => {
        const dashboardResult = await trackPromise(coreApi.get("/cng/dashboard"));
        let dashboardInfo = dashboardResult.data;
        setDashboardInfo(dashboardInfo);
    }

    return (
        <section>
            <Helmet>
                <title>CNG Dashboard</title>
            </Helmet>
            <div>
                <Row className="mb-3 g-3">
                    <Col xs={6} lg={3}>
                        <Card body>
                            <FlexBox justify='between'>
                                <div>Revenue</div>
                                <Coins01Icon/>
                            </FlexBox>
                            <h2>
                                ₹ {dashboardInfo?.totalRevenue}
                            </h2>
                        </Card>
                    </Col>
                    <Col>
                        <Card body>
                            <FlexBox justify='between'>
                                <div>Customers</div>
                                <UserMultiple02Icon/>
                            </FlexBox>
                            <h2>
                                {dashboardInfo?.customers}
                            </h2>
                        </Card>
                    </Col>
                    <Col>
                        <Card body>
                            <FlexBox justify='between'>
                                <div>Sales</div>
                                <SaleTag02Icon/>
                            </FlexBox>
                            <h2>
                                {dashboardInfo?.sales}
                            </h2>
                        </Card>
                    </Col>
                    <Col>
                        <Card body>
                            <FlexBox justify='between'>
                                <div>Active Bills</div>
                                <HourglassIcon/>
                            </FlexBox>
                            <h2>
                                {dashboardInfo?.activeBills}
                            </h2>
                        </Card>
                    </Col>
                </Row>
                <Row className="g-3">
                    <Col lg={7} md={5} sm={3}>
                        <Overview data={{
                            monthly: dashboardInfo?.monthlyRevenue,
                            weekly: dashboardInfo?.weeklyRevenue
                        }}/>
                    </Col>
                    <Col>
                        <Card>
                            <Card.Header as={FlexBox} justify="between">
                                <div>Recent Bills</div>
                                <Link to="/bills">View All</Link>
                            </Card.Header>
                            <Card.Body>
                              <SimpleTable data={dashboardInfo?.recentBills} columns={[
                                {
                                  attr: "customer",
                                  title: "Customer",
                                  cell: (value) => (
                                    <>
                                        <div>{value.fullName}</div>
                                        {value.accountNumber}
                                    </>
                                  )
                                },
                                {
                                  attr: "status",
                                  title: "Status"
                                },
                                {
                                  attr: "amount",
                                  title: "Amount"
                                }
                              ]}/>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
        </section>
    )

}
export default Dashboard

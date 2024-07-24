import { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import FlexBox from 'src/components/common/FlexBox';
import Overview from './Overview';
import { coreApi } from 'src/utils/api';
import { Bill } from '../bill/billSlice';
import { useState, useEffect } from 'react';

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
    const [ recentBills, setRecentBills ] = useState<Bill[]>(!null);

    useEffect(() => {
        retrieveDashboardInfo()
    }, [])

    const retrieveDashboardInfo = async () => {
        const dashboardResult = await coreApi.get("/cng/dashboard")
        let dashboardInfo = dashboardResult.data;
        setDashboardInfo(dashboardInfo);
        const recentBillsResult = await coreApi.get("/cng/bills/search/recentBills");
        let recentBills = recentBillsResult.data._embedded.bills;
        setRecentBills(recentBills);
    }

    return (
        <section>
            <Helmet>
                <title>CNG Dashboard</title>
            </Helmet>
            <div>
                <FlexBox>
                    <Card body>
                        <FlexBox justify='between'>
                            <div>Total Revenue</div>
                            <div>R</div>
                        </FlexBox>
                        <h2>
                            ₹ {dashboardInfo.totalRevenue}
                        </h2>
                        <small>+40% from last month </small>
                    </Card>
                    <Card body>
                        <FlexBox justify='between'>
                            <div>Customers</div>
                            <div>C</div>
                        </FlexBox>
                        <h2>
                            {dashboardInfo.customers}
                        </h2>
                        <small>+2% from last month</small>
                    </Card>
                    <Card body>
                        <FlexBox justify='between'>
                            <div>Sales</div>
                            <div>B</div>
                        </FlexBox>
                        <h2>
                            +{dashboardInfo.sales}
                        </h2>
                        <small>+21% from last month</small>
                    </Card>
                    <Card body>
                        <FlexBox justify='between'>
                            <div>Active Bills</div>
                            <div>A</div>
                        </FlexBox>
                        <h2>
                            {dashboardInfo.activeBills}
                        </h2>
                        <small>+10 from last month</small>
                    </Card>
                </FlexBox>
                <FlexBox>
                    <Overview data={dashboardInfo.monthlyRevenue}/>
                    <Card>
                        <Card.Header>
                            <div>Recent Bills</div>
                            <a>View All</a>
                            {JSON.stringify(recentBills, null, 2)}
                        </Card.Header>
                    </Card>
                </FlexBox>
            </div>
        </section>
    )

}
export default Dashboard
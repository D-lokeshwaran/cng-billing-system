import { FC } from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet-async';
import FlexBox from 'src/components/common/FlexBox';
import Overview from './Overview';
import { coreApi } from 'src/utils/api';
import { Bill } from '../bill/billSlice';
import { useState, useEffect } from 'react';
import SimpleTable from 'src/components/table/SimpleTable';

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

    const [ dashboardInfo, setDashboardInfo ] = useState<DashboardInfoType>();
    const [ recentBills, setRecentBills ] = useState<Bill[]>();

    const dummyRecentBills = [
        {
          "id": 1,
          "unitsConsumed": 12,
          "paymentStatus": "Pending",
          "billAmount": 29.16,
          "billingDate": "2024-07-25T04:56:12.767+00:00",
          "paymentDueDate": "2024-08-04T04:56:12.767+00:00"
        },
        {
          "id": 2,
          "unitsConsumed": 122,
          "paymentStatus": "Pending",
          "billAmount": 296.46,
          "billingDate": "2024-08-22T04:56:12.000+00:00",
          "paymentDueDate": "2024-08-04T04:56:12.767+00:00"
        },
        {
          "id": 3,
          "unitsConsumed": 122,
          "paymentStatus": "Pending",
          "billAmount": null,
          "billingDate": "2024-08-22T04:56:12.000+00:00",
          "paymentDueDate": "2024-09-01T04:56:12.000+00:00"
        }
      ]

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
                            ₹ {dashboardInfo?.totalRevenue}
                        </h2>
                        <small>+40% from last month </small>
                    </Card>
                    <Card body>
                        <FlexBox justify='between'>
                            <div>Customers</div>
                            <div>C</div>
                        </FlexBox>
                        <h2>
                            {dashboardInfo?.customers}
                        </h2>
                        <small>+2% from last month</small>
                    </Card>
                    <Card body>
                        <FlexBox justify='between'>
                            <div>Sales</div>
                            <div>B</div>
                        </FlexBox>
                        <h2>
                            +{dashboardInfo?.sales}
                        </h2>
                        <small>+21% from last month</small>
                    </Card>
                    <Card body>
                        <FlexBox justify='between'>
                            <div>Active Bills</div>
                            <div>A</div>
                        </FlexBox>
                        <h2>
                            {dashboardInfo?.activeBills}
                        </h2>
                        <small>+10 from last month</small>
                    </Card>
                </FlexBox>
                <FlexBox>
                    <Overview data={dashboardInfo?.monthlyRevenue}/>
                    <Card>
                        <Card.Header>
                            <div>Recent Bills</div>
                            <a>View All</a>
                        </Card.Header>
                        <Card.Body>
                          <SimpleTable data={dummyRecentBills} columns={[
                            {
                              attr: "paymentStatus",
                              title: "Status"
                            },
                            {
                              attr: "billAmount",
                              title: "Amount"
                            }
                          ]}/>
                        </Card.Body>
                    </Card>
                </FlexBox>
            </div>
        </section>
    )

}
export default Dashboard
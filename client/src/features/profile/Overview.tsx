import { Card, Row, Col, Table } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import { useUserContext } from "src/context/UserContext";
import {
   Coins01Icon,
   UserMultiple02Icon,
   SaleTag02Icon,
   InvoiceIcon
} from "hugeicons-react"

const activityLogs = [
    {
        message: "Marked as paid bill #421 for customer Lilly haris...",
        createdAt: "Sep 21, 11:00 AM",
        category: "Bill"
    }, {
        message: "Created bill #421 for customer Lilly haris amount $300",
        createdAt: "Sep 20, 11:00 AM",
        category: "Bill"
    }, {
        message: "Created tariff a 1/08/24 to 10/08/24",
        createdAt: "Sep 16, 11:00 AM",
        category: "Tariff"
    }, {
        message: "Updated fullname of customer Emile",
        createdAt: "Sep 06, 11:00 AM",
        category: "Customer"
    }
]

const Overview = () => {

    const { userDetails } = useUserContext();

    return (
        <Row>
            <Col sm={6} lg={7}>
                <Card>
                    <Card.Header><h3 className="mb-0">Details</h3></Card.Header>
                    <Card.Body>
                        <Row className="mt-3">
                            <Col>Full Name:</Col>
                            <Col >{userDetails?.profile.fullName}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>Email address:</Col>
                            <Col >{userDetails?.emailAddress}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>Phone Number:</Col>
                            <Col >{userDetails?.profile.phoneNumber}</Col>
                        </Row>
                        <Row className="mt-3">
                            <Col>Status:</Col>
                            <Col >{userDetails?.profile.status}</Col>
                        </Row>
                        <Row className="mt-3 mb-4">
                            <Col>About me:</Col>
                            <Col>{userDetails?.profile.aboutMe}</Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
            <Col>
                <Card>
                    <Card.Header as={FlexBox} justify="between">
                        <h3 className="mb-0">Recent Activities</h3>
                        <div>All Logs</div>
                    </Card.Header>
                    <Card.Body>
                        <Table>
                            <tbody>
                                {activityLogs.map(log =>
                                    <tr key={log.message}>
                                        <td className="text-dark">
                                            {log.category == "Bill" ?
                                                <SaleTag02Icon/> : log.category === "Tariff" ?
                                                    <InvoiceIcon/> : <UserMultiple02Icon/>
                                            }
                                        </td>
                                        <td className="ps-3 text-dark">
                                            <h6 className="mb-0">{log.message}</h6>
                                            <small className="text-secondary">{log.createdAt}</small>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    )
}

export default Overview
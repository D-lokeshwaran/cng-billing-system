import { Card, Row, Col, Button, Form } from "react-bootstrap";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import BasicDetails from "./BasicDetails"

const Settings = () => {

    return (
        <Row>
            <Col sm={6} lg={7}>
                <BasicDetails/>
            </Col>
            <Col>
                <Row className="g-3 flex-column" >
                    <Col>
                        <Card>
                            <Card.Header className="fs-4">Account Settings</Card.Header>
                            <Card.Body>
                                <div className="mb-3">
                                    Who can see your Profile?
                                    <Form.Check
                                        type="radio"
                                        name="profileView"
                                        value="everyone"
                                        label="Everyone"
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="profileView"
                                        value="myCustomers"
                                        label="My Customers"
                                    />
                                    <Form.Check
                                        type="radio"
                                        name="profileView"
                                        value="onlyMe"
                                        label="Only me"
                                    />
                                </div>
                                <div>
                                    Allowed Communication ways?
                                    <Form.Check
                                        type="radio"
                                        id="via-email"
                                        label="Email address"
                                    />
                                    <Form.Check
                                        type="radio"
                                        id="via-phone"
                                        label="Phone number"
                                    />
                                </div>
                                <hr/>
                                <Form.Check
                                    className="mb-2"
                                    type="checkbox"
                                    label="Delete Activity logs after 30 days"
                                />
                                <Form.Check
                                    type="checkbox"
                                    label="Allow user to show your About me."
                                />
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col>
                        <Card>
                            <HookForm>
                                <Card.Header className="fs-4">Update Password</Card.Header>
                                <Card.Body>
                                    <Input
                                        field={{state: "oldPassword", title: "Old Password"}}
                                        required={false}
                                    />
                                    <Input
                                        field={{state: "newPassword", title: "New Password"}}
                                        required={false}
                                    />
                                    <Input
                                        field={{state: "confirmPassword", title: "Confirm Password"}}
                                        required={false}
                                    />
                                </Card.Body>
                                <Card.Footer className="d-grid ">
                                    <Button size="sm" className="d-block">Update Password</Button>
                                </Card.Footer>
                            </HookForm>
                        </Card>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Settings;
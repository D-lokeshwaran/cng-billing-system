import { Card, Row, Col, Button, Form } from "react-bootstrap";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import { useAuth } from "src/context/AuthContext";
import BasicDetails from "./BasicDetails"
import AccountSettings from "./AccountSettings"
import UpdatePassword from "./UpdatePassword"
import { createContext, useContext } from "react";

const Settings = ({ readonly, readonlyUser }) => {
    const { isCustomer } = useAuth();

    return (
        <Row className="g-4">
            <Col sm={6} lg={7}>
                <BasicDetails {...{readonly, readonlyUser}}/>
            </Col>
            <Col>
                <Row className="g-3 flex-column" >
                    {!isCustomer && <Col>
                        <AccountSettings {...{readonly, readonlyUser}}/>
                    </Col>}
                    <Col>
                        {!readonly && <UpdatePassword/>}
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Settings;
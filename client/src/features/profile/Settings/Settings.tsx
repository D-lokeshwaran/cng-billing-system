import { Card, Row, Col, Button, Form } from "react-bootstrap";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import BasicDetails from "./BasicDetails"
import AccountSettings from "./AccountSettings"
import UpdatePassword from "./UpdatePassword"
import { createContext, useContext } from "react";

const Settings = () => {

    return (
        <Row>
            <Col sm={6} lg={7}>
                <BasicDetails/>
            </Col>
            <Col>
                <Row className="g-3 flex-column" >
                    <Col>
                        <AccountSettings/>
                    </Col>
                    <Col>
                        <UpdatePassword/>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

export default Settings;
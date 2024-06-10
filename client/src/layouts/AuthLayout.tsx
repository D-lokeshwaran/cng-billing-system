import { Row, Col, Card } from "react-bootstrap";
import React from 'react';

interface AuthLayoutProps {
    children: React.ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <section className="py-0">
        <Row className="g-0 min-vh-100 flex-center">
            <Col lg={8} xxl={5} className="p-5 position-relative">
                <Card className="overflow-hidden z-1 text-san-serif">
                    <Card.Body className="p-0">
                        <Row className="h-100 g-0">
                            <Col md={5} className="p-5 bg-success text-white text-center shadow">
                                <h4 className="fw-bolder">
                                    CNG Billing
                                </h4>
                                <div className="mt-5 d-flex-column h-100">
                                    <p className="opacity-75 flex-grow-1">
                                        Manage your customer bills with seemless interface and lot of 
                                        cool customization settings to enrich your experince.
                                    </p>
                                    <span className="pt-4 flex-grow-1">
                                        <hr/>
                                        <p>Read our terms and conditions.</p>
                                    </span>
                                </div>
                            </Col>
                            <Col className="p-5 float-bottom">
                                {children}
                            </Col>
                        </Row>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    </section>
  )
};

export default AuthLayout;
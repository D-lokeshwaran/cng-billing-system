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
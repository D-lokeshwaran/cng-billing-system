import React from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';

interface FeatureHeaderProps {
    title: string,
    className: string,
    children?: React.ReactNode
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({
    title,
    className,
    children
}) => {

    return (
        <Row className={className}>
            <Col sm='auto' xs>
                <h3>{title}</h3>
                <Breadcrumb>
                    <Breadcrumb.Item href="/dashboard">Dashboard</Breadcrumb.Item>
                    <Breadcrumb.Item href="/customers">customers</Breadcrumb.Item>
                    <Breadcrumb.Item active>create customer</Breadcrumb.Item>
                </Breadcrumb>
            </Col>
            <Col sm='auto' xs>
                {children}
            </Col>
        </Row>
    )

}

export default FeatureHeader;
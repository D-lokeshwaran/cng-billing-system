import React from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { Link, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import FlexBox from "src/components/common/FlexBox";

interface FeatureHeaderProps {
    title: String,
    className: String,
    breadcrumbs: {
        title: String,
        path: String
    }[],
    children?: React.ReactNode
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({
    title,
    className,
    breadcrumbs,
    children,
}) => {

    const location = useLocation();

    return (
        <header className="mb-3">
            <Helmet>
                <title>CNG {title || "Billing System"}</title>
            </Helmet>
            <Row className={className}>
                <Col sm='auto' xs>
                    <h3 className="mb-0">{title}</h3>
                </Col>
                <Col sm='auto' xs>
                    {children}
                </Col>
            </Row>
            <FlexBox>
                {breadcrumbs ?
                    breadcrumbs.map(crumb =>
                        <Link to={crumb.path}>{crumb.title}</Link>
                    )
                    : <Link to="/dashboard">Dashboard</Link>
                }
            </FlexBox>
        </header>
    )

}

export default FeatureHeader;
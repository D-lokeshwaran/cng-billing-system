import React, { useState, useEffect } from 'react';
import { Breadcrumb, Row, Col } from 'react-bootstrap';
import { Link, useLocation, useMatches } from "react-router-dom";
import { Helmet } from 'react-helmet-async';
import FlexBox from "src/components/common/FlexBox";

interface FeatureHeaderProps {
    title: String,
    className: String,
    breadcrumbs: {
        title: String,
        path?: String,
        disabled?: boolean,
        hidden?: boolean
    }[],
    children?: React.ReactNode
}

const FeatureHeader: React.FC<FeatureHeaderProps> = ({
    title,
    className,
    breadcrumbs=[],
    children,
}) => {

    const location = useLocation();
    let basePath = "/"+location.pathname.split("/")[1];
    const defaultCrumbs = [{
            title: "Dashboard",
            path: "/dashboard"
        }
    ]
    const alteredBreadcrumbs = [ ...defaultCrumbs, ...breadcrumbs].filter(c => !c.hidden);
    const size = alteredBreadcrumbs.length;

    return (
        <header className="mb-3">
            <Helmet>
                <title>CNG {title || "Billing System"}</title>
            </Helmet>
            <FlexBox justify="between">
                <h3 className="mb-0">{title}</h3>
                {children}
            </FlexBox>
            <FlexBox>
                {alteredBreadcrumbs?.filter(c => !c.hidden).map((crumb, index) =>
                    <>
                        {index == size -1 ?
                            <span className="anker-text anker-text__disabled">{crumb?.title}</span>
                            :<Link to={crumb?.path} className="anker-text">{crumb?.title}</Link>
                        }
                        {index < size -1 && !crumb.hidden && <span className="px-1">.</span>}
                    </>
                )}
            </FlexBox>
        </header>
    )

}

export default FeatureHeader;

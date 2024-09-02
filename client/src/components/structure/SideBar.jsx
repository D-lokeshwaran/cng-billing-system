import React, { useState, useEffect } from 'react';
import { sideBarMenu } from './sideBarMenu';
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom"
import { useAuth } from 'src/context/AuthContext';
import { useAppContext } from 'src/context/AppContext';
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { useRouter, useToggle } from "src/hooks";
import CNGLogo from "src/assets/img/cng-logo.svg";
// ------------------------------------

const SideBar = ({ onNavClick }) => {
    const { user, verifyRole } = useAuth();
    const { config: { theme }} = useAppContext();
    const pathname = useLocation().pathname;
    const [ showMenu, toggleMenu ] = useToggle();

    const router = useRouter();
    let filteredItems = sideBarMenu
        .filter(nav => verifyRole(nav.allowedRoles))

    return (
        <Container fluid className={`sidebar-container`}>
            <Navbar
                expand="lg"
                className="flex-column align-items-start sidebar"
                variant={theme}
                onToggle={showMenu}
            >
                <Navbar.Brand className="p-2 ps-1 m-0 g-0 ms-2 align-items-center pb-2" as={Row}>
                    <Col sm="auto" xs><img src={CNGLogo} height={40} width={40}/></Col>
                    <Col className="fs-4  ms-2">Billing System</Col>
                </Navbar.Brand>
                <Nav activeKey={"/"+pathname.split("/")?.[1]}  className="flex-column w-100 mt-4">
                    { filteredItems.map((nav, i) =>
                        <Nav.Item
                            key={i}
                            path={nav.path}
                            className="mx-1"
                            onClick={() => {
                                router.push(nav.path)
                                onNavClick(nav.path)
                            }}
                        >
                            <Nav.Link eventKey={nav.path} className="d-flex align-items-center">
                                <nav.icon className="me-3 ms-1" size={21} strokeWidth={2}/>
                                <h5 className="mb-0">{nav.title}</h5>
                            </Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
            </Navbar>
        </Container>
    );
};


export default SideBar;

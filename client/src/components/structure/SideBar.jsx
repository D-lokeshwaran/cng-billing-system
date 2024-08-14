import React from 'react'; 
import { sideBarMenu } from './sideBarMenu';
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom"
import { useAuth } from 'src/context/AuthContext';
import { useAppContext } from 'src/context/AppContext';
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";
import { useRouter, useToggle } from "src/hooks";
// ------------------------------------

const SideBar = () => {
    const { user, verifyRole } = useAuth();
    const { config: { theme }} = useAppContext();
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
                <Navbar.Brand className="mx-1 py-3 pb-2">
                    CNG Billing System
                </Navbar.Brand>
                <Nav defaultActiveKey={filteredItems[0]?.path}  className="flex-column w-100 mt-4">
                    { filteredItems.map((nav, i) =>
                        <Nav.Item
                            key={i}
                            path={nav.path}
                            className="mx-1"
                            onClick={() => router.push(nav.path)}
                        >
                            <Nav.Link eventKey={nav.path}>
                                <nav.icon className="me-3 ms-1" size={21} stroke-width={2}/>
                                <span>{nav.title}</span>
                            </Nav.Link>
                        </Nav.Item>
                    )}
                </Nav>
            </Navbar>
        </Container>
    );
};


export default SideBar;

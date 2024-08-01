import React from 'react'; 
import { sideBarMenu } from './sideBarMenu';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom"
import NavItem from './NavItem';
import { useAuth } from 'src/context/AuthContext';
// ------------------------------------

const SideBar = () => {
  const { user, verifyRole } = useAuth();
  let filteredItems = sideBarMenu
    .filter(nav => verifyRole(nav.allowedRoles))

  return (
    <aside className="p-3">
      <Navbar variant="pills" className="flex-column">
          { filteredItems.map((nav, i) =>
              <Nav.Item
                key={i}
                path={nav.path}
                className="text-white my-1"
              >
                <Nav.Link as={Link} to={nav.path} eventKey={nav.path}>{nav.title}</Nav.Link>
              </Nav.Item>
            )
          }
      </Navbar>
    </aside>
  );
};


export default SideBar;

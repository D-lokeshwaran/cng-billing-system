import React from 'react'; 
import { sideBarMenu } from './sideBarMenu';
import NavItem from './NavItem';
import { useAuth } from 'src/context/AuthContext';
// ------------------------------------

const SideBar = () => {
  const { user, verifyRole } = useAuth();
  let filteredItems = sideBarMenu
    .filter(nav => verifyRole(nav.allowedRoles))

  return (
    <aside>
      <nav>
        <ul>
          { filteredItems.map((nav, i) => 
              <NavItem
                key={i} 
                path={nav.path}
                title={nav.title}
              />
            )
          }
        </ul>
      </nav>
    </aside>
  );
};


export default SideBar;

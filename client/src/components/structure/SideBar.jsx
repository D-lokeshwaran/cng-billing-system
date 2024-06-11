import React from 'react'; 
import NavItem from './NavItem';
import { useAuth } from 'src/context/AuthContext';
import { sideBarMenu } from './sideBarMenu';
// ------------------------------------

const SideBar = () => {
  const { user, verifyRole } = useAuth();

  const validItems = sideBarMenu.filter(item => verifyRole(item.allowedRoles));

  if (!user.isAuthenticated) {
    return false;
  }

  return (
    <aside>
      <nav>
        <ul>
          {
            validItems.map((nav, i) => 
              <NavItem
                path={nav.path}
                title={nav.name}
                icon={nav.icon}
              />
            )
          }
        </ul>
      </nav>
    </aside>
  );
};


export default SideBar;

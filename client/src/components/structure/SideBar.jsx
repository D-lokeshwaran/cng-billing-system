import React from 'react'; 
import { navigation } from 'src/routes/navigation';
import NavItem from './NavItem';
import { useAuth } from 'src/context/AuthContext';
// ------------------------------------

const SideBar = () => {
  const { user } = useAuth();
  let filteredItems = navigation
    .filter(nav => nav.allowedRoles?.includes(user.role))

  if (!user.isAuthenticated) {
    return false;
  }

  return (
    <aside>
      <nav>
        <ul>
          { filteredItems.map((nav, i) => 
              <NavItem
                key={i} 
                path={nav.path}
                title={nav.name}
              />
            )
          }
        </ul>
      </nav>
    </aside>
  );
};


export default SideBar;

import React from 'react';
import DashboardIcon from 'src/assets/icons/hui_dashboard.svg';
import ROLES from 'src/constants/ROLES';

type sideBarMenuTypes = {
     path: string,         
     name: string,
     icon: String | React.SVGAttributes<any>,
     allowedRoles?: number[]
}

export const sideBarMenu: sideBarMenuTypes[] = [
     {    
          path: "/dashboard",    
          name: "Dashboard",
          icon:  DashboardIcon,
          allowedRoles: [ROLES.Admin, ROLES.Operator]
     },
     { 
          path: "/bills",   
          name: "Bills",       
          icon:  DashboardIcon,
          allowedRoles: [ROLES.Admin, ROLES.Operator, ROLES.Customer]
     },
     { 
          path: "/customers",  
          name: "Customers",     
          icon:  DashboardIcon,
          allowedRoles: [ROLES.Admin, ROLES.Operator]
     },
     { 
          path: "/tariffs",  
          name: "Tariffs",     
          icon:  DashboardIcon,
          allowedRoles: [ROLES.Admin, ROLES.Operator]
     },
     { 
          path:"/documents",  
          name: "Documents",     
          icon:  DashboardIcon,
          allowedRoles: [ROLES.Admin, ROLES.Operator]
     }
]
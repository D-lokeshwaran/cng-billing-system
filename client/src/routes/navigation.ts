import React, { lazy } from 'react';
import ROLES from 'src/constants/ROLES';


// public routes 
const Error404 = lazy(() => import('src/components/error/Error404'))

const Dashboard = lazy(() => import('src/pages/Dashboard'));
const Bill = lazy(() => import('src/pages/Bill'));
const Customer = lazy(() => import('src/pages/Customer'));
const Tariff = lazy(() => import('src/pages/Tariff'));
const Document = lazy(() => import('src/pages/Documents'));

type NavigationOptions = {
     path: string,         
     name: string,        
     element: React.LazyExoticComponent<any>,  
     allowedRoles?: number[],     
     isPrivate: boolean
}

export const navigation: NavigationOptions[] = [
     {    
          path: "/dashboard",    
          name: "Dashboard",       
          element: Dashboard,      
          allowedRoles: [ROLES.Admin, ROLES.Operator],     
          isPrivate: true  
     },
     { 
          path: "/bills",   
          name: "Bills",       
          element: Bill,      
          allowedRoles: [ROLES.Admin, ROLES.Operator, ROLES.Customer],    
          isPrivate: false  
     },
     { 
          path: "/customers",  
          name: "Customers",     
          element: Customer,   
          allowedRoles: [ROLES.Admin, ROLES.Operator, ROLES.Customer],    
          isPrivate: true  
     },
     { 
          path: "/tariffs",  
          name: "Tariffs",     
          element: Tariff,    
          allowedRoles: [ROLES.Admin, ROLES.Operator],  
          isPrivate: true  
     },
     { 
          path:"/documents",  
          name: "Documents",     
          element: Document,    
          allowedRoles: [ROLES.Admin, ROLES.Operator],  
          isPrivate: true  
     },
     { 
          path: "*",         
          name: "error",        
          element: Error404,       
          isPrivate: false  
     }
]
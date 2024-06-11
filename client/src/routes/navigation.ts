import React, { lazy } from 'react';
import ROLES from 'src/constants/ROLES';


// public routes 
const Dashboard = lazy(() => import('src/features/dashboard/Dashboard'));
const Bill = lazy(() => import('src/features/bill/Bill'));
const Customer = lazy(() => import('src/features/customer/Customer'));
const Tariff = lazy(() => import('src/features/tariff/Tariff'));
const Document = lazy(() => import('src/features/document/Documents'));

export type NavigationTypes = {
     path: string,         
     name: string,        
     element: React.LazyExoticComponent<any>,  
     allowedRoles: number[],     
     isPrivate: boolean
}

export const navigation: NavigationTypes[] = [
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
     }
]
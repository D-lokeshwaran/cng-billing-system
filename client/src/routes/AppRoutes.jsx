import { Navigate, Route, Routes } from "react-router-dom";
import ROLES from "src/constants/ROLES";
import DashboardLayout from "src/layouts/DashboardLayout";
import Layout from "src/layouts/Layout";
import RequireAuth from "src/features/auth/RequireAuth";
import { lazy } from "react";

const Login = lazy(() => import('src/features/auth/Login'));
const Dashboard = lazy(() => import('src/features/dashboard/Dashboard'));
const Bill = lazy(() => import('src/features/bill/Bill'));
const CustomerList = lazy(() => import('src/features/customer/CustomerList'));
const Tariff = lazy(() => import('src/features/tariff/Tariff'));
const Document = lazy(() => import('src/features/document/Documents'));
const Error404 = lazy(() => import("src/features/error/Error404"));


const AppRoutes = () => {
     return (
          <Routes>
               <Route path="/" element={<Layout/>}>
                    {/* Public Route */}
                    <Route path="/login" element={<Login/>} />

                    {/* Dashboard routes */}
                    <Route element={<DashboardLayout/>}>
                         <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator]}/> }>
                              <Route path="/dashboard" element={<Dashboard/>}/>
                              <Route path="/documents" element={<Document/>}/>
                              <Route path="/tariffs" element={<Tariff/>}/>
                         </Route>

                         <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Customer]}/> }>
                              <Route path="/customers" element={<CustomerList/>}/>
                              <Route path="/bills" element={<Bill/>}/>
                         </Route>
                    </Route>
                    
                    {/* Catch all */}
                    <Route path="/404" element={<Error404/>} />
                    <Route path="/*" element={<Navigate to="/login"/>} />
               </Route>
          </Routes>
     )
}

export default AppRoutes;
import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";
import { lazy } from "react";
import ROLES from "src/constants/ROLES";
import Login from "src/features/auth/Login";
import Error404 from "src/components/error/Error404";
import RequireAuth from "src/features/auth/RequireAuth";

const Dashboard = lazy(() => import('src/features/dashboard/Dashboard'));
const Bill = lazy(() => import('src/features/bill/Bill'));
const Customer = lazy(() => import('src/features/customer/Customer'));
const Tariff = lazy(() => import('src/features/tariff/Tariff'));
const Document = lazy(() => import('src/features/document/Documents'));

const AppRoutes = () => {
     return (
          <Routes>
               {/* Public Route */}
               <Route path="/" element={<Navigate to="/login" replace />} />
               <Route path="/login" element={<Login/>} />

               {/* Protected routes */}
               <Route element={<MainLayout/>}>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator]}/> }>
                         <Route path="/dashboard" element={<Dashboard/>} />
                         <Route path="/tariffs" element={<Tariff/>} />
                         <Route path="/documents" element={<Document/>} />
                         <Route path="/customers" element={<Customer/>} />
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator, ROLES.Customer]}/> }>
                         <Route path="/bills" element={<Bill/>} />
                         <Route path="/Customer" element={<Customer/>} />
                    </Route>

               </Route>

               <Route path="*" element={<Error404/>} />
               
          </Routes>
     )
}

export default AppRoutes;
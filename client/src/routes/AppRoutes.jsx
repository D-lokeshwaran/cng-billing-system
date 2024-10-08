import { Navigate, Route, Routes } from "react-router-dom";
import ROLES from "src/constants/ROLES";
import DashboardLayout from "src/layouts/DashboardLayout";
import Layout from "src/layouts/Layout";
import RequireAuth from "src/features/auth/RequireAuth";
import BillContextProvider from "src/context/BillContext";
import { lazy } from "react";

const Login = lazy(() => import('src/features/auth/Login'));
const RecoverPassword = lazy(() => import('src/features/auth/RecoverPassword'));
const ResetPassword = lazy(() => import('src/features/auth/ResetPassword'));
const UpdatePassword = lazy(() => import('src/features/auth/UpdatePassword'));
const Dashboard = lazy(() => import('src/features/dashboard/Dashboard'));

const BillList = lazy(() => import('src/features/bill/BillList'));
const BillDetail = lazy(() => import('src/features/bill/BillDetail'));
const CustomerList = lazy(() => import('src/features/customer/CustomerList'));
const CustomerDetail = lazy(() => import('src/features/customer/CustomerDetail'));
const TariffList = lazy(() => import('src/features/tariff/TariffList'));
const TariffDetails = lazy(() => import('src/features/tariff/TariffDetails'));
const UserList = lazy(() => import('src/features/user/UserList'));
const UserDetails = lazy(() => import('src/features/user/UserDetails'));

const Error404 = lazy(() => import("src/features/error/Error404"));
const Profile = lazy(() => import("src/features/profile/Profile"));


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Layout/>}>
                <Route path="/recover-password" element={<RecoverPassword/>} />
                <Route path="/reset-password" element={<ResetPassword/>} />
                <Route path="/update-password" element={<UpdatePassword/>} />
                {/* Public Route */}
                <Route path="/login" element={<Login/>} />

                {/* Dashboard routes */}
                <Route element={<DashboardLayout/>}>
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator]}/> }>
                        <Route path="dashboard" element={<Dashboard/>}/>
                        <Route path="tariffs" element={<TariffList/>}/>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Customer]}/> }>
                        <Route path="customers" element={<CustomerList/>} />
                        <Route path="bills" element={<BillList/>} />
                        {/* Context provider route to manage state replacement */}
                        <Route element={<BillContextProvider />}>
                            <Route path="tariffs/new" element={<TariffDetails/>}/>
                            <Route path="tariffs/:tariffId" element={<TariffDetails/>}/>
                            <Route path="bills/new" element={<BillDetail/>} />
                            <Route path="bills/:billId" element={<BillDetail/>} />
                            <Route path="customer/new" element={<CustomerDetail/>} />
                            <Route path="customers/:customerId" element={<CustomerDetail/>} />
                        </Route>
                    </Route>

                    <Route path="profile" element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.Operator, ROLES.Customer]}/> }>
                        <Route index element={<Profile pageId="overview"/>}/>
                        <Route path="overview" element={<Profile pageId="overview"/>}/>
                        <Route path="settings" element={<Profile pageId="settings"/>}/>
                        <Route path="activity-log" element={<Profile pageId="activity-log"/>}/>
                    </Route>

                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} /> }>
                        <Route path="users">
                            <Route index element={<UserList/>}/>
                            <Route path=":emailAddress" element={<UserDetails/>}/>
                        </Route>
                    </Route>
                </Route>
            </Route>

            {/* Catch all */}
            <Route path="/404" element={<Error404/>} />
            <Route path="/*" element={<Navigate to="/404"/>} />
        </Routes>
    )
}

export default AppRoutes;
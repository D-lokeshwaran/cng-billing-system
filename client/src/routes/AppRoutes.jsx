import { Navigate, Route, Routes } from "react-router-dom";
import ROLES from "src/constants/ROLES";
import { navigation } from "./navigation";
import { useAuth } from "src/context/AuthContext";
import DashboardLayout from "src/layouts/DashboardLayout";
import Login from "src/features/auth/Login";
import Error404 from "src/features/error/Error404";
import Layout from "src/layouts/Layout";

const AppRoutes = () => {

     const { user, verifyRole } = useAuth();

     const ProtectedRoute = ({ element: Component, allowedRoles }) => {
          const { user, verifyRole } = useAuth();
   
          if (user.isAuthenticated && verifyRole(allowedRoles)) {
              return <Component />;
          } else {
              return <Navigate to="/login" replace />;
          }
     };
   
     const renderProtectedRoutes = navigation.map((route, i) => (
          <Route
              key={i}
              path={route.path}
              element={<ProtectedRoute element={route.element} allowedRoles={route.allowedRoles} />}
          />
     ));

     return (
          <Routes>

               <Route path="/" element={<Layout/>}>
                    {/* Public Route */}
                    <Route path="/login" element={<Login/>} />

                    {/* Protected routes */}
                    <Route element={<DashboardLayout/>}>
                         {renderProtectedRoutes}
                    </Route>
                    
                    {/* Catch all */}
                    <Route path="/404" element={<Error404/>} />
                    <Route path="/*" element={<Navigate to="/login"/>} />
               </Route>

          </Routes>
     )
}

export default AppRoutes;
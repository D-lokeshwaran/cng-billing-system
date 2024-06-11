import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import ROLES from "src/constants/ROLES";
import { navigation } from "./navigation";
import { useAuth } from "src/context/AuthContext";
import MainLayout from "src/layouts/MainLayout";
import Login from "src/features/auth/Login";
import Error404 from "src/components/error/Error404";

const AuthRoute = ({ route }) => {
    const { user, verifyRole } = useAuth();
    let Component = route.element;
    
    if (
         route.isPrivate
         && user.isAuthenticated
         && verifyRole(route.allowedRoles)
    ) {
         return <Component/>
    } else {
         <Navigate to ="/login" replace/>
    }
}

const AppRoutes = () => {
     return (
          <Routes>
               {/* Initial Route */}
               <Route path="/" element={<Navigate to="/login" replace/>} />
               <Route path="/login" element={<Login/>} />

               {/* Protected routes */}
               <Route element={<MainLayout/>}>
                    {navigation.map((route, i) =>
                        <Route
                            key={i}
                            path={route.path}
                            element={<AuthRoute route={route}/>}
                        />
                    )}
               </Route>
               
               {/* Catch all */}
               <Route path="*" element={<Error404/>} />
          </Routes>
     )
}

export default AppRoutes;
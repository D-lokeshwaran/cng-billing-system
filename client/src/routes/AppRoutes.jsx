import { Navigate, Route, Routes } from "react-router-dom";
import { lazy } from "react";

import ROLES from "src/constants/ROLES";
import { navigation } from "./navigation";
import MainLayout from "src/layouts/MainLayout";
import Login from "src/features/auth/Login";
import Error404 from "src/components/error/Error404";
import AuthRoute from "./AuthRoute";

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
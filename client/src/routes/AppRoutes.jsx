import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "src/layouts/MainLayout";
import { lazy } from "react";
import ROLES from "src/constants/ROLES";
import { navigation } from "./navigation";
import { useAuth } from "src/context/AuthContext";
import Login from "src/pages/Login";

const AppRoutes = () => {

     const { user } = useAuth();

     return (
          <Routes>
               {/* Initial Route */}
               <Route path="/" element={<Navigate to="/login"/>} />
               <Route path="/login" element={<Login/>} />

               {/* Protected routes */}
               <Route element={<MainLayout/>}>
                    {
                         navigation.map((route, i) => {
                              let Component = route.element;
                              if (route.isPrivate && user.isAuthenticated) {
                                   return <Route key={i} path={route.path} element={<Component/>}/>
                              } else if (!route.isPrivate) {
                                   return <Route key={i} path={route.path} element={<Component/>}/>
                              } else return false
                         })
                    }
               </Route>
               
          </Routes>
     )
}

export default AppRoutes;
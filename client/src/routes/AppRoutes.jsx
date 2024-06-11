import { Navigate, Route, Routes } from "react-router-dom";
import ROLES from "src/constants/ROLES";
import { navigation } from "./navigation";
import { useAuth } from "src/context/AuthContext";
import MainLayout from "src/layouts/MainLayout";
import Login from "src/features/auth/Login";
import Error404 from "src/components/error/Error404";

const AppRoutes = () => {

     const { user, verifyRole } = useAuth();

     const renderProtectedRoutes =  navigation.map((route, i) => {
          let Component = route.element;
          if (
               route.isPrivate
               && user.isAuthenticated
               && verifyRole(route.allowedRoles)
          ) {
               return <Route key={i} path={route.path} element={<Component/>}/>
          } else if (!route.isPrivate) {
               return <Route key={i} path={route.path} element={<Component/>}/>
          } else return false
     })

     return (
          <Routes>
               {/* Initial Route */}
               <Route path="/" element={<Navigate to="/login" replace/>} />
               <Route path="/login" element={<Login/>} />

               {/* Protected routes */}
               <Route element={<MainLayout/>}>
                    {renderProtectedRoutes}
               </Route>
               
               {/* Catch all */}
               <Route path="*" element={<Error404/>} />
          </Routes>
     )
}

export default AppRoutes;
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";
import { NavigationTypes } from "src/routes/navigation";

interface AuthRouteProps {
    route: NavigationTypes
}

const AuthRoute: React.FC<AuthRouteProps> = ({ route }) => {
     const { user, verifyRole } = useAuth();
     let Component = route.element;

     if (
         route.isPrivate
         && user.isAuthenticated
         && verifyRole(route.allowedRoles)
     ) {
         return <Component/>
     }
     
     return <Navigate to ="/login" replace/>
    
}

export default AuthRoute;
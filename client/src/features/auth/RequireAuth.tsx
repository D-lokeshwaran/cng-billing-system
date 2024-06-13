import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';

interface RequireAuthProps {
    allowedRoles: number[]
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {

    const { user, verifyRole } = useAuth();

    if (
        user.isAuthenticated
        && verifyRole(allowedRoles)
    ) {
        return <Outlet/>
    } else {
        return <Navigate to="/login" />
    }

}

export default RequireAuth;
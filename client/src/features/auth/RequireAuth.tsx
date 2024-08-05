import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';
import { useRouter } from 'src/hooks';

interface RequireAuthProps {
    allowedRoles: number[]
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {

    const { user, verifyRole } = useAuth();
    const router = useRouter();

    if (
        user.isAuthenticated
        && verifyRole(allowedRoles)
    ) {
        return <Outlet/>
    } else {
        return <Navigate to={`${user.isAuthenticated ? "/dashboard" : "/login"}`} />
    }

}

export default RequireAuth;
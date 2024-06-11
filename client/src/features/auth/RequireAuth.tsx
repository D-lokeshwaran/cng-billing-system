import React from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom"
import { useAuth } from "src/context/AuthContext"

interface RequireAuthProps {
    allowedRoles: number[];
}

const RequireAuth: React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const location = useLocation()
    const { user } = useAuth()

    const content = (
        user.isAuthenticated && user.roles.some(role => allowedRoles.includes(role))
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )

    return content
}
export default RequireAuth
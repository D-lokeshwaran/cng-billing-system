import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ROLES from "src/constants/ROLES";
import { useAuth } from "src/context/AuthContext";
import { getDefaultRoute } from "src/routes/navigation";

export default function Layout() {
    const { user } = useAuth();
    const navigateTo = useNavigate();

    useEffect(() => {
        if (user.isAuthenticated) {
            navigateTo(getDefaultRoute(ROLES.Admin))
        } else {
            navigateTo('/login');
        }
    }, [user])

    return <Outlet/>
}
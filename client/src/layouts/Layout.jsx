import React, { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import ROLES from "src/constants/ROLES";
import { useAuth } from "src/context/AuthContext";
import useRouter from "src/hooks/useRouter";
import { getDefaultRoute } from "src/utils/navigation";

export default function Layout() {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user.isAuthenticated) {
            router.push(getDefaultRoute(ROLES.Admin))
        } else {
            router.push('/login');
        }
    }, [user])

    return (
        <Suspense fallback={<>Loading...</>}>
            <Outlet/>
        </Suspense>
    )
}
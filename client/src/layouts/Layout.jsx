import React, { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";
import { useRouter } from "src/hooks";
import PromiseLoader from 'src/components/common/loaders/PromiseLoader'
import { getDefaultRoute } from "src/utils/navigation";

export default function Layout() {
    const path = useLocation().pathname;
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user.isAuthenticated) {
            router.push(path !== "/" ? path : getDefaultRoute(user.role));
            return;
        } else if (path === "/") {
            router.push("/login");
            return
        }
    }, [path])

    return (
        <Suspense fallback={<PromiseLoader/>}>
            <Outlet/>
        </Suspense>
    )
}
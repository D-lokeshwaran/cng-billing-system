import React, { useEffect, Suspense } from "react";
import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";
import { useRouter } from "src/hooks";
import PromiseLoader from 'src/components/common/loaders/PromiseLoader'
import AuthContextPovider from 'src/context/AuthContext';
import AppContextProvider from 'src/context/AppContext';
import { getDefaultRoute } from "src/utils/navigation";

export default function Layout() {
    const path = useLocation().pathname;
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (user.isAuthenticated && path === "/") {
            router.push(getDefaultRoute(user.role));
        } else if (path === "/") {
            router.push("/login");
        }
    }, [path])

    return (
        <AppContextProvider>
            <AuthContextPovider>
                <Suspense fallback={<PromiseLoader/>}>
                    <Outlet/>
                </Suspense>
            </AuthContextPovider>
        </AppContextProvider>
    )
}
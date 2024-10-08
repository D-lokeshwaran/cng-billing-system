import { InternalAxiosRequestConfig } from "axios";
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { supportApi } from "src/utils/api";
import { loginMethod } from "src/config";
import { useLocation } from "react-router-dom";
import ROLES from "src/constants/ROLES";
import { useRouter } from "src/hooks";
import { getDefaultRoute } from "src/utils/navigation";
import { trackPromise } from 'react-promise-tracker';

type user = {
    emailAddress: String,
    role: String,
    isAuthenticated: Boolean
}

interface AuthContextType {
    user: user;
    logIn: (emailAddress: string, password: string) => Promise<boolean>;
    verifyRole: (allowedRoles: String[]) => boolean | null;
    logOut: (callback: VoidFunction) => void;
}

interface CustormAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

let initialUser = { 
    name: "", 
    role: ROLES.Admin,
    isAuthenticated: false 
};


function AuthContextPovider({ children }: {children: React.ReactNode}) {

    const [ user, setUser ] = useState<user>(initialUser);
    const [ token, setToken ] = useState<any>(null);
    const router = useRouter();
    const path = useLocation().pathname;

    // Refresh token if user loggedin.
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await trackPromise(supportApi.get('/refresh', { withCredentials: true }));
                const { emailAddress, accessToken, role } = response.data;
                console.log(role)
                setToken(accessToken);
                setUser({ ...user, emailAddress, role, isAuthenticated: true });
                router.push(path || getDefaultRoute(role))
            } catch {
                setToken(null);
                router.push("/login");
            }
        }
        fetchMe();
    }, [])

    // Apply token on request if not a retry.
    useLayoutEffect(() => {
        const authInterceptor = supportApi.interceptors.request.use(
            (config: CustormAxiosRequestConfig) => {
                config.headers.authorization = 
                    !config._retry && token 
                    ? `Bearer ${token}`
                        : config.headers.authorization
                return config;
            }
        )
        return () => {
            supportApi.interceptors.request.eject(authInterceptor);
        }
    }, [])

    // Create token after token expired.
    useLayoutEffect(() => {
        const refreshInterceptor = supportApi.interceptors.request.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config;
                
                if (
                    error.response.status == 403 &&
                    error.response.data.message === "Unauthorized"
                ) {
                    try {
                        const response = await trackPromise(supportApi.get('/refresh', { withCredentials: true }));
                        
                        setToken(response.data.accessToken);

                        originalRequest.headers.authorization = 
                                `Bearer ${response.data.accessToken}`;
                        originalRequest._retry = true;

                        return trackPromise(supportApi(originalRequest));
                    } catch (error) {
                        setToken(null);
                    }
                }
            }
        )
        return () => {
            supportApi.interceptors.request.eject(refreshInterceptor);
        }
    }, [])

    const logIn = async (emailAddress: any, password: any) => {
        try {
            const response = await trackPromise(supportApi.post('/auth', {emailAddress, password}));
            const { accessToken, ...userData } = response.data;
            if (accessToken) {
                setToken(accessToken);
                console.log(userData);
                setUser({
                    ...user,
                    emailAddress: userData.emailAddress,
                    role: userData.role,
                    isAuthenticated: true
                });
                return getDefaultRoute(userData?.role)
            } else {
                setUser({
                    ...user,
                    emailAddress: userData.emailAddress,
                    role: userData.role,
                    isAuthenticated: false
                });
                return "/update-password"
            }
            return userData;
        }  catch (error) { 
            setToken(null);
            return false;
        }
    }

    const verifyRole = (allowedRoles: String[]) => {
        if (!allowedRoles || !user.isAuthenticated) {
            return false;
        }
        return allowedRoles.includes(user.role);
    }

    const logOut = async (callback: VoidFunction) => {
        try {
            await trackPromise(supportApi.get('/logout'));
            setToken(null);

        } catch (error) { 
            setToken(null);
        }
    }

    let values = {
        user,
        logIn,
        verifyRole,
        logOut,
        isCustomer: user.role === ROLES.Customer,
        isAdmin: user.role === ROLES.Admin,
        isOperator: user.role === ROLES.Operator,
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextPovider;

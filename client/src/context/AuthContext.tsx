import { InternalAxiosRequestConfig } from "axios";
import React, { createContext, useContext, useEffect, useLayoutEffect, useState } from "react";
import { supportApi } from "src/utils/api";
import { loginMethod } from "src/config";
import ROLES from "src/constants/ROLES";

type user = {
    name: string,
    roles: number[],
    isAuthenticated: boolean
}

interface AuthContextType {
    user: user;
    logIn: (emailAddress: string, password: string) => Promise<boolean>;
    verifyRole: (allowedRoles: number[]) => boolean | null;
    logOut: (callback: VoidFunction) => void;
}

interface CustormAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean
}

const AuthContext = createContext<AuthContextType>(null!);
export const useAuth = () => useContext(AuthContext);

let initialUser = { 
    name: "", 
    roles: [ROLES.Admin], 
    isAuthenticated: false 
};


function AuthContextPovider({ children }: {children: React.ReactNode}) {

    const [ user, setUser ] = useState<user>(initialUser);
    const [ token, setToken ] = useState<any>(null);

    // Refresh token if user loggedin.
    useEffect(() => {
        const fetchMe = async () => {
            try {
                const response = await supportApi.get('/refresh', { withCredentials: true });
                setToken(response?.data.accessToken);
                setUser({...user, isAuthenticated: true})
            } catch {
                setToken(null);
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
                        const response = await supportApi.get('/refresh', { withCredentials: true });
                        
                        setToken(response.data.accessToken);

                        originalRequest.headers.authorization = 
                                `Bearer ${response.data.accessToken}`;
                        originalRequest._retry = true;

                        return supportApi(originalRequest);
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
            if (loginMethod == 'fake') {
                setUser({ ...user, isAuthenticated: true});
                return true;
            }
            const response = await supportApi.post('/auth', {emailAddress, password});
            const { accessToken, ...userData } = response.data;
            setToken(accessToken);
            console.log(userData);
            setUser({
                ...user,
                emailAddress: userData.emailAddress,
                isAuthenticated: true
            });
            return true;
        }  catch (error) { 
            setToken(null);
            return false;
        }
    }

    const verifyRole = (allowedRoles: number[]) => {
        if (!allowedRoles || !user.isAuthenticated) {
            return false;
        }
        return user.roles.some(role => allowedRoles.includes(role));
    }

    const logOut = async (callback: VoidFunction) => {
        try {
            await supportApi.get('/logout');
            setToken(null)
        } catch (error) { 
            setToken(null);
        }
    }

    let values = {
        user,
        logIn,
        verifyRole,
        logOut
    };

    return (
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextPovider;

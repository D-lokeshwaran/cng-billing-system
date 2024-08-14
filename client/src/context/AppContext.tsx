import React, { createContext, useContext, useState, useEffect } from 'react';
import { settings } from "src/config"
import localforage from "localforage";

type AppInfoType = {
    theme: string
}

type AppContextType = {
    appInfo: AppInfoType,
}

const AppContext = createContext<AppContextType>(null!);
export const useAppContext = () => useContext(AppContext);

const getLocalConfig = () => {
    const value = localforage.getItem("config")
        .catch(err => console.log("no config exists"));
    return value;
}

function AppContextProvider({ children }: {children: React.ReactNode}) {

    const [config, setAppConfig] = useState<AppInfoType | null>(settings);

    const setConfig = (key: string, value: object) => {
        localforage.setItem("config", {...getLocalConfig(), [key]: value })
            .catch(err => console.log(`failed to load ${key}`))
        setAppConfig({...config, [key]: value })
    }

    useEffect(() => {
        localforage.getItem("config")
            .then(val => setAppConfig({...val}))
        document.documentElement.setAttribute(
            'data-bs-theme',
            config?.theme == "dark" ? 'dark' : 'light'
        );
    }, [config?.theme])

    return (
        <AppContext.Provider value={{ config, setConfig }}>
            {children}
        </AppContext.Provider>
    )

}

export default AppContextProvider;
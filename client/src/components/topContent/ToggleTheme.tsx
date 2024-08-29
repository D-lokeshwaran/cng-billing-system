import React from "react";
import { Sun03Icon, Moon02Icon } from "hugeicons-react"
import IconButton from "../common/IconButton";
import { useAppContext } from "src/context/AppContext";

const ToggleTheme = (props) => {
    const { config: {
        theme
    }, setConfig } = useAppContext();

    const handleThemeToggle = () => {
        const nextTheme = theme == "dark" ? "light" : "dark";
        setConfig("theme", nextTheme);
    }

    return (
        <IconButton
            id="toggle-theme"
            icon={theme == "light" ? Sun03Icon : Moon02Icon}
            onClick={handleThemeToggle}
            {...props}
        />
    )
}

export default ToggleTheme;
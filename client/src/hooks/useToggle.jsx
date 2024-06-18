import { useState } from "react"

export const useToggle = (initalVal= false) => {

    const [ active, setActive ] = useState(initalVal)

    function toggle() {
        setActive(!active);
    }

    return [ active, toggle ]
}
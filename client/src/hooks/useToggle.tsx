import { useState } from "react";

export const useToggle = (initialVal: boolean= false): [
    active: boolean, 
    toggle: () => void
] => {

    const [ active, setActive ] = useState(initialVal)

    function toggle() {
        setActive(!active);
    }

    return [ active, toggle ]
}
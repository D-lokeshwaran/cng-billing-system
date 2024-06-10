import React from 'react';
import { Link } from 'react-router-dom';

interface NavItemProps {
    title: string,
    icon: string,
    path: string
}

const NavItem: React.FC<NavItemProps> = ({ title, icon, path }) => {

    return (
        <li aria-label={title}>
            <Link to={path}>
                <img src={icon} /> {title}
            </Link>
        </li>
    )
}

export default NavItem;
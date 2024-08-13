import DashboardIcon from 'src/assets/icons/hui_dashboard.svg';
import ROLES from 'src/constants/ROLES';

type sideBarMenu = {
    title: string,
    path: string,
    icon: string,
    allowedRoles: number[]
}

export const sideBarMenu: sideBarMenu[] = [
    {
        title: "Dashboard",
        path: "/dashboard",
        icon: DashboardIcon,
        allowedRoles: [ROLES.Admin, ROLES.Operator]
    },
    {
        title: "Customers",
        path: "/customers",
        icon: DashboardIcon,
        allowedRoles: [ROLES.Admin, ROLES.Operator]
    },
    {
        title: "Bills",
        path: "/bills",
        icon: DashboardIcon,
        allowedRoles: [ROLES.Admin, ROLES.Operator, ROLES.Customer]
    },
    {
        title: "Tariff",
        path: "/tariffs",
        icon: DashboardIcon,
        allowedRoles: [ROLES.Admin, ROLES.Operator]
    },
    {
        title: "Users",
        path: "/users",
        icon: DashboardIcon,
        allowedRoles: [ROLES.Admin]
    }
]
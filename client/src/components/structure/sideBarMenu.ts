import {
    Analytics02Icon,
    UserGroupIcon,
    Invoice01Icon,
    CouponPercentIcon,
    UserMultiple02Icon
} from "hugeicons-react";
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
        icon: Analytics02Icon,
        allowedRoles: [ROLES.Admin, ROLES.Operator]
    },
    {
        title: "Customers",
        path: "/customers",
        icon: UserGroupIcon,
        allowedRoles: [ROLES.Admin, ROLES.Operator]
    },
    {
        title: "Bills",
        path: "/bills",
        icon: Invoice01Icon,
        allowedRoles: [ROLES.Admin, ROLES.Operator, ROLES.Customer]
    },
    {
        title: "Tariff",
        path: "/tariffs",
        icon: CouponPercentIcon,
        allowedRoles: [ROLES.Admin, ROLES.Operator]
    },
    {
        title: "Users",
        path: "/users",
        icon: UserMultiple02Icon,
        allowedRoles: [ROLES.Admin]
    }
]
import ROLES from "src/constants/ROLES";

export const getDefaultRoute = (userRole) => {
    if (userRole === ROLES.Admin) {
         return '/dashboard';
    } else if (userRole === ROLES.Operator) {
         return '/dashboard'
    } else if (userRole === ROLES.Customer) {
         return '/bills'
    }
}
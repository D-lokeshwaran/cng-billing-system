export const getDefaultRoute = (userRole) => {
    if (userRole === 'admin') {
        return '/dashboard';
    } else if (userRole === 'customer') {
        return '/my-profile'
    }
}
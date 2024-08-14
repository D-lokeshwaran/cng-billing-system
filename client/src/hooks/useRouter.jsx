import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const getState = (href) => {
        if (location.state?.breadcrumbs) {
            return [ ...location.state?.breadcrumbs, href ];
        }
        return [href];
    }

    const router = {
        back: () => navigate(-1),
        forward: () => navigate(1),
        reload: () => navigate(location.pathname),
        push: (href) => navigate(href, { state: { breadcrumbs: getState(href) }}),
        pushReplace: (href) => navigate(href, { replace: true }),
    }

    return router;
}
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useRouter = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const router = {
        back: () => navigate(-1),
        forward: () => navigate(1),
        reload: () => navigate(location.pathname),
        push: (href) => navigate(href),
        pushReplace: (href) => navigate(href, { replace: true }),
    }

    return router;
}
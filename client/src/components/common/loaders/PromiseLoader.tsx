import React, { useState, useEffect } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { useLocation } from "react-router-dom";
import CarSpinner from "src/assets/img/car-spinner.svg";

const PromiseLoader = () => {
    const [loading, setLoading] = useState(false);
    const { promiseInProgress } = usePromiseTracker();
    const { pathname } = useLocation();

    useEffect(() => {
        let isMounted = true;
        const delay = promiseInProgress ? 1000 : 500;
        const task = new Promise((resolve) => {
            setTimeout(resolve, delay);
        });

        setLoading(true);
        task.then(() => {
            if (isMounted) {
                setLoading(false);
            }
        });
        return () => {
            isMounted = false;
            setLoading(false);
        };
    }, [promiseInProgress, pathname]);

    return (loading || promiseInProgress) ? (
        <div className="car-loader">
            <img src={CarSpinner} height={50} alt="Loading..." />
        </div>
    ) : null;
}

export default PromiseLoader;

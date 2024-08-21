import React, { useRef, useEffect, useState, useLayoutEffect } from 'react';
import { usePromiseTracker } from 'react-promise-tracker';
import { useLocation } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import CarSpinner from "src/assets/img/car-spinner.svg";

const PromiseLoader = () => {

    const tasks = useRef();
    const [ loading, setLoading ] = useState(false);
    const { promiseInProgress } = usePromiseTracker();
    const { pathname } = useLocation();

    const delay = () => {
        const delay = promiseInProgress === true ? 300 : 100
        return new Promise((done) => setTimeout(done, delay));
    }

    const execute = async (tasks) => {
        await Promise.all(tasks)
    }

    useEffect(() => {
        tasks.current = Array(0);
    }, [pathname])

    useEffect(() => {
        setLoading(true);
        const task = delay();
        tasks.current = [...tasks.current, task];
        execute(tasks.current).then(() => setLoading(false));
        return () => setLoading(false);
    }, [promiseInProgress]);

    return loading ?
        <div className="car-loader">
            <img src={CarSpinner} height={50}/>
        </div>
        : null

}

export default PromiseLoader;

import React from 'react';
import { usePromiseTracker } from 'react-promise-tracker';

const PageLoading = () => {
    const { promiseInProgress } = usePromiseTracker();

    if (promiseInProgress) {
        return <div>Loading...</div>
    }

    return false;
}

export default PageLoading;

import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

const Dashboard: FC = () => {
    return (
        <>        
            <Helmet>
                <title>CNG Dashboard</title>
            </Helmet>
            <div>Dashboard Page</div>
        </>
    )

}
export default Dashboard
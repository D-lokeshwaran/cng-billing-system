import { createContext, useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

type BillContextType = {
    unitsConsumed: number,
    billingDate: Date,
    editDetails: boolean,
    customerId: number
}

const BillContext = createContext<BillContextType>();
export const useBillContext = () => useContext(BillContext);

function BillContextProvider() {

    const [billDetails, setBillDetails] = useState<BillContextType>();

    useEffect(() => {
        return () => setBillDetails(null);
    }, [])

    return (
        <BillContext.Provider value={{ billDetails, setBillDetails }}>
            <Outlet/>
        </BillContext.Provider>
    )

}

export default BillContextProvider;
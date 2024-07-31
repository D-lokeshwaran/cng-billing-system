import { createContext, useContext, useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

type BillDetailsType = {
    unitsConsumed?: number | undefined,
    billingDate?: Date,
    customerId?: number,
    billId?: number,
    billEditable?: boolean,
}

type BillContextType = {
    billDetails: BillDetailsType | null | undefined,
    setBillDetails: (billDetails: BillDetailsType) => void;
}

const BillContext = createContext<BillContextType>(null!);
export const useBillContext = () => useContext(BillContext);

function BillContextProvider() {

    const [billDetails, setBillDetails] = useState<BillDetailsType | null>();

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
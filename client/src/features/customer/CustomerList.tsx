import { FC } from 'react';
import customerSlice from './customerSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';
import { Button } from 'react-bootstrap';
import { useRouter } from 'src/hooks';

const CustomerList: FC = () => {

    const router = useRouter();
    
    const handleAddCustomer = () => {
        router.push('/customers/new')
    }

    const getRowProps = (row: any) => {
        return {
            onDoubleClick: () => {
                const customerId = row.original.id;
                router.push(`/customers/${customerId}`)
            }
        }
    }

    return (
        <div>
            <Button 
                variant="success"
                onClick={handleAddCustomer}
            >
                + Customer
            </Button>
            <ReadyMadeTable slice={customerSlice} rowProps={getRowProps}/>
        </div>
    );

}
export default CustomerList

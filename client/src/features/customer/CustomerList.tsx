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

    return (
        <div>
            <Button 
                variant="success"
                onClick={handleAddCustomer}
            >
                + Customer
            </Button>
            <ReadyMadeTable slice={customerSlice}/>
        </div>
    );

}
export default CustomerList
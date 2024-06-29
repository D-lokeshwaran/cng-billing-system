import { FC, MouseEvent } from 'react';
import customerSlice from './customerSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';
import { Button } from 'react-bootstrap';
import { useRouter } from 'src/hooks';
import { RowData } from '@tanstack/react-table';

const CustomerList: FC = () => {

    const router = useRouter();
    
    const handleAddCustomer = () => {
        router.push('/customers/new')
    }

    const getRowProps = (row: RowData) => {
        return {
            onDoubleClick: (event: MouseEvent<HTMLTableRowElement>) => {
                console.log(row, event);
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
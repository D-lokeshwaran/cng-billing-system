import { FC } from 'react';
import billSlice from './billSlice';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useRouter, useTableAdapter } from 'src/hooks';
import { ACTIONS } from 'src/constants/labels';
import ColumnChooser from 'src/components/table/ColumnChooser';
import ExportData from 'src/components/common/ExportData';
import TanStackTable from 'src/components/table/TanStackTable';
import Pagination from 'src/components/table/Pagination';

const CustomerList: FC = () => {

    const router = useRouter();
    const { 
        name,
        columns, 
        params,
        _mock, 
        columnVisibility
    } = billSlice;

    const table = useTableAdapter({
        columns,
        name,
        params,
        columnVisibility,
        _mock
    });
    
    const handleAddCustomer = () => {
        router.push('/bills/new')
    }

    const getRowProps = (row: any) => {
        return {
            onDoubleClick: () => {
                const billId = row.original.id;
                router.push(`/bills/${billId}`)
            }
        }
    }

    return (
        <div>
            <Button 
                variant="success"
                onClick={handleAddCustomer}
            >
                + {ACTIONS.BILL}
            </Button>
            <section>
                <Card>
                    <Card.Header>
                        <ColumnChooser table={table} />
                        <ExportData filename={name} table={table}/>
                    </Card.Header>
                    <Card.Body>
                        <TanStackTable table={table} rowProps={getRowProps}/>
                    </Card.Body>
                    <Card.Footer>
                        <Pagination table={table}/>
                    </Card.Footer>
                </Card>
            </section>
        </div>
    );

}
export default CustomerList

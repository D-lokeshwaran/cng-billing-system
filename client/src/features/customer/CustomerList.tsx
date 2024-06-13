import { FC } from 'react';
import useTableAdapter from 'src/hooks/useTableAdapter';
import TanStackTable from 'src/components/table/TanStackTable'
import { Customer, columns } from './customerSlice';

const CustomerList: FC = () => {

    const table = useTableAdapter<Customer>({
         columns, params: {
            url: '/cng/customers',
            name: "customers"
        }
    })

    return (
        <div>
            <TanStackTable table={table}/>
        </div>
    );

}
export default CustomerList
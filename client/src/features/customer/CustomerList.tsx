import { FC } from 'react';
import useTableAdapter from 'src/components/table/hooks/useTableAdapter';
import { Person, columns, defaultData } from './customerSlice';
import { url } from 'inspector';

const CustomerList: FC = () => {

    const table = useTableAdapter<Person>({
        data: defaultData, columns, params: {
            url: '/customers',
            method: "GET"
        }
    })

    return (
        <div>Customer Page</div>
    )

}
export default CustomerList
import { FC } from 'react';
import customerSlice from './customerSlice';
import ReadyMadeTable from 'src/components/table/ReadyMadeTable';

const CustomerList: FC = () => {

    return (
        <div>
            <ReadyMadeTable slice={customerSlice}/>
        </div>
    );

}
export default CustomerList
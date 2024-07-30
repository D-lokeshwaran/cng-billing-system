import { Table } from '@tanstack/react-table';
import { Badge, ListGroup } from 'react-bootstrap';
import { startCase } from "lodash";
import { Bill } from './billSlice';

type FilterItem = {
    status: string,
    count: number
}

const StatusFilter = ({
    table
}: { table: Table<Bill> }) => {

    const filterByStatus = (status: string) => 
        table.getCoreRowModel().rows.filter((row: any) => row.original.paymentStatus?.toUpperCase() === status.toUpperCase())
    const filterItems: FilterItem[] = ["Pending", "Completed", "Overdue", "NotBilled"]
        .map( status => { 
            return { status: startCase(status), count: filterByStatus(status).length };
        });
    filterItems.unshift({ status: "All", count: table.getCoreRowModel().rows.length})

    const handleStatusClick = (status: string) => {
        if (status.toUpperCase() === "ALL") {
            table.resetColumnFilters();
            return
        }
        table.setColumnFilters([{
            id: "paymentStatus",
            value: status
        }]);
    }

    return (
        <ListGroup horizontal>
            {filterItems.map(item => 
                <ListGroup.Item 
                    key={item.status}
                    onClick= {() => handleStatusClick(item.status)}
                    className="cursor-pointer"
                    eventKey={item.status}
                >
                    <span className='me-2'>{item.status}</span>
                    <Badge>{item.count}</Badge>
                </ListGroup.Item>
            )}
        </ListGroup>
    )

}

export default StatusFilter;
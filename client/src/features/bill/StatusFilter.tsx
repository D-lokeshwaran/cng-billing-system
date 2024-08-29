import { Table } from '@tanstack/react-table';
import { Badge, ListGroup } from 'react-bootstrap';
import FlexBox from "src/components/common/FlexBox";
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
    const getVariant = (status) => {
        switch (status) {
            case "All": return "dark"
            case "Pending": return "warning"
            case "Completed": return "success"
            case "Overdue": return "danger"
        }
    }
    return (
        <ListGroup horizontal className="flex-wrap" defaultActiveKey="All">
            {filterItems.map(item => 
                <ListGroup.Item 
                    key={item.status}
                    onClick= {() => handleStatusClick(item.status)}
                    className="cursor-pointer"
                    eventKey={item.status}
                    as={FlexBox}
                >
                    <span className='me-2 fw-medium'>{item.status}</span>
                    <Badge
                        className={"badge-" + (getVariant(item.status) || "secondary")}
                        bg="none"
                    >
                        {item.count}
                    </Badge>
                </ListGroup.Item>
            )}
        </ListGroup>
    )

}

export default StatusFilter;
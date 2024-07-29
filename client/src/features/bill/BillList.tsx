import { FC } from 'react';
import billSlice from './billSlice';
import { Card, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useRouter, useTableAdapter } from 'src/hooks';
import { ACTIONS } from 'src/constants/labels';
import ColumnChooser from 'src/components/table/ColumnChooser';
import ExportData from 'src/components/common/ExportData';
import TanStackTable from 'src/components/table/TanStackTable';
import Pagination from 'src/components/table/Pagination';
import { createColumnHelper } from '@tanstack/react-table';
import { coreApi } from 'src/utils/api';
import DefaultRowActions from 'src/components/common/DefaultRowActions';
import FlexBox from 'src/components/common/FlexBox';
import { Delete02Icon } from "hugeicons-react";
import StatusFilter from './StatusFilter';

const CustomerList: FC = () => {

    const router = useRouter();
    const columnHelper = createColumnHelper<Customer>();
    const { 
        name,
        columns, 
        params,
        _mock, 
        columnVisibility
    } = billSlice;

    const { table, setData } = useTableAdapter({
        columns: [
            ...columns,
            columnHelper.display({
                id: 'actions',
                cell: ({row, ...props}) => <DefaultRowActions
                    {...{props, row}}
                    onDelete={handleDelete}
                    onEdit={() => router.push(`/bills/${row.original.id}`)}
                />
            })
        ],
        name,
        params,
        columnVisibility,
        _mock
    });

    const selectedRowIds = table.getSelectedRowModel().rows.map(row => row.original.id);
    const selectedRowsCount = selectedRowIds.length;
    const refreshData = async () => {
        const updatedData = await coreApi.get("/cng/bills");
        const customers = updatedData.data._embedded.bills;
        setData(customers);
        table.reset();
    }
    const handleDelete = async (bill) => {
        await coreApi.delete(`/cng/bills/${bill.id}`);
        refreshData();
    }
    const handleBulkDelete = async () => {
        await coreApi({
            url: `/cng/bulk-delete-bills`,
            method: "delete",
            data: {
                ids: selectedRowIds
            }
        });
        refreshData();
    }

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
                    {selectedRowsCount > 0  ?
                        <Card.Header as={FlexBox} justify="between">
                            <div>{`${selectedRowsCount} Rows selected`}</div>
                            <Delete02Icon onClick={handleBulkDelete}/>
                        </Card.Header>
                        : <Card.Header as={Row}>
                            <Col>
                                <StatusFilter table={table}/>
                            </Col>
                            <Col>
                                <ColumnChooser table={table} />
                                <ExportData filename={name} table={table}/>
                            </Col>
                        </Card.Header>
                    }
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

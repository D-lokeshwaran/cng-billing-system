import { FC, useMemo, useState, useEffect } from 'react';
import customerSlice, { Customer } from './customerSlice';
import TanStackTable from 'src/components/table/TanStackTable';
import { createColumnHelper } from '@tanstack/react-table';
import DefaultRowActions from 'src/components/common/DefaultRowActions'
import { Button, Card } from 'react-bootstrap';
import { useRouter, useTableAdapter } from 'src/hooks';
import ExportData from 'src/components/common/ExportData';
import SearchBoxInput from 'src/components/common/SearchBoxInput';
import ColumnChooser from 'src/components/table/ColumnChooser';
import Pagination from 'src/components/table/Pagination';
import FlexBox from 'src/components/common/FlexBox';
import { Delete02Icon } from "hugeicons-react";
import { coreApi } from "src/utils/api";

const CustomerList: FC = () => {

    const router = useRouter();
    const columnHelper = createColumnHelper<Customer>();
    const { table, setData } = useTableAdapter({
        ...customerSlice,
        columns: useMemo(() => [
            ...customerSlice.columns,
            columnHelper.display({
                id: 'actions',
                cell: ({row, ...props}) => <DefaultRowActions
                    {...{props, row}}
                    onDelete={handleDelete}
                    onEdit={() => router.push(`/customers/${row.original.id}`)}
                />
            })
        ], [])
    })
    const selectedRowIds = table.getSelectedRowModel().rows.map(row => row.original.id);
    const selectedRowsCount = selectedRowIds.length;

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

    // Delete features
    const refreshData = async () => {
        const updatedData = await coreApi.get("/cng/customers");
        const customers = updatedData.data._embedded.customers;
        setData(customers);
        table.reset();
    }
    const handleDelete = async (customer) => {
        await coreApi.delete(`/cng/customers/${customer.id}`);
        refreshData();
    }
    const handleBulkDelete = async () => {
        await coreApi({
            url: `/cng/bulk-delete-customers`,
            method: "delete",
            data: {
                ids: selectedRowIds
            }
        });
        refreshData();
    }

    return (
        <div>
            <Button 
                variant="success"
                onClick={handleAddCustomer}
            >
                + Customer
            </Button>
            <Card>
                {selectedRowsCount > 0  ?
                    <Card.Header as={FlexBox} justify="between">
                        <div>{`${selectedRowsCount} Rows selected`}</div>
                        <Delete02Icon onClick={handleBulkDelete}/>
                    </Card.Header> :
                    <Card.Header>
                        <SearchBoxInput
                            value={table.getState().globalFilter ?? ''}
                            onChange={(value) => table.setGlobalFilter(String(value))}
                            debounce={200}
                        />
                        <ColumnChooser table={table} displayColumns={["rowSelect", "actions"]}/>
                        <ExportData filename="customers" table={table}/>
                    </Card.Header>
                }
                <Card.Body>
                    <TanStackTable table={table} rowProps={getRowProps}/>
                </Card.Body>
                <Card.Footer>
                    <Pagination table={table}/>
                </Card.Footer>
            </Card>
        </div>
    );

}
export default CustomerList
import { FC, useMemo, useState, useEffect } from 'react';
import customerSlice, { Customer } from './customerSlice';
import TanStackTable from 'src/components/table/TanStackTable';
import { createColumnHelper } from '@tanstack/react-table';
import DefaultRowActions from 'src/components/common/DefaultRowActions'
import { Button, Card, Row, Col } from 'react-bootstrap';
import FeatureHeader from "src/components/structure/FeatureHeader";
import { useRouter, useTableAdapter } from 'src/hooks';
import ExportData from 'src/components/common/ExportData';
import SearchBoxInput from 'src/components/common/SearchBoxInput';
import ColumnChooser from 'src/components/table/ColumnChooser';
import Pagination from 'src/components/table/Pagination';
import FlexBox from 'src/components/common/FlexBox';
import { Delete02Icon } from "hugeicons-react";
import { trackPromise } from 'react-promise-tracker';
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
        const updatedData = await trackPromise(coreApi.get("/cng/customers"));
        const customers = updatedData.data._embedded.customers;
        setData(customers);
        table.reset();
    }
    const handleDelete = async (customer) => {
        await trackPromise(coreApi.delete(`/cng/customers/${customer.id}`));
        refreshData();
    }
    const handleBulkDelete = async () => {
        await trackPromise(coreApi({
            url: `/cng/bulk-delete-customers`,
            method: "delete",
            data: {
                ids: selectedRowIds
            }
        }));
        refreshData();
    }

    return (
        <div>
            <FeatureHeader title="Customers" className="justify-content-between">
                <Button
                    variant="success"
                    onClick={handleAddCustomer}
                >
                    + Customer
                </Button>
            </FeatureHeader>
            <Card>
                <div className="py-2">
                    {selectedRowsCount > 0  ?
                        <Card.Header as={FlexBox} justify="between">
                            <div>{`${selectedRowsCount} Rows selected`}</div>
                            <Delete02Icon onClick={handleBulkDelete}/>
                        </Card.Header> :
                        <Card.Header as={Row} className="justify-content-between mb-0">
                            <Col lg="4" md="3">
                                <SearchBoxInput
                                    value={table.getState().globalFilter ?? ''}
                                    onChange={(value) => table.setGlobalFilter(String(value))}
                                    debounce={200}
                                />
                            </Col>
                            <Col sm="auto" xs className="d-flex">
                                <ColumnChooser
                                    table={table}
                                    displayColumns={["rowSelect", "actions"]}
                                />
                                <ExportData filename="customers" table={table}/>
                            </Col>
                        </Card.Header>
                    }
                </div>
                <Card.Body className="p-0 table-container">
                    <TanStackTable table={table} rowProps={getRowProps}/>
                </Card.Body>
                <Card.Footer> {/* rgb(23 26 51) rgb(58 59 69 / 53%) */}
                    <Pagination table={table}/>
                </Card.Footer>
            </Card>
        </div>
    );

}
export default CustomerList
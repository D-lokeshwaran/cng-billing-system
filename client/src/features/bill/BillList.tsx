import { FC, useEffect, useCallback, useMemo } from 'react';
import billSlice from './billSlice';
import { Card, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useRouter, useTableAdapter } from 'src/hooks';
import { ACTIONS } from 'src/constants/labels';
import ColumnChooser from 'src/components/table/ColumnChooser';
import FeatureHeader from 'src/components/structure/FeatureHeader';
import ExportData from 'src/components/common/ExportData';
import TanStackTable from 'src/components/table/TanStackTable';
import Pagination from 'src/components/table/Pagination';
import { createColumnHelper } from '@tanstack/react-table';
import { coreApi } from 'src/utils/api';
import DefaultRowActions from 'src/components/common/DefaultRowActions';
import { trackPromise } from 'react-promise-tracker';
import FlexBox from 'src/components/common/FlexBox';
import { Delete02Icon } from "hugeicons-react";
import StatusFilter from './StatusFilter';

const CustomerList: FC = () => {

    const router = useRouter();
    const columnHelper = createColumnHelper<Customer>();
    const { 
        name,
        columns, 
        _mock,
        columnVisibility
    } = billSlice;

    const { table, setData } = useTableAdapter({
        columns: useMemo(() => [
            columnHelper.display({
                id: "customer",
                header: "Customer",
                cell: ({ row }) => {
                    const customer = row.original.customer;
                    return (
                        <div>
                           <p className="mb-0">{customer?.fullName}</p>
                           <p>{customer?.accountNumber}</p>
                        </div>
                    )
                },
                enableHiding: false
            }),
            ...columns,
            columnHelper.display({
                id: 'actions',
                cell: ({row, ...props}) => <DefaultRowActions
                    {...{props, row}}
                    onDelete={handleDelete}
                    onEdit={() => router.push(`/bills/${row.original.id}`)}
                />
            })
        ], []),
        name,
        columnVisibility,
        _mock
    });

    useEffect(() => {
        refreshData();
    }, [])

    const selectedRowIds = table.getSelectedRowModel().rows.map(row => row.original.id);
    const selectedRowsCount = selectedRowIds.length;
    const refreshData = useCallback(async () => {
        const updatedData = await trackPromise(coreApi.get("/cng/bills-with-customer"));
        const bills = updatedData.data;
        setData(bills);
        table.reset();
    }, []);
    const handleDelete = async (bill) => {
        await trackPromise(coreApi.delete(`/cng/bills/${bill.id}`));
        refreshData();
    }
    const handleBulkDelete = async () => {
        await trackPromise(coreApi({
            url: `/cng/bulk-delete-bills`,
            method: "delete",
            data: {
                ids: selectedRowIds
            }
        }));
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
            <FeatureHeader
                title="Bills"
                className="justify-content-between"
                breadcrumbs={[
                    { title: "Bill", path: "/bills"},
                    { title: "List", disabled: true}
                ]}
            >
                <Button
                    variant="success"
                    onClick={handleAddCustomer}
                >
                    + {ACTIONS.BILL}
                </Button>
            </FeatureHeader>
            <section className="mt-3">
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

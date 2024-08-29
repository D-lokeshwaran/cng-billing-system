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
import { useAuth } from "src/context/AuthContext";

const CustomerList: FC = () => {

    const router = useRouter();
    const { isCustomer } = useAuth()
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
                           <p className="mb-0">{customer?.accountNumber}</p>
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
                {!isCustomer && <Button
                    variant="success"
                    onClick={handleAddCustomer}
                >
                    + {ACTIONS.BILL}
                </Button>}
            </FeatureHeader>
            <section className="mt-3">
                <Card>
                    <Card.Header className="py-3">
                        {selectedRowsCount > 0  ?
                            <FlexBox justify="between">
                                <div>{`${selectedRowsCount} Rows selected`}</div>
                                <Delete02Icon onClick={handleBulkDelete}/>
                            </FlexBox>
                            :   <Row className="justify-content-between">
                                    <Col xs lg="auto" sm={1}>
                                        <StatusFilter table={table}/>
                                    </Col>
                                    <Col xs sm="auto" as={FlexBox} justify="end">
                                        <ColumnChooser table={table} />
                                        <ExportData filename={name} table={table}/>
                                    </Col>
                                </Row>
                        }
                    </Card.Header>
                    <Card.Body className="p-0">
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

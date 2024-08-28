import { useEffect, useState, useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    Table,
    getPaginationRowModel,
    getFilteredRowModel,
    getSortedRowModel
} from '@tanstack/react-table';
import { trackPromise } from 'react-promise-tracker';
import { coreApi } from 'src/utils/api';
import { ColumnDef } from "@tanstack/react-table";
import { createColumnHelper } from '@tanstack/react-table';
import IndeterminateCheckbox from 'src/components/table/IntermediateCheckbox';

interface Params {
    url: string;
    method?: string;
}

interface Options {
    enableRowSelection?: boolean
}

export interface UseTableAdapterProps<T> {
    columns: ColumnDef<T, any>[];
    name: string;
    params?: Params;
    columnVisibility?: {[int:string]:boolean}
    _mock?: any;
    options?: Options
}

export const useTableAdapter = <T,>({
    columns,
    name,
    params,
    columnVisibility,
    filterFns,
    globalFilterFn,
    _mock,
    options={enableRowSelection: true}
}: UseTableAdapterProps<T>): Table<T> => {

    const [data, setData] = useState<T[]>(_mock || []);

    useEffect(() => {
        if (params && data.length === 0) {
            refreshData();
        }
    }, [params]);

    const refreshData = async () => {
        await trackPromise(
            coreApi({
                url: params.url,
                method: params.method || "GET"
            })
        ).then(
            res => {
                const result = res.data?._embedded[name];
                if (!result) {
                    console.log("Server response: ", res.data)
                    throw new Error("Invalid attribute: ");
                }
                setData(result);
            }
        ).catch(
            error => {
                console.error("Failed to fetch data:", error);
            }
        );
    }

    const updatedColumns = useMemo(() => {
        const columnHelper = createColumnHelper<any>();
        if (options.enableRowSelection === true && columns[0].id !== 'rowSelect') {
            return columns = [
                columnHelper.display({
                    id: 'rowSelect',
                    header: ({ table }) => <IndeterminateCheckbox
                        {...{
                            checked: table.getIsAllRowsSelected(),
                            indeterminate: table.getIsSomeRowsSelected(),
                            onChange: table.getToggleAllRowsSelectedHandler(),
                        }}
                    />,
                    cell: ({ row }) => <IndeterminateCheckbox
                        {...{
                            checked: row.getIsSelected(),
                            disabled: !row.getCanSelect(),
                            indeterminate: row.getIsSomeSelected(),
                            onChange: row.getToggleSelectedHandler(),
                        }}
                    />
                }),
                ...columns,
            ]
        }
        return columns;
    }, [options.enableRowSelection])

    const table = useReactTable({
        data,
        columns: updatedColumns,
        initialState: {
            columnVisibility
        },
        filterFns: filterFns,
        globalFilterFn: globalFilterFn,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // debugTable: process.env.NODE_ENV === "development",
        // debugRows: process.env.NODE_ENV === "development",
        // debugColumns: false
    });

    return { table, setData, refreshData };
}
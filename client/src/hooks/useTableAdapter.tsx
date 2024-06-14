import React, { useEffect, useMemo, useState } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    Table,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel
} from '@tanstack/react-table';
import { trackPromise } from 'react-promise-tracker';
import { coreApi } from 'src/utils/api';

interface Params {
    url: string;
    method?: string;
    name: string
}

interface TableOptions {
    disableRowSelection?: boolean;
    disableSorting?: boolean;
    disableGlobalFilter?: boolean;
    [key:string]: any;
}

export interface UseTableAdapterProps {
    columns: any;
    params?: Params;
    options?: TableOptions;
    _mock?: any;
}

const useTableAdapter = <T,>({
    columns,
    params,
    _mock
}: UseTableAdapterProps): Table<T> => {

    const [ data, setData ] = useState<T[]>(_mock || []);
    const memorizedColumns = useMemo(() => columns, []);

    useEffect(() => {
        if (params && data.length === 0) {
            trackPromise(
                coreApi({
                    url: params.url,
                    method: params.method || "GET"
                })
            ).then(
                res => {
                    const result = res.data?._embedded[params.name]
                    setData(result);
                }
            ).catch(
                error => {
                    console.error("Failed to fetch data:", error);
                }
            );
        }
    }, [params]);

    const table = useReactTable({
        data,
        columns: memorizedColumns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        globalFilterFn: "auto",
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    return table;
}

export default useTableAdapter;
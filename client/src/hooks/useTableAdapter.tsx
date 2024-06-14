import { useEffect, useState } from 'react';
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

interface Params {
    url: string;
    method?: string;
    name: string
}

export interface UseTableAdapterProps<T> {
    columns: ColumnDef<T, any>[];
    params?: Params;
    _mock?: any;
}

const useTableAdapter = <T,>({
    columns,
    params,
    _mock
}: UseTableAdapterProps<T>): Table<T> => {

    const [data, setData] = useState<T[]>(_mock || []);

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
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugRows: true,
        debugColumns: false
    });

    return table;
}

export default useTableAdapter;
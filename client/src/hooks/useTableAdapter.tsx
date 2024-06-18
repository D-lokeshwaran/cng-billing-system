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
}

export interface UseTableAdapterProps<T> {
    columns: ColumnDef<T, any>[];
    name: string;
    params?: Params;
    columnVisibility?: {[int:string]:boolean}
    _mock?: any;
}

export const useTableAdapter = <T,>({
    columns,
    name,
    params,
    columnVisibility,
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
                    const result = res.data?._embedded[name]
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
        initialState: {
            columnVisibility
        },
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        // debugTable: process.env.NODE_ENV === "development",
        // debugRows: process.env.NODE_ENV === "development",
        // debugColumns: false
    });

    return table;
}
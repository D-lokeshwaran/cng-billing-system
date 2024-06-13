import { useEffect, useState } from 'react';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
    Table
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
}

const useTableAdapter = <T,>({
    columns,
    params
}: UseTableAdapterProps<T>): Table<T> => {

    const [data, setData] = useState<T[]>([]);

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
        getCoreRowModel: getCoreRowModel()
    });

    return table;
}

export default useTableAdapter;
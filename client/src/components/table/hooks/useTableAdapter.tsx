import { useEffect, useState } from 'react';
import { Table } from '@tanstack/react-table';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { trackPromise } from 'react-promise-tracker';
import { coreApi } from 'src/utils/api';
import { UseTableAdapterProps } from '../table';

const useTableAdapter = <T,>({
    data,
    columns,
    params
}: UseTableAdapterProps<T>): Table<T> => {

    const [tableData, setTableData] = useState<T[]>(data);

    useEffect(() => {
        if (params) {
            trackPromise(
                coreApi({
                    url: params.url,
                    method: params.method
                }).then(
                    res => {
                        // Assuming res.data is the expected data structure
                        setTableData(res.data);
                    }
                ).catch(
                    error => {
                        console.error("Failed to fetch data:", error);
                    }
                )
            );
        }
    }, [params]);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel()
    });

    return table;
}

export default useTableAdapter;
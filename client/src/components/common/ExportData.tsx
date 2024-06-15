import { Table } from '@tanstack/react-table';
import React from 'react';
import { CSVLink } from 'react-csv';

interface ExportDataProps {
    filename: string | undefined,
    table?: Table<any>,
    data?: any
}

const ExportData: React.FC<ExportDataProps> = ({
    filename,
    table,
    data
}) => {

    const columns = table?.getAllColumns().map(col => col.id);
    const tableData = table?.getCoreRowModel().rows.map(row => row.original);

    return (
        <div>
            <CSVLink headers={columns} data={data || tableData} filename={filename + ".csv"}>
                Export
            </CSVLink>
        </div>
    )
}

export default ExportData;
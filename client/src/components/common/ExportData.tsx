import { Table } from '@tanstack/react-table';
import React from 'react';
import { CSVLink } from 'react-csv';
import { Upload02Icon } from 'hugeicons-react';

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
        <CSVLink
            className="btn btn-ghost"
            headers={columns}
            data={data || tableData}
            filename={filename + ".csv"}
        >
            <Upload02Icon size="18"/>
            <span className="ms-1">Export</span>
        </CSVLink>
    )
}

export default ExportData;
import React from "react";
import { Table as BSTable } from "react-bootstrap";
import { flexRender } from '@tanstack/react-table';

interface TanStackTableProps {
    table: any
}

export const TanStackTable: React.FC<TanStackTableProps> = ({ table }) => {

    const { getHeaderGroups, getRowModel } = table;

    return (
        <BSTable striped bordered hover variant="light">
            <thead>
                {getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}>
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <td key={cell.id}>
                               {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </BSTable>
    )

}

export default TanStackTable;
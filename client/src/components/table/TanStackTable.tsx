import React from "react";
import { Table as BSTable } from "react-bootstrap";
import { Table, flexRender } from '@tanstack/react-table';

type options = {
    rowSelectionEnabled: boolean
}

interface TanStackTableProps {
    table: Table<unknown|never|any>;
    options?: options
}

export const TanStackTable: React.FC<TanStackTableProps> = ({ table, options }) => {

    const { 
        getHeaderGroups, 
        getRowModel,
    } = table;

    return (
        <BSTable striped bordered hover variant="light">
            <thead>
                {getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            <th key={header.id}
                                className={
                                    header.column.getCanSort()
                                    ? 'cursor-pointer select-none' : ''
                                }
                                onClick={header.column.getToggleSortingHandler()}
                            >
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                {{
                                    asc: ' ^',
                                    desc: ' v'
                                }[header.column.getIsSorted() as string] ?? null}
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
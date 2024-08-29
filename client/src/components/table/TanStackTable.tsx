import React, { HTMLAttributes } from "react";
import { Table as BSTable } from "react-bootstrap";
import { useAppContext } from "src/context/AppContext";
import { RowData, Table, flexRender } from '@tanstack/react-table';
import { ArrowUp01Icon, ArrowDown01Icon } from "hugeicons-react";

interface TanStackTableProps {
    table: Table<unknown|never|any>;
    rowProps?: (row?:RowData) => HTMLAttributes<HTMLTableRowElement>;
}

export const TanStackTable: React.FC<TanStackTableProps> = ({ 
    table, 
    rowProps= () => {} 
}) => {

    const { 
        getHeaderGroups, 
        getRowModel,
    } = table;
    const { config: { theme }} = useAppContext();

    return (
        <BSTable responsive="sm" hover variant={theme}>
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
                                    asc: <ArrowUp01Icon size="18" className="ms-1"/>,
                                    desc: <ArrowDown01Icon size="18" className="ms-1"/>
                                }[header.column.getIsSorted() as string] ?? null}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody>
                {getRowModel().rows.length > 0 ?
                    getRowModel().rows.map(row => (
                        <tr key={row.id} {...rowProps(row)}>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))
                    : <tr>
                        <td
                            colSpan={getHeaderGroups()[0].headers.length}
                            className="text-center"
                        >
                            No data available in List
                        </td>
                    </tr>
                }
            </tbody>
        </BSTable>
    )

}

export default TanStackTable;
import React, { HTMLAttributes } from "react";
import { Table as BSTable } from "react-bootstrap";
import { RowData, Table, flexRender } from '@tanstack/react-table';
import IndeterminateCheckbox from "./IntermediateCheckbox";

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

    return (
        <BSTable striped bordered hover variant="light">
            <thead>
                {getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        <>
                            <th>
                                <IndeterminateCheckbox
                                    {...{
                                        checked: table.getIsAllRowsSelected(),
                                        indeterminate: table.getIsSomeRowsSelected(),
                                        onChange: table.getToggleAllRowsSelectedHandler(),
                                    }}
                                />
                            </th>
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
                        </>
                    </tr>
                ))}
            </thead>
            <tbody>
                {getRowModel().rows.map(row => (
                    <tr key={row.id} {...rowProps(row)}>
                        <>
                            <td>
                                <IndeterminateCheckbox
                                    {...{
                                        checked: row.getIsSelected(),
                                        disabled: !row.getCanSelect(),
                                        indeterminate: row.getIsSomeSelected(),
                                        onChange: row.getToggleSelectedHandler(),
                                    }}
                                />
                            </td>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </>
                    </tr>
                ))}
            </tbody>
        </BSTable>
    )

}

export default TanStackTable;
import React from "react";
import { Table as BSTable } from "react-bootstrap";

type Column = {
    attr: string,
    title: string,
    cell: (value: any) => React.ReactNode
}

interface SimpleTableProps {
    columns: Column[];
    data: any[];
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ 
    columns, 
    data
}) => {

    return (
        <BSTable striped bordered hover variant="light">
            <thead>
                <tr>
                    {columns?.map(col => (
                        <th key={col.attr}>
                            {col.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data && data?.map((row: any, id: number) => (
                    <tr key={id}>
                        {columns?.map(col =>
                            <td key={id}>
                                {col.cell ? col.cell(row[col.attr]) : row[col.attr]}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </BSTable>
    )

}

export default SimpleTable;
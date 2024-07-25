import React from "react";
import { Table as BSTable } from "react-bootstrap";

type Column = {
    attr: string,
    title: string,
}

interface SimpleTableProps {
    columns: Column[];
    data: any;
}

export const SimpleTable: React.FC<SimpleTableProps> = ({ 
    columns, 
    data
}) => {

    return (
        <BSTable striped bordered hover variant="light">
            <thead>
                <tr>
                    {columns.map(col => (
                        <th key={col.attr}>
                            {col.title}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((cell: any, id: number) => (
                    <tr key={id}>
                        {columns.map(col => 
                            <td key={id}>
                                {cell[col.attr]}
                            </td>
                        )}
                    </tr>
                ))}
            </tbody>
        </BSTable>
    )

}

export default SimpleTable;
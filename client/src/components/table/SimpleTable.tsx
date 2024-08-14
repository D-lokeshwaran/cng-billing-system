import React from "react";
import { Table as BSTable } from "react-bootstrap";
import { useAppContext } from "src/context/AppContext";

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

    const { config: { theme }} = useAppContext();

    return (
        <BSTable striped bordered hover variant={theme}>
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
                            <td key={col.attr}>
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
import { Table } from "@tanstack/react-table";
import { Button, FormSelect } from "react-bootstrap";

const Pagination = ({table}: {table: Table<any>}) => {

    return (
        <div>
            Showing 
            <FormSelect
                value={table.getState().pagination.pageSize}
                onChange={e => {
                    table.setPageSize(Number(e.target.value))
                }}
            >
                {[10, 30, 60, 100].map(pageSize => (
                    <option key={pageSize} value={pageSize}>
                        Show {pageSize}
                    </option>
                ))}
            </FormSelect>
            rows per page.
            <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
            </Button>
            <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
            </Button>
        </div>
    )

}

export default Pagination;
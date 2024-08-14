import { Table } from "@tanstack/react-table";
import { Button, FormSelect } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import IconButton from "src/components/common/IconButton";
import { ArrowLeft01Icon, ArrowRight01Icon } from "hugeicons-react";

const Pagination = ({table}: {table: Table<any>}) => {

    return (
        <FlexBox justify="between">
            <FlexBox>
                <span>Showing</span>
                <FormSelect
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                    className="ms-2 me-2"
                    size="sm"
                >
                    {[10, 30, 60, 100].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            {pageSize}
                        </option>
                    ))}
                </FormSelect>
                <span className="text-nowrap">rows per page.</span>
            </FlexBox>
            <FlexBox>
                <IconButton
                    icon={ArrowLeft01Icon}
                    className="me-1"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                />
                <IconButton
                    icon={ArrowRight01Icon}
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                />
            </FlexBox>
        </FlexBox>
    )

}

export default Pagination;
import TanStackTable from './TanStackTable';
import { Button, Card, Dropdown, DropdownButton, FormCheck, FormSelect } from 'react-bootstrap';
import TableSearchBox from './SearchBox';
import useTableAdapter from 'src/hooks/useTableAdapter';
import { CSVLink } from 'react-csv';
import { useEffect, useState, useRef } from 'react';
import { Customer } from 'src/features/customer/customerSlice';

interface Params {
    url: string;
    method?: string;
    name: string
}

interface AlterOptions {
    globelFilter: boolean,
    columnChooser: boolean,
    export: boolean,
    pagination: boolean,
    initPageSize: number
}
const defaultAlterOptions = {
    globelFilter: true,
    columnChooser: true,
    export: true,
    pagination: true,
    initPageSize: 10
}

type SliceProps = {
    columns: any,
    params?: Params,
    _mock: Customer[],
    alterOptions?: AlterOptions
    columnVisibility?: {[int:string]: boolean},
    [int:string]: any
}

interface ReadyMadeTableProps {
    slice: SliceProps
}

const ReadyMadeTable: React.FC<ReadyMadeTableProps> = ({ slice }) => {

    const [exportColumns, setExportColumns] = useState<string[]>([]);
    const exportRef = useRef<
        CSVLink & HTMLAnchorElement & { link: HTMLAnchorElement }
    >(null!);


    const { 
        columns, 
        params,
        _mock, 
        alterOptions:options=defaultAlterOptions,
        columnVisibility
    } = slice;

    const table = useTableAdapter({
        columns,
        params,
        columnVisibility,
        _mock
    });

    useEffect(() => {
        if (options?.initPageSize) {
            table.setPageSize(options.initPageSize)
        }
    }, [options])

    useEffect(() => {
        if (exportColumns.length > 0) {
            exportRef?.current.link.click();
        }
    }, [exportRef, exportColumns])

  return (
    <section>
        <Card>
            <Card.Header>
                {options?.globelFilter && <TableSearchBox
                    value={table.getState().globalFilter ?? ''}
                    onChange={(value) => table.setGlobalFilter(String(value))}
                    debounce={200}
                />}
                <FormCheck
                    {...{
                        checked: table.getIsAllColumnsVisible(),
                        onChange: table.getToggleAllColumnsVisibilityHandler()
                    }}
                /> show/hide All
                <Button
                    variant='link'
                    onClick={() => table.resetColumnVisibility()}
                >
                    Reset
                </Button>
                {table.getAllColumns().map(column =>
                    <>
                        <FormCheck
                            checked={column.getIsVisible()}
                            disabled={!column.getCanHide()}
                            onChange={column.getToggleVisibilityHandler()}
                        />{column.id}
                    </>
                )}
                <DropdownButton title="Export">
                    <Dropdown.Item 
                        eventKey="visible-cols"
                        onClick={() => {
                            setExportColumns(table.getVisibleLeafColumns().map(col => col.id))
                        }}
                    >
                        Visible Columns
                    </Dropdown.Item>
                    <Dropdown.Item 
                        eventKey="all-cols"
                        onClick={() => {
                            setExportColumns(table.getAllLeafColumns().map(col => col.id));
                        }}
                    >
                        All columns
                    </Dropdown.Item>
                </DropdownButton>
                {exportColumns}
                <CSVLink headers={exportColumns} data={_mock} filename='customer.csv' ref={exportRef}>
                    export
                </CSVLink>
            </Card.Header>
            <Card.Body>
                <TanStackTable table={table} />
            </Card.Body>
            <Card.Footer>
                {options?.pagination && <div>
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
                </div>}
            </Card.Footer>
        </Card>
    </section>
  );
}

export default ReadyMadeTable;
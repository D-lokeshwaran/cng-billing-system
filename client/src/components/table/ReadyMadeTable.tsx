import TanStackTable from './TanStackTable';
import { Button, Card, Dropdown, FormCheck, FormSelect } from 'react-bootstrap';
import TableSearchBox from './SearchBox';
import useTableAdapter from 'src/hooks/useTableAdapter';
import { useEffect } from 'react';

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
    _mock: any,
    alterOptions?: AlterOptions
    [int:string]: any
}

interface ReadyMadeTableProps {
    slice: SliceProps
}

const ReadyMadeTable: React.FC<ReadyMadeTableProps> = ({ slice }) => {

    const { 
        columns, 
        params,
        _mock, 
        alterOptions:options=defaultAlterOptions } = slice;

    const table = useTableAdapter({
        columns: columns,
        params: params,
        _mock: _mock
    });

    useEffect(() => {
        if (options?.initPageSize) {
            table.setPageSize(options.initPageSize)
        }
    }, [options])

  return (
    <section>
        <Card>
            <Card.Header>
                {options?.globelFilter && <TableSearchBox
                    value={table.getState().globalFilter ?? ''}
                    onChange={(value) => table.setGlobalFilter(String(value))}
                    debounce={200}
                />}
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Columns
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Header>
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
                        </Dropdown.Header>
                        {table.getAllLeafColumns().map(column => 
                            <Dropdown.Item key={column.id}>
                                <FormCheck
                                    checked={column.getIsVisible()}
                                    disabled={!column.getCanHide()} 
                                    onChange={column.getToggleVisibilityHandler()}
                                />{column.id}
                            </Dropdown.Item>
                        )}
                    </Dropdown.Menu>
                </Dropdown>
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
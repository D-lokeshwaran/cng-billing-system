import TanStackTable from './TanStackTable';
import { Card } from 'react-bootstrap';
import SearchBoxInput from '../common/SearchBoxInput';
import { useTableAdapter } from 'src/hooks';
import { useEffect } from 'react';
import ExportData from '../common/ExportData';
import ColumnChooser from './ColumnChooser';
import Pagination from './Pagination';

interface Params {
    url: string;
    method?: string;
}

interface AlterOptions {
    globelFilter: boolean,
    columnChooser: boolean,
    rowSelection: boolean,
    export: boolean,
    pagination: boolean,
    initPageSize: number
}

type SliceProps = {
    name: string,
    columns: any,
    params?: Params,
    _mock?: any[],
    alterOptions?: AlterOptions
    columnVisibility?: {[int:string]: boolean},
    [int:string]: any
}

interface ReadyMadeTableProps {
    slice: SliceProps
}

const defaultAlterOptions = {
    globelFilter: true,
    columnChooser: true,
    rowSelection: true,
    export: true,
    pagination: true,
    initPageSize: 10
}

const ReadyMadeTable: React.FC<ReadyMadeTableProps> = ({ slice }) => {


    const { 
        name,
        columns, 
        params,
        _mock, 
        alterOptions:options=defaultAlterOptions,
        columnVisibility
    } = slice;

    const table = useTableAdapter({
        columns,
        name,
        params,
        columnVisibility,
        _mock
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
                {options?.globelFilter && <SearchBoxInput
                    value={table.getState().globalFilter ?? ''}
                    onChange={(value) => table.setGlobalFilter(String(value))}
                    debounce={200}
                />}
                {options?.columnChooser && <ColumnChooser table={table} /> }
                {options?.export && <ExportData filename={name} table={table}/>}
            </Card.Header>
            <Card.Body>
                <TanStackTable table={table} />
            </Card.Body>
            <Card.Footer>
                {options?.pagination && <Pagination table={table}/>}
            </Card.Footer>
        </Card>
    </section>
  );
}

export default ReadyMadeTable;
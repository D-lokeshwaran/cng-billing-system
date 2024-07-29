import TanStackTable from './TanStackTable';
import { Card } from 'react-bootstrap';
import SearchBoxInput from '../common/SearchBoxInput';
import { useTableAdapter } from 'src/hooks';
import { HTMLAttributes, useEffect } from 'react';
import ExportData from '../common/ExportData';
import ColumnChooser from './ColumnChooser';
import Pagination from './Pagination';
import { SliceProps } from './types';
import { createColumnHelper } from '@tanstack/react-table';
import IndeterminateCheckbox from './IntermediateCheckbox';

interface ReadyMadeTableProps {
    slice: SliceProps,
    rowProps?: (row:any) => HTMLAttributes<HTMLTableRowElement>
}

const defaultAlterOptions = {
    globelFilter: true,
    columnChooser: true,
    rowSelection: true,
    export: true,
    pagination: true,
    initPageSize: 10
}

const ReadyMadeTable: React.FC<ReadyMadeTableProps> = ({ slice, rowProps }) => {

    const { 
        name,
        columns, 
        params,
        _mock, 
        alterOptions:options=defaultAlterOptions,
        columnVisibility
    } = slice;

    const { table } = useTableAdapter({
        columns,
        name,
        params,
        columnVisibility,
        _mock,
        options: {
            enableRowSelection: alterOptions.rowSelection
        }
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
                <TanStackTable table={table} rowProps={rowProps}/>
            </Card.Body>
            <Card.Footer>
                {options?.pagination && <Pagination table={table}/>}
            </Card.Footer>
        </Card>
    </section>
  );
}

export default ReadyMadeTable;

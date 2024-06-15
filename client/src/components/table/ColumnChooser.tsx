import { Table } from '@tanstack/react-table';
import React from 'react';
import { Button, DropdownButton, DropdownMenu, DropdownToggle, FormCheck } from 'react-bootstrap';

interface ColumnChooserProps {
    table: Table<any>
}

const ColumnChooser: React.FC<ColumnChooserProps> = ({
    table
}) => {

    return (
        <div>
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
        </div>
    )

}

export default ColumnChooser;
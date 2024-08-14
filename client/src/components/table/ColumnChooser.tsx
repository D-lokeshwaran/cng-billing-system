import { Table } from '@tanstack/react-table';
import React from 'react';
import { Button, Dropdown, FormCheck } from 'react-bootstrap';
import FlexBox from "src/components/common/FlexBox";

interface ColumnChooserProps {
    table: Table<any>,
    displayColumns?: string[]
}

const ColumnChooser: React.FC<ColumnChooserProps> = ({
    table,
    displayColumns=["rowSelect", "actions"]
}) => {

    return (
        <div>
            <Dropdown size="sm">
                <Dropdown.Toggle size="sm" variant="ghost">
                    columns
                </Dropdown.Toggle>
                <Dropdown.Menu className="w-50">
                     {table.getAllColumns().map(column =>
                         <React.Fragment key={column.id}>
                             {!displayColumns?.includes(column.id) &&
                             <Dropdown.Item as={FlexBox} onClick={e => e.stopPropagation()}>
                                 <FormCheck
                                     checked={column.getIsVisible()}
                                     disabled={!column.getCanHide()}
                                     onChange={column.getToggleVisibilityHandler()}
                                     className="me-2"
                                 />{column.id}
                             </Dropdown.Item> }
                         </React.Fragment>
                     )}
                     <Dropdown.Divider />
                     <Dropdown.Header as={FlexBox} justify="between">
                         <div className="d-flex">
                             <FormCheck
                                 {...{
                                     checked: table.getIsAllColumnsVisible(),
                                     onChange: table.getToggleAllColumnsVisibilityHandler()
                                 }}
                                 className="me-2"
                             /> show/hide All
                         </div>
                         <Button
                             variant='default-button'
                             onClick={() => table.resetColumnVisibility()}
                         >
                             Reset
                         </Button>
                     </Dropdown.Header>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    )

}

export default ColumnChooser;
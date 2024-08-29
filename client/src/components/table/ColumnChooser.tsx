import { Table } from '@tanstack/react-table';
import React from 'react';
import { Button, Dropdown, FormCheck } from 'react-bootstrap';
import FlexBox from "src/components/common/FlexBox";
import { ViewIcon } from 'hugeicons-react';
import { startCase } from "lodash";

interface ColumnChooserProps {
    table: Table<any>,
    displayColumns?: string[]
}

const ColumnChooser: React.FC<ColumnChooserProps> = ({
    table,
    displayColumns=["rowSelect", "actions"],
    ...props
}) => {

    return (
            <Dropdown {...props}>
                <Dropdown.Toggle variant="ghost">
                    <ViewIcon size="18"/>
                    <span className="ms-1">columns</span>
                </Dropdown.Toggle>
                <Dropdown.Menu align="end" className="animated--fade-in pt-3">
                     {table.getAllColumns().map(column =>
                         <React.Fragment key={column.id}>
                             {!displayColumns?.includes(column.id) &&
                             <Dropdown.Item as={FlexBox} onClick={e => e.stopPropagation()}>
                                 <FormCheck
                                     checked={column.getIsVisible()}
                                     disabled={!column.getCanHide()}
                                     onChange={column.getToggleVisibilityHandler()}
                                     className="me-2"
                                     type="checkbox"
                                     id={startCase(column.id)}
                                     label={startCase(column.id)}
                                 />
                             </Dropdown.Item> }
                         </React.Fragment>
                     )}
                     <Dropdown.Divider />
                     <Dropdown.Header as={FlexBox} justify="between">
                         <div className="d-flex me-5">
                             <FormCheck
                                 {...{
                                     checked: table.getIsAllColumnsVisible(),
                                     onChange: table.getToggleAllColumnsVisibilityHandler()
                                 }}
                                 className="me-2"
                                 id="toggleAll"
                                 label="Toggle All"
                             />
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
    )

}

export default ColumnChooser;
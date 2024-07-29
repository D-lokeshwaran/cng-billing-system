import { RowModel, Table } from "@tanstack/react-table"
import { Delete02Icon, MoreHorizontalCircle01Icon, PencilEdit01Icon } from "hugeicons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { useRouter } from "src/hooks";
import { coreApi } from "src/utils/api";
import React from "react";

interface DefaultRowActionsProps {
    onEdit: (data: any) => void;
    onDelete: (data: any) => void;
}

const DefaultRowActions: React.FC<DefaultRowActionsProps> = ({ row, onEdit, onDelete }) => {

  return (
    <Dropdown onDoubleClick={(e) => e.stopPropagation()} drop="start">
      <DropdownToggle>
        <MoreHorizontalCircle01Icon/>
      </DropdownToggle>
      <DropdownMenu>
        <DropdownItem onClick={onEdit}>
          <PencilEdit01Icon/>
          Edit
        </DropdownItem>
        <DropdownItem onClick={() => onDelete(row.original)}>
          <Delete02Icon/>
          Delete
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )

}

export default DefaultRowActions;
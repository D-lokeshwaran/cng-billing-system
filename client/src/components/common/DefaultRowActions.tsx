import { RowModel, Table } from "@tanstack/react-table"
import { Delete02Icon, MoreHorizontalCircle01Icon, PencilEdit01Icon } from "hugeicons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { useRouter } from "src/hooks";
import { coreApi } from "src/utils/api";
import FlexBox from "src/components/common/FlexBox";
import IconButton from "src/components/common/IconButton";
import React from "react";

interface DefaultRowActionsProps {
    onEdit: (data: any) => void;
    onDelete: (data: any) => void;
}

const DefaultRowActions: React.FC<DefaultRowActionsProps> = ({ row, onEdit, onDelete }) => {

  return (
    <FlexBox justify="end">
        <Dropdown onDoubleClick={(e) => e.stopPropagation()} drop="start">
          <Dropdown.Toggle size="sm" variant="default">
            <MoreHorizontalCircle01Icon size="18"/>
          </Dropdown.Toggle>
          <DropdownMenu>
            <DropdownItem onClick={onEdit}>
              <PencilEdit01Icon size="18"/>
              <span className="ms-2">Edit</span>
            </DropdownItem>
            <DropdownItem onClick={() => onDelete(row.original)}>
              <Delete02Icon size="18"/>
              <span className="ms-2">Delete</span>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
    </FlexBox>
  )

}

export default DefaultRowActions;
import { RowData, RowModel, createColumnHelper } from "@tanstack/react-table"
import { MoreVerticalCircle01Icon } from "hugeicons-react";
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { SliceProps } from "src/components/table/types";
import { BILL_LIST } from "src/constants/labels";
import { Customer } from "src/features/customer/customerSlice";
import { startCase } from "lodash";
import { coreApi } from "src/utils/api";

export type Bill = {
  id: number,
  customer: Customer,
  unitsConsumed: number,
  billingDate: Date,
  paymentDueDate: Date,
  status: string,
  billAmount: number | string,
}

// TODO: Later all this data should turn in db
const columnHelper = createColumnHelper<Bill>()


const billSlice: SliceProps = {
  name: "bills",
  columns: [
    columnHelper.accessor('unitsConsumed', {
      header: BILL_LIST.UNITS
    }),
    columnHelper.accessor('billingDate', {
      header: BILL_LIST.BILLING_DATE
    }),
    columnHelper.accessor('paymentDueDate', {
      header: BILL_LIST.DUE_DATE
    }),
    columnHelper.accessor('paymentStatus', {
      header: BILL_LIST.STATUS,
      cell: ({ row }) => startCase(row.original.paymentStatus)
    }),
    columnHelper.accessor('billAmount', {
      header: BILL_LIST.AMOUNT,
    })
  ],
  columnVisibility: {
    addressLine2: false,
  },
  alterOptions: {
    globelFilter: false
  }
}

export default billSlice;
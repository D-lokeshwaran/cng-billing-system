import { createColumnHelper } from "@tanstack/react-table"

export type Customer = {
    accountNumber: number,
    addressLine1: string,
    addressLine2: string,
    city: string,
    contactNumber: string,
    fullName: string,
    id: number,
    pin: number,
    state: string
    _links: any
}

const columnHelper = createColumnHelper<Customer>()
  
export const columns = [
    columnHelper.accessor('accountNumber', {
      header: () => 'Account Number',
      cell: info => info.getValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('fullName', {
      header: () => 'Full Name',
      cell: info => info.renderValue(),
      footer: info => info.column.id,
    }),
    columnHelper.accessor('contactNumber', {
      header: 'Contact Number',
      footer: info => info.column.id,
    }),
    columnHelper.accessor('addressLine1', {
      header: 'Address',
      footer: info => info.column.id,
    }),
]
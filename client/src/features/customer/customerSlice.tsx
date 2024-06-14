import { ColumnDef } from "@tanstack/react-table"
import IndeterminateCheckbox from "src/components/table/IntermediateCheckbox"

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

class CustomerSlice {

  columns: ColumnDef<Customer>[] = [
    {
      id:"select",
      header: ({ table }) => (
        <IndeterminateCheckbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <IndeterminateCheckbox
          {...{
            checked: row.getIsSelected(),
            disabled: !row.getCanSelect(),
            indeterminate: row.getIsSomeSelected(),
            onChange: row.getToggleSelectedHandler(),
          }}
        />
      ),
    },
    {
      header: "Account Number",
      accessorKey: "accountNumber"
    },
    {
      header: "Full Name",
      accessorKey: "fullName"
    },
    {
      header: "Contact Number",
      accessorKey: "contactNumber"
    },
    {
      header: "Address",
      accessorKey: "addressLine1"
    }
  ]

  _mock = [
    {
        accountNumber: 12345,
        fullName: "LOKM",
        contactNumber: 1111,
        addressLine1: "add1"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    },
    {
        accountNumber: 54321,
        fullName: "LOKM",
        contactNumber: 2222,
        addressLine1: "add2"
    }
  ]

}

export default new CustomerSlice();
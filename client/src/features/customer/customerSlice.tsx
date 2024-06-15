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

// TODO: Later all this data should turn in db
const columnHelper = createColumnHelper<Customer>()

class CustomerSlice {

  name = "customers"
  columns = [
    columnHelper.accessor('accountNumber', {
      header: "Account Number",
      enableHiding: false
    }),
    columnHelper.accessor('fullName', {
      header: "Full Name"
    }),
    columnHelper.accessor('contactNumber', {
      header: "Contact Number"
    }),
    columnHelper.accessor('addressLine1', {
      header: "Address l1"
    }),
    columnHelper.accessor('addressLine2', {
      header: "Address l2",
    })
  ]

  columnVisibility = {
    addressLine2: false,
  }

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
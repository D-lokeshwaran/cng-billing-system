import { createColumnHelper } from "@tanstack/react-table"

export type Customer = {
    accountNumber: string,
    fullName: string,
    contactNumber: string,
    state: string,
    fullAddress: string,
    city: string,
    pin: number,
    documents: {
      documentId: string;
      file: File;
    }[];
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
    columnHelper.accessor('fullAddress', {
      header: "Address"
    }),
    columnHelper.accessor('state', {
      header: "state",
    })
  ]

  columnVisibility = {
    addressLine2: false,
  }

  params = {
    url: "/cng/customers"
  }

  /* _mock = [
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
  ] */

}

export default new CustomerSlice();
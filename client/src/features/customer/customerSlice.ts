import { createColumnHelper } from "@tanstack/react-table"
import { SliceProps } from "src/components/table/types";
import { CUSTOMER_LIST } from "src/constants/labels";

export type Customer = {
    id: number,
    accountNumber: string,
    fullName: string,
    emailAddress: string,
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

const customerSlice: SliceProps = {
  name: "customers",
  columns: [
    columnHelper.accessor('accountNumber', {
      header: CUSTOMER_LIST.ACCOUNT_NUMBER,
      enableHiding: false
    }),
    columnHelper.accessor('fullName', {
      header: CUSTOMER_LIST.FULL_NAME
    }),
    columnHelper.accessor('contactNumber', {
      header: CUSTOMER_LIST.CONTACT_NUMBER
    }),
    columnHelper.accessor('fullAddress', {
      header: CUSTOMER_LIST.ADDRESS
    }),
    columnHelper.accessor('state', {
      header: CUSTOMER_LIST.STATE,
    })
  ],
  columnVisibility: {
    addressLine2: false,
  },
  params: {
    url: "/cng/customers"
  },
  /* _mock: [
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
 */
}

export default customerSlice;
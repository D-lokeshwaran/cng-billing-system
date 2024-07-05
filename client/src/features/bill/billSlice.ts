import { createColumnHelper } from "@tanstack/react-table"
import { SliceProps } from "src/components/table/types";
import { BILL_LIST } from "src/constants/labels"

export type Bill = {
  customerId: number,
  unitsConsumed: number,
  billingDate: Date,
  dueDate: Date,
  status: string,
  amount: number,
}

// TODO: Later all this data should turn in db
const columnHelper = createColumnHelper<Bill>()

const billSlice: SliceProps = {
  name: "bills",
  columns: [
    columnHelper.accessor('customerId', {
      header: BILL_LIST.CUSTOMER,
      enableHiding: false
    }),
    columnHelper.accessor('unitsConsumed', {
      header: BILL_LIST.UNITS
    }),
    columnHelper.accessor('billingDate', {
      header: BILL_LIST.BILLING_DATE
    }),
    columnHelper.accessor('dueDate', {
      header: BILL_LIST.DUE_DATE
    }),
    columnHelper.accessor('status', {
      header: BILL_LIST.STATUS,
    }),
    columnHelper.accessor('amount', {
      header: BILL_LIST.AMOUNT,
    })
  ],
  columnVisibility: {
    addressLine2: false,
  },
  alterOptions: {
    globelFilter: false
  },
  params: {
    url: "/cng/bills"
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
export default billSlice;
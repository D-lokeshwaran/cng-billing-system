import { createColumnHelper } from "@tanstack/react-table"
import { SliceProps } from "src/components/table/types";
import { TARIFF_LIST } from "src/constants/labels";

export type Tariff = {
    id: number,
    fromDate: Date,
    toDate: Date,
    unitsAndRates: {
        fromUnit: number,
        toUnit: number, 
        ratePerUnit: number
    }[],
    maxUnit: number,
    unitRateAboveMax: number,
}

// TODO: Later all this data should turn in db
const columnHelper = createColumnHelper<Tariff>()

const tariffSlice: SliceProps = {
  name: "tariffs",
  columns: [
    columnHelper.accessor('fromDate', {
      header: TARIFF_LIST.FROM_DATE,
      enableHiding: false
    }),
    columnHelper.accessor('toDate', {
      header: TARIFF_LIST.TO_DATE
    }),
    columnHelper.display({
      header: "#Units and Rate"
    })
  ],
  params: {
    url: "/cng/tariffs"
  },
  alterOptions: {
    columnChooser: false,
    pagination: true
  }
}

export default tariffSlice;
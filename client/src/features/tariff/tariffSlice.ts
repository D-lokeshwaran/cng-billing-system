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
    columnChooser: false
  }
//   _mock: [
//     {
//         fromDate: new Date(),
//         toDate: new Date(),
//         maxUnit: 1111,
//         unitRateAboveMax: 10.34
//     },
//     {
//         fromDate: new Date(),
//         toDate: new Date(),
//         maxUnit: 2222,
//         unitRateAboveMax: 30.34
//     },
//     {
//         fromDate: new Date(),
//         toDate: new Date(),
//         maxUnit: 2222,
//         unitRateAboveMax: 40.56
//     },
//     {
//         fromDate: new Date(),
//         toDate: new Date(),
//         maxUnit: 2222,
//         unitRateAboveMax: 90.43
//     }
//   ]
}

export default tariffSlice;
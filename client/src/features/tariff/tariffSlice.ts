import { createColumnHelper } from "@tanstack/react-table"
import { SliceProps } from "src/components/table/types";
import { TARIFF_LIST } from "src/constants/labels";

export type Tariff = {
    id: number,
    fromDate: Date,
    toDate: Date,
    unitsAndRate: {
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
    columnHelper.accessor('maxUnit', {
      header: TARIFF_LIST.MAX_UNIT
    }),
    columnHelper.accessor('unitRateAboveMax', {
      header: TARIFF_LIST.UNIT_RATE_ABOVE_MAX
    })
  ],
//   params: {
//     url: "/cng/tariffs"
//   },
  _mock: [
    {
        fromDate: new Date(),
        toDate: new Date(),
        maxUnit: 1111,
        unitRateAboveMax: 10.34
    },
    {
        fromDate: new Date(),
        toDate: new Date(),
        maxUnit: 2222,
        unitRateAboveMax: 30.34
    },
    {
        fromDate: new Date(),
        toDate: new Date(),
        maxUnit: 2222,
        unitRateAboveMax: 40.56
    },
    {
        fromDate: new Date(),
        toDate: new Date(),
        maxUnit: 2222,
        unitRateAboveMax: 90.43
    }
  ]
}

export default tariffSlice;
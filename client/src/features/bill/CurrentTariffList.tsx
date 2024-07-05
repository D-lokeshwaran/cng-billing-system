import { createColumnHelper } from "@tanstack/react-table";
import ReadyMadeTable from "src/components/table/ReadyMadeTable";
import { SliceProps } from "src/components/table/types";

type CurrentTariff = {
    fromUnit: number,
    toUnit: string,
    ratePerUnit: number
}

const columnHelper = createColumnHelper<CurrentTariff>();

const currentTariffListSlice: SliceProps = {
    name: "tariffs",
    columns: [
        columnHelper.accessor("fromUnit", {
            header: "From unit"
        }),
        columnHelper.accessor("toUnit", {
            header: "To unit"
        }),
        columnHelper.accessor("ratePerUnit", {
            header: "Rate per unit"
        }),
    ],
    alterOptions: {
        rowSelection: false
    },
    _mock: [
        {
            fromUnit: 100,
            toUnit: '140',
            ratePerUnit: 23.45
        }, {
            fromUnit: 140,
            toUnit: '300',
            ratePerUnit: 23.45
        }, {
            fromUnit: 300,
            toUnit: '560',
            ratePerUnit: 23.45
        }, {
            fromUnit: 560,
            toUnit: 'above',
            ratePerUnit: 23.45
        }, 
    ]
}

const CurrentTariffList = () => {

    return (
        <ReadyMadeTable slice={currentTariffListSlice}/>
    )

}

export default CurrentTariffList;
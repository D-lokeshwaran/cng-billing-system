import { createColumnHelper } from "@tanstack/react-table";
import TanStackTable from "src/components/table/TanStackTable"
import { SliceProps } from "src/components/table/types";
import { Card } from "react-bootstrap"
import { useTableAdapter } from "src/hooks";

type CurrentTariff = {
    fromUnit: number,
    toUnit: string,
    ratePerUnit: number
}

const columnHelper = createColumnHelper<CurrentTariff>();

const currentTariffListSlice: SliceProps = {
    name: "unitsAndRates",
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
    ]
}

const CurrentTariffList = ({ data }) => {
    const table = useTableAdapter({
        columns: currentTariffListSlice.columns,
        _mock: data[currentTariffListSlice.name]
    })

    return (
        <Card body className="mt-3 rounded">
            <TanStackTable table={table} />
        </Card>
    )

}

export default CurrentTariffList;
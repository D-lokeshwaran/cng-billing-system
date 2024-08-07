import { SliceProps } from "src/components/table/types";
import { createColumnHelper } from "@tanstack/react-table"

const columnHelper = createColumnHelper<Tariff>()

const ActivityLogSlice: SliceProps = {
    name: "activityLogs",
    columns: [
        columnHelper.accessor
    ]
}
import { SliceProps } from "src/components/table/type"
import { createColumnHelper } from "@tanstack/react-table"
import { formateDate } from "src/utils/date";

export type ActivityLog = {
    createdAt: Date,
    action: String,
    entityName: String,
    changes: String,
    referKeys: {
        entity: String,
        id: Number
    }
}

const columnHelper = createColumnHelper<ActivityLog>()

const activityLogSlice: SliceProps = {
    name: "activityLogs",
    params: {
        url: "/cng/activityLogs"
    },
    columns: [
        columnHelper.accessor('createdAt', {
            header: "Created At",
            cell: ({ row }) => formateDate(row.original.createdAt)
        }),
        columnHelper.accessor('entityName', {
            header: "Category"
        }),
        columnHelper.accessor('action', {
            header: "Action"
        }),
        columnHelper.accessor('action', {
            header: "Action"
        }),
    ],
}

export default activityLogSlice;
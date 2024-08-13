import { createColumnHelper } from "@tanstack/react-table"
import { SliceProps } from "src/components/table/types";
import FlexBox from "src/components/common/FlexBox";

type User  = {
    profile: {
        fullName: String,
        emailAddress: String,
        phoneNumber: String,
        avatar: String,
    },
    role: String,
    createdAt: Date,
    updatedAt: Date,
}
const columnHelper = createColumnHelper<User>()

const userSlice: SliceProps = {
    name: "users",
    columns: [
        columnHelper.display({
            id: "name",
            header: "Name",
            cell: ({ row }) => (
                <FlexBox>
                    <img src={row.original.avatar} height="40" className="rounded"/>
                    <div className="ms-3">
                        <h6 className="mb-0">{row.original.profile.fullName}</h6>
                        <small className="text-secondary">{row.original.emailAddress}</small>
                    </div>
                </FlexBox>
            )
        }),
        columnHelper.accessor('profile.phoneNumber', {
            header: "Phone Number"
        }),
        columnHelper.accessor('roles', {
            header: "Role",
            cell: ({ row }) => row.original.roles
        }),
        columnHelper.accessor('createdAt', {
            header: "Created At"
        })
    ]
}

export default userSlice;
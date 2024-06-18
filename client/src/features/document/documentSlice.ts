import { createColumnHelper } from "@tanstack/react-table"

export type Document = {
    name: number,
    createdAt: string | DateConstructor,
    document: string
}

const columnHelper = createColumnHelper<Document>()

class DocumentSlice {

    name = "documents"
    columns = [
      columnHelper.accessor('name', {
        header: "Name",
        enableHiding: false
      }),
      columnHelper.accessor('createdAt', {
        header: "Created At"
      }),
      columnHelper.accessor('document', {
        header: "Document"
      })
    ]
    _mock = [
        {
            name: "doc1",
            createdAt: "12/2/24",
            document: "delivary_unit.txt"
        }
    ]

}

export default new DocumentSlice();
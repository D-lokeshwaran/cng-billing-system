import { ColumnDef } from "@tanstack/react-table";

interface Params {
    url: string;
    method?: string;
}

export interface AlterOptions {
    globelFilter?: boolean,
    columnChooser?: boolean,
    rowSelection?: boolean,
    export?: boolean,
    pagination?: boolean,
    initPageSize?: number
}

export type SliceProps = {
    name: string,
    columns: ColumnDef<any, any>[],
    params?: Params,
    _mock?: any[],
    alterOptions?: AlterOptions
    columnVisibility?: {[int:string]: boolean},
    [int:string]: any
}
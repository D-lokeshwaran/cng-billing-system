import { ColumnDef } from "@tanstack/react-table";

interface Params {
    url: string;
    method: string;
}

export interface UseTableAdapterProps<T> {
    data: T[];
    columns: ColumnDef<T, any>[];
    params?: Params;
}
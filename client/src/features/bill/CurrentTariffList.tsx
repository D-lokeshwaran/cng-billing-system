import { createColumnHelper } from "@tanstack/react-table";
import TanStackTable from "src/components/table/TanStackTable"
import { DatabaseAddIcon, PencilEdit01Icon } from "hugeicons-react";
import ErrorMessage from "src/components/form/ErrorMessage";
import IconButton from "src/components/common/IconButton";
import { useRouter } from "src/hooks";
import { useBillContext } from "src/context/BillContext";
import { SliceProps } from "src/components/table/types";
import { Card, Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import moment from "moment";
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
    const router = useRouter();
    const { billDetails } = useBillContext();
    const { register, formState: { errors } } = useFormContext();

    const TariffBody = () => {
        if (data) {
            const { table } = useTableAdapter({
                columns: currentTariffListSlice.columns,
                _mock: data[currentTariffListSlice.name],
                options: {
                    enableRowSelection: false
                }
            })
            return <TanStackTable table={table} />
        } else {
            return (
                <div className="text-center">
                    <DatabaseAddIcon size="14%" className={`${errors?.["tariffId"]?.message ? "text-danger" : "gray-100"} mb-0`}/>
                    <ErrorMessage errorMessage={errors?.["tariffId"]?.message} className="justify-content-center "/>
                    <div className="mb-4">
                        <small className="text-secondary">Tariff doesn't exists for billing Date ({moment(billDetails?.billingDate).format("DD-MM-YYYY")}). Create a Tariff or change billing Date.</small>
                    </div>
                    <Button size="sm" type="button" onClick={() => router.push("/tariffs/new")}>
                        Create Tariff
                    </Button>
                </div>
            )
        }
    }

    return (
        <Card className="mt-3 rounded">
            <Card.Header className="d-flex justify-content-between">
                <div>
                    <h3 className="mb-0">Tariffs</h3>
                    <small className="text-secondary">Based on billing date tariffs will change.</small>
                </div>
                {data && !billDetails?.billId && <IconButton icon={PencilEdit01Icon} onClick={() => router.push(`/tariffs/${data?.id}`)}/>}
            </Card.Header>
            <Card.Body>
                <input
                    type="hidden"
                    {...register("tariffId", {
                        validate: {
                            required: (v) => billDetails?.tariffId || "Tariff is required.",
                        }
                    })}
                />
                <TariffBody/>
            </Card.Body>
        </Card>
    )

}

export default CurrentTariffList;
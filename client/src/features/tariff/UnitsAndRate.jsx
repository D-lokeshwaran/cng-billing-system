import { useFieldArray, useFormContext } from "react-hook-form"
import { Button, FormControl } from "react-bootstrap"
import { Delete02Icon } from "hugeicons-react";
import ErrorMessage from "src/components/form/ErrorMessage";

const UnitsAndRate = () => {

    const { register, formState: { errors }, watch, trigger } = useFormContext();
    const { fields, append, remove} = useFieldArray({
        name: "unitsAndRate",
        keyName: "id"
    })
    const watchUnitsAndRate = watch("unitsAndRate");
    const maxUnit = watchUnitsAndRate.map(field => field.toUnit).sort().reverse()[0];
    const fieldError = errors?.unitsAndRate?.filter(field => field.toUnit !== null)?.[0];

    return (
        <table>
            <thead><tr className="m-4 p-5">
                <th>From Unit</th>
                <th>To Unit</th>
                <th>Rate per Unit</th>
            </tr></thead>
            <tbody>
                {fields.map((field, index) => {
                    const previosField = watchUnitsAndRate[index -1];
                    const currentField = watchUnitsAndRate[index];
                    const nextField = watchUnitsAndRate[index +1];

                    return (
                        <tr>
                            <td>
                                <FormControl
                                    {...register(`unitsAndRate.${index}.fromUnit`)}
                                    value={previosField?.toUnit}
                                    disabled
                                />
                            </td>
                            <td>
                                <FormControl
                                    {...register(`unitsAndRate.${index}.toUnit`, {
                                        required: {value: true, message: "To unit(s) are required."},
                                        min: {value: parseInt(previosField?.toUnit) +1, message: "To unit should be greater than from unit."},
                                    })}
                                    isInvalid={errors?.unitsAndRate?.[index]?.toUnit?.message}
                                />
                            </td>
                            <td>
                                <FormControl
                                    {...register(`unitsAndRate.${index}.ratePerUnit`, {
                                        required: {value: true, message: "Rate per Unit(s) are required."},
                                        min: {value: previosField?.ratePerUnit, message: "Rate per unit should be greater than previos rate per unit"},
                                    })}
                                    isInvalid={errors?.unitsAndRate?.[index]?.ratePerUnit?.message}
                                />
                            </td>
                            {index > 2 && <td className="ps-3 pe-2">
                                <Delete02Icon
                                    size={18}
                                    onClick={() => remove(index)}
                                />
                            </td>}
                        </tr>
                    )
                })}
            </tbody>
            <tfoot>
                <tr><td colSpan={4}>
                    <ErrorMessage errorMessage={fieldError?.toUnit?.message}/>
                    <ErrorMessage errorMessage={fieldError?.ratePerUnit?.message}/>
                </td></tr>
                <tr>
                    <td>
                        <Button
                            size="sm"
                            variant="light"
                            onClick={() => {
                                const lastField = watchUnitsAndRate[fields.length -1];
                                if (fieldError || !lastField.toUnit || !lastField.ratePerUnit) {
                                    trigger("unitsAndRate")
                                    return;
                                }
                                append({ fromUnit: lastField.toUnit})
                            }}
                        >
                            + Add Item
                        </Button>
                    </td>
                    <td className="text-end">
                        Rate above {maxUnit} units:
                    </td>
                    <td>
                        <FormControl type="number" />
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default UnitsAndRate;
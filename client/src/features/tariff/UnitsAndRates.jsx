import { useFieldArray, useFormContext } from "react-hook-form"
import { Button, FormControl } from "react-bootstrap"
import { Delete02Icon } from "hugeicons-react";
import ErrorMessage from "src/components/form/ErrorMessage";

const UnitsAndRates = () => {

    const { register, formState: { errors }, watch, trigger, setValue} = useFormContext();
    const { fields, append, remove} = useFieldArray({
        name: "unitsAndRates",
        keyName: "id"
    })
    const watchUnitsAndRates = watch("unitsAndRates");
    const lastField = watchUnitsAndRates[fields.length -1];
    const maxUnit = watchUnitsAndRates.map(field => parseInt(field.toUnit)).sort().reverse()[0];
    setValue("maxUnit", parseInt(maxUnit) +1);
    const fieldError = errors?.unitsAndRates?.filter(field => field?.toUnit !== null)?.[0];

    return (
        <table>
            <thead><tr className="m-4 p-5">
                <th>From Unit</th>
                <th>To Unit</th>
                <th>Rate per Unit</th>
            </tr></thead>
            <tbody>
                {fields.map((field, index) => {
                    const previousField = watchUnitsAndRates[index -1];
                    const currentField = watchUnitsAndRates[index];
                    const nextField = watchUnitsAndRates[index +1];

                    return (
                        <tr key={field.id}>
                            <td>
                                <FormControl
                                    {...register(`unitsAndRates.${index}.fromUnit`, {value: previousField?.fromUnit})}
                                    step={.01}
                                    disabled
                                />
                            </td>
                            <td>
                                <FormControl
                                    {...register(`unitsAndRates.${index}.toUnit`, {
                                        required: {value: true, message: "To unit(s) are required."},
                                        min: {value: parseInt(previousField?.toUnit), message: "To unit should be greater than from unit."},
                                    })}
                                    isInvalid={errors?.unitsAndRates?.[index]?.toUnit?.message}
                                    type="number"
                                />
                            </td>
                            <td>
                                <FormControl
                                    {...register(`unitsAndRates.${index}.ratePerUnit`, {
                                        valueAsNumber: true,
                                        required: {value: true, message: "Rate per Unit(s) are required."},
                                        min: {value: previousField?.ratePerUnit, message: "Rate per unit should be greater than previos rate per unit"},
                                    })}
                                    isInvalid={errors?.unitsAndRates?.[index]?.ratePerUnit?.message}
                                    type="number"
                                    step="any"
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
                                trigger("unitsAndRates")
                                if (fieldError || !lastField.toUnit || !lastField.ratePerUnit) {
                                    return;
                                }
                                append({ fromUnit: parseInt(lastField.toUnit) +1 })
                            }}
                        >
                            + Add Item
                        </Button>
                    </td>
                    <td className="d-flex justify-content-end mt-2">
                        <FormControl {...register("maxUnit")}  type="hidden"/>
                        Rate above {maxUnit} unit:
                    </td>
                    <td>
                        <FormControl
                            {...register("unitRateAboveMax", {
                                required: { value: true, message: `Rate is required`},
                                min: { value: parseFloat(lastField?.ratePerUnit), message: `Should be greater than last rate (${lastField?.ratePerUnit})`}
                            })}
                            type="number"
                            step="any"
                            isInvalid={errors?.unitRateAboveMax?.message}
                        />
                        <ErrorMessage errorMessage={errors?.unitRateAboveMax?.message} />
                    </td>
                </tr>
            </tfoot>
        </table>
    )
}

export default UnitsAndRates;
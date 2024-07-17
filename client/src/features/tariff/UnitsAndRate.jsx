import { useFieldArray, useFormContext } from "react-hook-form"
import { Button, FormControl } from "react-bootstrap"
import { Delete02Icon } from "hugeicons-react";
import ErrorMessage from "src/components/form/ErrorMessage";

const UnitsAndRate = () => {

    const { register, formState: { errors }, watch, setError, clearErrors } = useFormContext();
    const { fields, append, remove} = useFieldArray({
        name: "unitsAndRate",
        keyName: "id"
    })
    const watchUnitsAndRate = watch("unitsAndRate");
    const maxUnit = watchUnitsAndRate.map(field => field.toUnit).sort().reverse()[0];

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

                    const isInvalidToUnit = parseInt(previosField?.toUnit) +1 > currentField?.toUnit
                        || nextField?.toUnit && currentField?.toUnit > nextField?.toUnit;
                    const isInvalidRatePerUnit = Number(previosField?.ratePerUnit) > Number(currentField?.ratePerUnit)
                        || nextField?.ratePerUnit && currentField?.ratePerUnit > nextField?.ratePerUnit;
                    
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
                                        min: {value: parseInt(previosField?.toUnit) +1, message: "To unit should be greater than from unit."},
                                    })}
                                    isInvalid={isInvalidToUnit}
                                />                             
                            </td>
                            <td>
                                <FormControl
                                    {...register(`unitsAndRate.${index}.ratePerUnit`, { 
                                        min: {value: previosField?.ratePerUnit, message: "Should be above 200"},
                                    })}
                                    isInvalid={isInvalidRatePerUnit}
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
                    <ErrorMessage errorMessage={errors?.unitsAndRate?.validate?.message}/>
                    <ErrorMessage errorMessage={errors?.unitsAndRate?.[3]?.toUnit?.message}/>
                </td></tr>
                <tr>
                    <td>
                        <Button 
                            size="sm" 
                            variant="light"
                            onClick={() => {
                                const lastField = watchUnitsAndRate[fields.length -1];
                                if(!lastField.toUnit || !lastField.ratePerUnit) {
                                    // setError("unitsAndRate.validate", {
                                    //     type: "required",
                                    //     message: "To unit and Rate per Unit is required to add another field."
                                    // })
                                    return;
                                }
                                if (errors.unitsAndRate) {

                                }
                                append({ fromUnit: lastField.toUnit, toUnit: 0, ratePerUnit: 0})
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
import React, { ChangeEvent } from "react";
import { ListGroup, ListGroupItem, Button, FormControl, Form, Row, Col, FormGroup } from "react-bootstrap";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { Tariff } from "./tariffSlice";
import FlexBox from "src/components/common/FlexBox";

interface UnitAndRateListProps {

}

const UnitAndRateList: React.FC<UnitAndRateListProps> = ({

}) => {

    const { control, register, formState: { errors }, watch, setError } = useFormContext<Tariff>();
    const { fields, append, remove } = useFieldArray({
        control,
        name: "unitsAndRate",
        keyName: "id",
        rules: {
            minLength: 3
        }
    })

    const fieldsWithToUnit = fields.filter(field => field.toUnit > 0);
    const validLastField = fieldsWithToUnit[fieldsWithToUnit.length -1];

    const watchLastFieldToUnit = watch(`unitsAndRate.${fields.length -1}.toUnit`);

    const handleAddField = () => {
        const field = {
            fromUnit: validLastField.toUnit,
            toUnit: 0,
            ratePerUnit: 0
        }
        console.log(watchLastFieldToUnit)
        
        if (watchLastFieldToUnit) {
            append(field);
        } else {
            alert("To unit is required to add another field");
        }
    }
    
    const handleChangeToUnit = (e: ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        if (value.toString().length <= 0) {
            setError(`unitsAndRate.${index}.toUnit`, {type: "manual", message: "To unit should not be empty."})
        }
    }

    return (
        <div>
            <ListGroup className="mb-3" variant="flush">
                {fields.map((field, index) => (
                    <Controller
                        key={field.id}
                        control={control}
                        name={`unitsAndRate.${index}`}
                        rules={{
                            validate: (v) => {
                                console.log(v);
                                return true
                            }
                        }}
                        render={() => (
                            <ListGroupItem key={index} as={FlexBox} className="px-0">
                                <FormControl 
                                    {...register(`unitsAndRate.${index}.fromUnit`, {
                                        valueAsNumber: true
                                    })}
                                    disabled
                                />
                                <FormControl 
                                    {...register(`unitsAndRate.${index}.toUnit`, {
                                        valueAsNumber: true,
                                        onChange: (e: ChangeEvent<HTMLInputElement>) => handleChangeToUnit(e, index)
                                    })}
                                    type="number"
                                    isInvalid={fields.length -1 == index && watchLastFieldToUnit.toString().length > 0}
                                />
                                <FormControl
                                    {...register(`unitsAndRate.${index}.ratePerUnit`, {
                                        valueAsNumber: true,
                                        required: true
                                    })}
                                    type="number"
                                />
                                <Button variant="ghost" onClick={() => remove(index)}>
                                    Delete
                                </Button>
                            </ListGroupItem>
                        )}
                    />
                ))}
                <ListGroupItem className="px-0" as={FlexBox} justify="between">
                    <Button 
                        size="sm" 
                        variant="light"
                        onClick={handleAddField}
                    >
                        + Add Item
                    </Button>
                    <Form.Group as={Row} className="justify-content-end">
                        <Form.Label column sm="auto">
                            Rate above 100 units:
                        </Form.Label>
                        <Col sm="7">
                            <Form.Control defaultValue="" type="number"/>
                        </Col>
                    </Form.Group>
                </ListGroupItem>
            </ListGroup>
        </div>
    )

}

export default UnitAndRateList
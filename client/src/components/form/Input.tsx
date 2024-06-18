import React from 'react';
import { FormControl, FormControlProps, FormGroup, FormGroupProps, FormLabel } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

type FieldType = {
    title: string,
    state: string,
}

interface InputProps extends FormGroupProps {
    field: FieldType;
    required?: boolean;
    validate?: Record<string, (v: any) => string | undefined>;
    control?: FormControlProps;
}

const defaultValidate = (
    required: boolean, 
    field: FieldType
): Record<string, (v: any) => string | undefined> => {
    return {
        required: (v) => 
            required &&  v.toString().trim().length > 0 
                ? undefined
                : `Enter your ${field.title}`,
        positive: (v) => Number.isNaN(parseInt(v, 10))
            ? undefined
            : parseInt(v, 10) > 0
                ? undefined 
                : "Number is not positive",
    }
}

const Input: React.FC<InputProps> = ({ 
    field,
    required=true,
    validate,
    control,
    ...props
 }) => {

    const { register, formState: { errors, dirtyFields }} = useFormContext();

    return (
        <FormGroup {...props}>
            <FormLabel>{field.title}*</FormLabel>
            <FormControl
                {...register(
                    field.state, 
                    {  validate: { 
                        ...defaultValidate(required, field),
                        ...validate
                    } }
                )}
                isInvalid={dirtyFields[field.state] && errors[field.state]?.message 
                    ? true : false}
                {...control}
            />
            <FormControl.Feedback type="invalid">
                <>{errors[field.state]?.message}</>
            </FormControl.Feedback>
        </FormGroup>
    )

}

export default Input;
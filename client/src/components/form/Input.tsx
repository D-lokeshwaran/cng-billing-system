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
        required: (v) => required && v.toString().trim().length === 0
            ? `Enter your ${field.title.toLowerCase()}`
            : undefined,
        positive: (v) => parseInt(v, 10) < 0
            ? "Number is not positive"
            : undefined
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

    const errorMessage = dirtyFields[field.state] && errors[field.state]?.message;

    return (
        <FormGroup {...props} className="mb-3">
            <FormLabel className="mb-1">{field.title}<span style={{color:"#dc3545"}}>{required && ' *'}</span></FormLabel>
            {errorMessage && <div style={{fontSize: ".80rem"}} className='mb-1 d-flex align-items-center'>
                <svg xmlns="http://www.w3.org/2000/svg"  width="17"  height="17"  viewBox="0 0 24 24"  fill="none"  stroke="#dc3545"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-exclamation-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 9v4" /><path d="M12 16v.01" /></svg>
                <span className='ps-1'>{errorMessage}</span>
            </div>}
            <FormControl
                {...register(
                    field.state, 
                    {  validate: { 
                        ...defaultValidate(required, field),
                        ...validate
                    } }
                )}
                isInvalid={errorMessage}
                {...control}
            />
        </FormGroup>
    )

}

export default Input;
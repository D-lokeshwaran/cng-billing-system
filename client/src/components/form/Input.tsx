import { AlertCircleIcon } from 'hugeicons-react';
import React from 'react';
import { FormControl, FormGroup, FormLabel } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { FieldType, InputProps } from './type';

const defaultValidate = (
    required: boolean, 
    field: FieldType
): Record<string, (v: any) => string | undefined> => {
    return {
        required: (v) => required && v?.toString().trim().length === 0
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

    const { register, formState: { errors }} = useFormContext();

    const errorMessage = errors[field.state]?.message;

    return (
        <FormGroup {...props} className="mb-3">
            <FormLabel className="mb-1">{field.title}<span style={{color:"#dc3545"}}>{required && ' *'}</span></FormLabel>
            <FormControl
                {...register(
                    field.state, 
                    {  validate: { 
                        ...defaultValidate(required, field),
                        ...validate
                    } }
                )}
                type={field.type}
                isInvalid={errorMessage !== undefined}
                {...control}
            />
            {errorMessage && <div style={{fontSize: ".80rem"}} className='mt-1 d-flex align-items-center'>
                <AlertCircleIcon 
                    size={14} 
                    color="#dc3545"
                    strokeWidth='2.5'    
                />
                <span className='ps-1 text-secondary'>{`${errorMessage}`}</span>
            </div>}
        </FormGroup>
    )

}

export default Input;
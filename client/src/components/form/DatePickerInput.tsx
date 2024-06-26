import { Controller, useFormContext } from 'react-hook-form';
import { FieldType } from './type';
import DatePicker from 'react-datepicker';
import { FormGroup, FormLabel } from 'react-bootstrap';
import { AlertCircleIcon } from 'hugeicons-react';
import classNames from 'classnames';
import { DATE_FORMATS } from 'src/config';

interface DatePickerInputProps {
    field: FieldType;
    required?: boolean;
    validate?: Record<string, (v: any) => string | undefined>;
}

const DatePickerInput = ({
    field,
    required=true,
    validate,
    ...props
}: DatePickerInputProps) => {

    const { control, formState: {errors} } = useFormContext();
    const errorMessage = errors[field.state]?.message;

    return (
        <FormGroup>
            <FormLabel className="mb-1 d-block">
                {field.title}<span style={{color:"#dc3545"}}>{required && ' *'}</span>
            </FormLabel>
            {errorMessage && <div style={{fontSize: ".80rem"}} className='mb-1 d-flex align-items-center'>
                <AlertCircleIcon 
                    size={14} 
                    color="#dc3545"
                    strokeWidth='2.5'    
                />
                <span className='ps-1'>{`${errorMessage}`}</span>
            </div>}
            <Controller
                control={control}
                name={field.state}
                defaultValue={field.defaultValue || new Date()}
                render={({ field: { value, onChange } }) => (
                    <DatePicker
                        placeholderText='Pick date'
                        onChange={(date) => onChange(date)}
                        selected={value}
                        isClearable
                        showDateSelect
                        className={classNames("form-control", {
                            'is-invalid': errorMessage
                        })}
                        dateFormat={DATE_FORMATS}
                        wrapperClassName='w-100'
                        {...props}
                    />
                )}  
                rules={{
                    validate: {
                        required: (v: any) => v !== null || "Please, pick one date"
                    }
                }} 
            />
        </FormGroup>
    )

}

export default DatePickerInput;
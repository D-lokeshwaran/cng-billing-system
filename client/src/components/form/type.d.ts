import { FormControlProps, FormGroupProps } from 'react-bootstrap';

export type FieldType = {
    title: string,
    state: string,
    type?: string,
    defaultValue?: any,
}

export interface InputProps extends FormGroupProps {
    field: FieldType;
    required?: boolean;
    validate?: Record<string, (v: any) => string | undefined>;
    control?: FormControlProps;
    showLabel?: boolean;
}

import React from "react";
import { Form, FormProps } from "react-bootstrap";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

interface HookFormProps extends FormProps {
    children: React.ReactNode;
    onSubmit: SubmitHandler<any>;
    defaultValues?: object;
    debug?: boolean;
}

const HookForm: React.FC<HookFormProps> = ({ 
    children, 
    onSubmit,
    defaultValues=null,
    ...props
}) => {
    const methods = useForm({
        mode: "all",
        values: {...defaultValues}
    });

    const handleOnSubmit: SubmitHandler<any> = (data, event) => {
        event?.stopPropagation();
        if (Object.keys(methods.formState.errors).length === 0) {
            console.log(`Form data: ${data}`)
            onSubmit(data);
        }
    }

    return (
        <FormProvider {...methods}>
            <Form onSubmit={methods.handleSubmit(handleOnSubmit)} {...props}>
                {children}
            </Form>
        </FormProvider>
    )

}

export default HookForm;
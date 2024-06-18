import React from "react";
import { Form, FormProps } from "react-bootstrap";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

interface HookFormProps extends FormProps {
    children: React.ReactNode;
    onSubmit: SubmitHandler<any>;
    defaultValues?: object;
}

const HookForm: React.FC<HookFormProps> = ({ 
    children, 
    onSubmit,
    defaultValues={},
    ...props
}) => {
    const methods = useForm({
        mode: "onSubmit",
        defaultValues: defaultValues
    });

    const handleOnSubmit: SubmitHandler<any> = (data, event) => {
        event?.stopPropagation();
        onSubmit(data);
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
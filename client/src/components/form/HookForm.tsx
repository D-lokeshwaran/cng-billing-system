import React, { useEffect } from "react";
import { Form, FormProps } from "react-bootstrap";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form"

interface HookFormProps extends FormProps {
    children: React.ReactNode;
    onSubmit: SubmitHandler<any>;
    initialValues?: object;
    debug?: boolean;
}

const HookForm: React.FC<HookFormProps> = ({ 
    children, 
    onSubmit,
    initialValues=null,
    ...props
}) => {
    const methods = useForm({
        mode: "all",
    });

    useEffect(() => {
        if (initialValues) {
            debug(`Initial values: ${initialValues}`)
            methods.reset(initialValues);
        }
    }, [initialValues])

    const handleOnSubmit: SubmitHandler<any> = (data, event) => {
        event?.stopPropagation();
        if (Object.keys(methods.formState.errors).length === 0) {
            debug(`Form data: ${data}`)
            onSubmit(data);
        }
    }

    const debug = (message: any, type?: string = "log") => {
        if (props.debug == true) {
            console[type](message);
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
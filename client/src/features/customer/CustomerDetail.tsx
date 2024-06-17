import { SubmitHandler, useForm } from "react-hook-form";
import { Customer } from "./customerSlice";
import { Button, Card, Form, FormGroup } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import AccountDetails from "./components/AccountDetails";
import FeatureHeader from "src/components/structure/FeatureHeader";


const CustomerForm = () => {

    const defaultValues = {
    };
    const { 
        register, 
        handleSubmit, 
        control, 
        formState: { isValid, errors },
        reset 
    } = useForm<Customer>({
        defaultValues,
        mode: "all"
    });

    const onSubmitCustomer: SubmitHandler<Customer> = (data) => {
        console.log(data);
    }

    return (
        <Form onSubmit={handleSubmit(onSubmitCustomer)}>
            <FeatureHeader title="Create Customer" className="justify-content-between">
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </FeatureHeader>
            <FlexBox>
                <div>
                    <AccountDetails register={register} control={control}/>
                </div>
                <div>

                </div>
            </FlexBox>
        </Form>
    )
}

export default CustomerForm;
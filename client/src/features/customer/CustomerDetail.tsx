import { SubmitHandler } from "react-hook-form";
import { Customer } from "./customerSlice";
import { Button } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import AccountDetails from "./components/AccountDetails";
import FeatureHeader from "src/components/structure/FeatureHeader";
import HookForm from "src/components/form/HookForm";
import BillingInfo from "./components/BillingInfo";


const CustomerForm = () => {

    const onSubmitCustomer: SubmitHandler<Customer> = (data) => {
        console.log(data);
    }

    return (
        <HookForm onSubmit={onSubmitCustomer}>
            <FeatureHeader title="Create Customer" className="justify-content-between">
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </FeatureHeader>
            <FlexBox>
                <div>
                    <AccountDetails />
                </div>
                <div>
                    <BillingInfo/>
                </div>
            </FlexBox>
        </HookForm>
    )
}

export default CustomerForm;
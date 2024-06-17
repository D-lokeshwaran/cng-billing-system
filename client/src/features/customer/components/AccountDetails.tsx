import { Card, FormControl, FormGroup, FormLabel } from "react-bootstrap"
import { Control, UseFormRegister, UseFormReturn, useFormState } from "react-hook-form"
import FlexBox from "src/components/common/FlexBox"
import { Customer } from "../customerSlice"

interface AccountDetailsProps { register: UseFormRegister<Customer>, control: Control<Customer, any> }


const AccountDetails: React.FC<AccountDetailsProps> = ({ register, control }) => {

    const { errors } = useFormState({ control });

    return (
        <Card>
            <Card.Header>
                Account Details
            </Card.Header>
            <Card.Body>
                <FlexBox>
                    <FormGroup>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl
                            isValid={errors?.accountNumber === undefined}
                            {...register("accountNumber", { required: true, min: 11, max:16 })}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>Contact Number</FormLabel>
                        <FormControl
                            {...register("contactNumber", { required: true, pattern: /^[0-9]{10}/ })}
                        />
                    </FormGroup>
                </FlexBox>
                <FormGroup>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl
                        placeholder="firstname & lastname"
                        {...register("fullName", { required: true })}
                    />
                </FormGroup>
            </Card.Body>
        </Card>
    )
}

export default AccountDetails;
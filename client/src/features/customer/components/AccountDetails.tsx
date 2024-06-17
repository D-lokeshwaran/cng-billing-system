import { Card, Col, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap"
import { Control, UseFormRegister, useFormState } from "react-hook-form"
import { Customer } from "../customerSlice"

interface AccountDetailsProps { register: UseFormRegister<Customer>, control: Control<Customer, any> }


const AccountDetails: React.FC<AccountDetailsProps> = ({ register, control }) => {

    const { errors, touchedFields } = useFormState({ control });
    
    return (
        <Card>
            <Card.Header>
                Account Details
            </Card.Header>
            <Card.Body>
                <Row className="gx-5">
                    <Col as={FormGroup}>
                        <FormLabel>Account Number*</FormLabel>
                        <FormControl
                            {...register(
                                "accountNumber", 
                                { required: true, pattern: /^[a-zA-Z0-9]{11,16}$/g }
                            )}
                            isInvalid={
                                touchedFields.accountNumber && errors.accountNumber !== undefined
                            }
                        />
                        <FormControl.Feedback type="invalid">
                            Please, provide valid account number
                        </FormControl.Feedback>
                    </Col>
                    <Col as={FormGroup}>
                        <FormLabel>Contact Number*</FormLabel>
                        <FormControl
                            {...register(
                                "contactNumber", 
                                { required: true, pattern: /^[0-9]{10}/ }
                            )}
                            isInvalid={
                                touchedFields.contactNumber && errors.contactNumber !== undefined
                            }
                        />
                        <FormControl.Feedback type="invalid">
                            Please, provide valid contact number
                        </FormControl.Feedback>
                    </Col>
                </Row>
                <FormGroup>
                    <FormLabel>Full Name*</FormLabel>
                    <FormControl
                        placeholder="firstname & lastname"
                        {...register("fullName", { required: true })}
                        isInvalid={
                            touchedFields.fullName && errors.fullName !== undefined
                        }
                    />
                    <FormControl.Feedback type="invalid">
                        Enter your full name
                    </FormControl.Feedback>
                </FormGroup>
            </Card.Body>
        </Card>
    )
}

export default AccountDetails;
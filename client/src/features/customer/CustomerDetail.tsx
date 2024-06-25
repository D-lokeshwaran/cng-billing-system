import { SubmitHandler } from "react-hook-form";
import { Customer } from "./customerSlice";
import { Button, Card, Col, Row } from "react-bootstrap";
import FeatureHeader from "src/components/structure/FeatureHeader";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import DocumentList from "./DocumentList";


const CustomerForm = () => {

    const onSubmitCustomer: SubmitHandler<Customer> = (data) => {
        console.log(data);

    }

    return (
        <div>
            <HookForm onSubmit={onSubmitCustomer}>
                <FeatureHeader title="Create Customer" className="justify-content-between">
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </FeatureHeader>
                <Card body >
                    <Row>
                        <Input
                            as={Col}
                            required={false}
                            field={{ title:"Account Number", state:"accountNumber" }}
                            control={{ disabled:true }}
                        />
                        <Input
                            as={Col}
                            field={{ title:"Fullname", state:"fullname" }}
                        />
                    </Row>
                    <Row>
                        <Input
                            as={Col}
                            field={{ title:"Email address", state:"emailAddress" }}
                        />
                        <Input
                            as={Col}
                            field={{ title:"Contact number", state:"contactNumber" }}
                        />
                    </Row>
                    <Row>
                        <Input
                            as={Col}
                            field={{ title:"State", state:"state" }}
                        />
                        <Input
                            as={Col}
                            field={{ title:"City", state:"city" }}
                        />
                    </Row>
                    <Row>
                        <Input
                            as={Col}
                            field={{ title:"Billing address", state:"billingAddress" }}
                        />
                        <Input
                            as={Col}
                            field={{ title:"Pincode", state:"pincode" }}
                        />
                    </Row>
                    <DocumentList/>
                </Card>
            </HookForm>
        </div>
    )
}

export default CustomerForm;
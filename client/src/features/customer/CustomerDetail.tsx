import { useState, useEffect } from 'react';
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Customer } from "./customerSlice";
import { Button, Card, Col, Row } from "react-bootstrap";
import FeatureHeader from "src/components/structure/FeatureHeader";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import DocumentList from "./DocumentList";
import { coreApi } from 'src/utils/api';

const CONTACT_NUMBER_REGEX = /^[0-9]{10}$/;
const EMAIL_ADDRESS_REGEX = /^[^\s@]+@[^\s@]+\.com$/;
const PINCODE_REGEX = /^[0-9]{6}$/;

const CustomerForm = () => {

    const [ customerDetails, setCustomerDetails ] = useState<Customer>();
    const { customerId } = useParams();

    useEffect(() => {
        if (customerId) {
            retrieveCustomers(customerId);
        }
    }, [customerId])

    const retrieveCustomers = async (customerId: number) => {
        const retrievedCustomer = await coreApi.get(`/cng/customers/${customerId}`);
        const customer = retrievedCustomer.data;
        const customerDocuments = await coreApi.get(`/cng/customers/${customerId}/documents`);
        const documents = customerDocuments.data._embedded.documents;
        customer["documents"] = documents;
        setCustomerDetails(customer);
    }

    const onSubmitCustomer: SubmitHandler<Customer> = async (data) => {
        const { documents, ...customer} = data;
        const newCustomer = await coreApi.post("/cng/customers", customer)
        const customerId = newCustomer.data.id;

        for (const document of documents) {
            if (document.file) {
                const formData = new FormData();
                formData.append("file", document.file);
                formData.append("customerId", customerId);
                await coreApi.post("/cng/documents", formData);
            }
        }
    }

    return (
        <div>
            <HookForm onSubmit={onSubmitCustomer} initialValues={customerDetails}>
                <pre>{JSON.stringify(customerDetails, null, 2) }</pre>
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
                            field={{ title:"Full name", state:"fullName" }}
                        />
                    </Row>
                    <Row>
                        <Input
                            as={Col}
                            field={{ title:"Email address", state:"emailAddress" }}
                            validate={{
                                format: (v: any) => v.match(EMAIL_ADDRESS_REGEX) ? undefined : "Invalid Email address"
                            }}
                        />
                         <Input
                            as={Col}
                            field={{title: "Contact number", state: "contactNumber"}}
                            validate={{
                                format: (v: any) => v.match(CONTACT_NUMBER_REGEX) ? undefined : "Must be 10 digits long"
                            }}
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
                            field={{ title: "pincode", state: "pincode"}}
                            validate={{
                                pinCodeFormat: (v: any) => v.toString().match(PINCODE_REGEX) ? undefined : "Must be 6 digits long"
                            }}
                        />
                    </Row>
                    <DocumentList/>
                </Card>
            </HookForm>
        </div>
    )
}

export default CustomerForm;

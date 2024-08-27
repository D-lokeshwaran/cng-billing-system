import { useState, useEffect } from 'react';
import { SubmitHandler } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Customer } from "./customerSlice";
import { Button, Card, Col, Row } from "react-bootstrap";
import FeatureHeader from "src/components/structure/FeatureHeader";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import DocumentList from "./DocumentList";
import { coreApi, supportApi } from 'src/utils/api';
import { trackPromise } from 'react-promise-tracker';
import { useRouter } from "src/hooks";
import { useBillContext } from "src/context/BillContext";
import { ACTIONS, CUSTOMER_DETAILS } from 'src/constants/labels';

const CONTACT_NUMBER_REGEX = /^[0-9]{10}$/;
const EMAIL_ADDRESS_REGEX = /^[^\s@]+@[^\s@]+\.com$/;
const PINCODE_REGEX = /^[0-9]{6}$/;

const CustomerForm = () => {

    const { billDetails, setBillDetails } = useBillContext();
    const [ customerDetails, setCustomerDetails ] = useState<Customer>();
    const router = useRouter();
    const { customerId } = useParams();

    useEffect(() => {
        if (customerId != "new") {
            retrieveCustomers(customerId);
        }
    }, [customerId])

    const retrieveCustomers = async (customerId: string) => {
        const retrievedCustomer = await trackPromise(coreApi.get(`/cng/customers/${customerId}`));
        const customer = retrievedCustomer.data;
        const customerDocuments = await trackPromise(coreApi.get(`/cng/customers/${customerId}/documents`));
        const documents = customerDocuments.data._embedded.documents;
        customer["documents"] = documents;
        setCustomerDetails(customer);
    }

    const onSubmitCustomer: SubmitHandler<Customer> = async (data) => {
        const { documents=[], ...customer} = data;
        if (customerId === "new") {
            await trackPromise(supportApi.post("/register", {
                emailAddress: customer.emailAddress,
                role: "Customer",
                fullName: customer.fullName,
                phoneNumber: customer.contactNumber
            }));
        }
        const customerResult = await trackPromise(coreApi({
            url: customerDetails ? `/cng/customers/${customerId}` : "/cng/customers",
            method: customerDetails ? "PUT" : "POST",
            data: customer
        }));
        const newCustomer = customerResult.data;
        const newCustomerId = newCustomer.id;
        const accountNumber = newCustomer.accountNumber;

        for (const document of documents) {
            if (document.file) {
                const formData = new FormData();
                formData.append("file", document.file);
                formData.append("customerId", newCustomerId);
                await trackPromise(coreApi.post("/cng/documents", formData));
            }
        }
        setBillDetails({...billDetails, customerId: newCustomerId});
        router.back()
    }

    return (
        <div>
            <HookForm onSubmit={onSubmitCustomer} defaultValues={customerDetails}>
                <FeatureHeader
                    title="Create Customer"
                    className="justify-content-between"
                    breadcrumbs={[
                        { title: `Bill`, path: "/bills", hidden: !billDetails},
                        { title: `${billDetails?.billId ? '#'+billDetails?.billId : 'New'}`, path:`/bills/${billDetails?.billId || "new"}` ,hidden: !billDetails},
                        { title: "Customer", path: "/customers"},
                        { title: customerId === "new" ? "New" : customerDetails?.fullName}
                    ]}
                >
                    <Button variant="primary" type="submit">
                        {customerId !== "new" ? ACTIONS.UPDATE : ACTIONS.CREATE}
                    </Button>
                </FeatureHeader>
                <Card body >
                    <Row>
                        <Input
                            as={Col}
                            required={false}
                            field={{ title:CUSTOMER_DETAILS.ACCOUNT_NUMBER, state:"accountNumber" }}
                            control={{ disabled:true }}
                        />
                        <Input
                            as={Col}
                            field={{ title:CUSTOMER_DETAILS.FULL_NAME, state:"fullName" }}
                        />
                    </Row>
                    <Row>
                        <Input
                            as={Col}
                            field={{ title:CUSTOMER_DETAILS.EMAIL_ADDRESS, state:"emailAddress" }}
                            validate={{
                                format: (v: any) => v.match(EMAIL_ADDRESS_REGEX) ? undefined : "Invalid Email address"
                            }}
                        />
                         <Input
                            as={Col}
                            field={{title: CUSTOMER_DETAILS.CONTACT_NUMBER, state: "contactNumber"}}
                            validate={{
                                format: (v: any) => v.match(CONTACT_NUMBER_REGEX) ? undefined : "Must be 10 digits long"
                            }}
                        />
                    </Row>
                    <Row>
                        <Input
                            as={Col}
                            field={{ title:CUSTOMER_DETAILS.STATE, state:"state" }}
                        />
                        <Input
                            as={Col}
                            field={{ title:CUSTOMER_DETAILS.CITY, state:"city" }}
                        />
                    </Row>
                    <Row>
                        <Input
                            as={Col}
                            field={{ title:CUSTOMER_DETAILS.BILLING_ADDRESS, state:"billingAddress" }}
                        />
                        <Input
                            as={Col} 
                            field={{ title: CUSTOMER_DETAILS.PINCODE, state: "pincode"}}
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

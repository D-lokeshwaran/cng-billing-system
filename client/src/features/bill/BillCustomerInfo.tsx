import { Attachment02Icon, PencilEdit01Icon } from "hugeicons-react"
import { Card } from "react-bootstrap"
import { useFormContext } from "react-hook-form"
import FlexBox from "src/components/common/FlexBox"
import { Bill } from "./billSlice"
import { useToggle, useRouter } from "src/hooks"
import ChooseCustomerModal from "../customer/ChooseCustomerModal"
import IconButton from "src/components/common/IconButton";
import { useBillContext } from "src/context/BillContext";
import { trackPromise } from 'react-promise-tracker';
import { coreApi } from 'src/utils/api'
import { useState, useEffect } from "react";

const BillCustomerInfo = () => {

    const { register, watch, setValue } = useFormContext<Bill>();
    const watchCustomerId = watch("customerId");
    const [ customerModal, toggleCustomerModal ] = useToggle();
    const { billDetails, setBillDetails } = useBillContext();
    const router = useRouter();
    const [ customer, setCustomer ] = useState<Customer>();

    useEffect(() => {
        if (customer?.id) {
            setBillDetails({ ...billDetails, customerId: customer.id })
            setValue("customerId", customer.id);
        }
    }, [customer?.id])

    // handle customer detail stay updated
    useEffect(() => {
        if (billDetails?.customerId) {
            trackPromise(coreApi.get(`/cng/customers/${billDetails.customerId}`))
            .then(res => setCustomer(res.data))
            .catch(error => console.error("Failed to fetch data:", error));
        }
    }, [billDetails])

    return (
        <>
            <ChooseCustomerModal 
                show={customerModal}
                onClose={toggleCustomerModal} 
                handleSelect={setCustomer}
                chosenCustomerId={billDetails?.customerId}
            />
            <Card body>
                <FlexBox justify="between">
                    <h3>Customer info</h3>
                    <div>
                        {customer && <PencilEdit01Icon className="me-3" onClick={() => router.push(`/customers/${customer.id}`)}/>}
                        <Attachment02Icon onClick={toggleCustomerModal}/>
                    </div>
                </FlexBox>
                {customer ?
                    <div>
                        <div>
                            <FlexBox justify="between" className="mb-2">
                                <span>Account No:</span>
                                {customer.accountNumber}
                            </FlexBox>
                            <FlexBox justify="between" className="mb-2">
                                <span>Name:</span>
                                <span>{customer.fullName}</span>
                            </FlexBox>
                            <FlexBox justify="between" className="mb-2">
                                <span>Email:</span>
                                {customer.emailAddress}
                            </FlexBox>
                            <FlexBox justify="between" className="mb-2">
                                <span>Bills:</span>
                                3
                            </FlexBox>
                        </div>
                        <hr/>
                        <div>
                            <h4>Billing Address</h4>
                            <FlexBox justify="between" className="mb-2">
                                <span>Address:</span>
                                <span>
                                    {customer.billingAddress}
                                </span>
                            </FlexBox>
                            <FlexBox justify="between" className="mb-2">
                                <span>Mobile No:</span>
                                <span>{customer.contactNumber}</span>
                            </FlexBox>
                        </div>
                    </div>
                    : "Select on customer or create new"
                }
            </Card>
        </>
    )
}
export default BillCustomerInfo;
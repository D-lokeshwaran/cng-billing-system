import { Attachment02Icon, PencilEdit01Icon } from "hugeicons-react";
import { Card } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import FlexBox from "src/components/common/FlexBox";
import ChooseCustomerModal from "../customer/ChooseCustomerModal";
import { useToggle, useRouter } from "src/hooks";
import { useBillContext } from "src/context/BillContext";
import { trackPromise } from 'react-promise-tracker';
import { coreApi } from 'src/utils/api';
import { Bill } from "./billSlice";

const BillCustomerInfo = () => {
    const { setValue, getValues } = useFormContext<Bill>();
    const [customerModal, toggleCustomerModal] = useToggle();
    const { billDetails, setBillDetails } = useBillContext();
    const router = useRouter();
    const [customer, setCustomer] = useState<Customer>();
    const selectedCustomerId = getValues("customerId");

    const updateCustomerDetails = useCallback(async (customerId) => {
        try {
            const res = await trackPromise(coreApi.get(`/cng/customers/${customerId}`));
            setCustomer(res.data);
        } catch (error) {
            console.error("Failed to fetch Customer:", error);
        }
    }, []);

    useEffect(() => {
        if (customer?.id) {
            setBillDetails({ ...billDetails, customerId: customer.id });
            setValue("customerId", customer.id);
        }
        if (selectedCustomerId) {
            setBillDetails({ ...billDetails, customerId: selectedCustomerId });
            setValue("customerId", selectedCustomerId);
        }
    }, [customer?.id, selectedCustomerId])

    useEffect(() => {
        if (billDetails?.customerId) {
            updateCustomerDetails(billDetails.customerId);
        }
    }, [billDetails?.customerId, updateCustomerDetails]);

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
                        {customer && <PencilEdit01Icon className="me-3" onClick={() => router.push(`/customers/${customer.id}`)} />}
                        <Attachment02Icon onClick={toggleCustomerModal} />
                    </div>
                </FlexBox>
                {customer ? (
                    <div>
                        <div>
                            <FlexBox justify="between" className="mb-2">
                                <span>Account No:</span>
                                <span>{customer.accountNumber}</span>
                            </FlexBox>
                            <FlexBox justify="between" className="mb-2">
                                <span>Name:</span>
                                <span>{customer.fullName}</span>
                            </FlexBox>
                            <FlexBox justify="between" className="mb-2">
                                <span>Email:</span>
                                <span>{customer.emailAddress}</span>
                            </FlexBox>
                            <FlexBox justify="between" className="mb-2">
                                <span>Bills:</span>
                                <span>3</span>
                            </FlexBox>
                        </div>
                        <hr />
                        <div>
                            <h4>Billing Address</h4>
                            <FlexBox justify="between" className="mb-2">
                                <span>Address:</span>
                                <span>{customer.billingAddress}</span>
                            </FlexBox>
                            <FlexBox justify="between" className="mb-2">
                                <span>Mobile No:</span>
                                <span>{customer.contactNumber}</span>
                            </FlexBox>
                        </div>
                    </div>
                ) : (
                    "Select a customer or create new"
                )}
            </Card>
        </>
    );
};

export default BillCustomerInfo;

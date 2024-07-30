import { Attachment02Icon, PencilEdit01Icon, PlusSignSquareIcon } from "hugeicons-react";
import { Card, Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import { useState, useEffect, useCallback } from "react";
import FlexBox from "src/components/common/FlexBox";
import IconButton from "src/components/common/IconButton";
import ErrorMessage from "src/components/form/ErrorMessage";
import ChooseCustomerModal from "../customer/ChooseCustomerModal";
import { useToggle, useRouter } from "src/hooks";
import { useBillContext } from "src/context/BillContext";
import { trackPromise } from 'react-promise-tracker';
import { coreApi } from 'src/utils/api';
import { Bill } from "./billSlice";
import { Customer } from "../customer/customerSlice";

const BillCustomerInfo = ({ customerId }: { customerId: number }) => {
    const { setValue, getValues, register, formState: { errors } } = useFormContext<Bill>();
    const [customerModal, toggleCustomerModal] = useToggle();
    const { billDetails, setBillDetails } = useBillContext();
    const router = useRouter();
    const [customer, setCustomer] = useState<Customer>();
    const selectedCustomerId = getValues("customerId");

    const updateCustomerDetails = useCallback(async (customerId: number) => {
        try {
            if (customerId) {
                const res = await trackPromise(coreApi.get(`/cng/customers/${customerId}`));
                setCustomer(res.data);
            }
        } catch (error) {
            console.error("Failed to fetch Customer:", error);
        }
    }, []);

    useEffect(() => {
        let localCustomerId = customerId || selectedCustomerId;
        setBillDetails({ ...billDetails, customerId: localCustomerId });
    }, [customer?.id, selectedCustomerId])

    useEffect(() => {
        let updateCustomerId = customerId || billDetails?.customerId
        updateCustomerDetails(updateCustomerId);
    }, [customerId, billDetails?.customerId, updateCustomerDetails]);

    return (
        <>
            <ChooseCustomerModal
                show={customerModal}
                onClose={toggleCustomerModal}
                handleSelect={setCustomer}
                chosenCustomerId={billDetails?.customerId}
            />
            <input
                type="hidden"
                {...register("customerId", {
                    validate: {
                        required: (v) => customer || "You haven't added any Customer to this bill. Create a Customer or choose one.",
                    },
                    value: customer?.id || selectedCustomerId
                })}
            />
            <Card body>
                <FlexBox justify="between" className="mb-3">
                    <h3>Customer info</h3>
                    <div>
                        {customer && <IconButton icon={PencilEdit01Icon} className="me-1" onClick={() => router.push(`/customers/${customer.id}`)} />}
                        <IconButton className="p-0" onClick={toggleCustomerModal} icon={Attachment02Icon}/>
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
                    <div className="text-center">
                        <PlusSignSquareIcon size="14%" className="gray-100 mb-0"/>
                        <p className="mb-4">
                            No customer selected for this bill
                            <ErrorMessage errorMessage={errors?.["customerId"]?.message} className="justify-content-center mb-4"/>
                        </p>
                        <Button size="sm" type="button" onClick={() => router.push("/customers/new")}>
                            Create Customer
                        </Button>
                    </div>
                )}
            </Card>
        </>
    );
};

export default BillCustomerInfo;

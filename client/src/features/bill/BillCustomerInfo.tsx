import { Attachment02Icon, PencilEdit01Icon } from "hugeicons-react"
import { Card } from "react-bootstrap"
import { useFormContext } from "react-hook-form"
import FlexBox from "src/components/common/FlexBox"
import { Bill } from "./billSlice"
import { useToggle } from "src/hooks"
import ChooseCustomerModal from "../customer/ChooseCustomerModal"

const BillCustomerInfo = () => {

    const { register, watch } = useFormContext<Bill>();
    const watchCustomerId = watch("customerId");
    const [ customerModal, toggleCustomerModal ] = useToggle();

    return (
        <>
            <ChooseCustomerModal 
                show={customerModal}
                onClose={toggleCustomerModal} 
                handleSelect={() => alert("Customer ./selected")}
            />
            <Card body>
                <FlexBox justify="between">
                    <h3>Customer info</h3>
                    {watchCustomerId
                        ? <PencilEdit01Icon />
                        : <Attachment02Icon onClick={toggleCustomerModal}/>
                    }
                </FlexBox>
                <div>
                    <FlexBox justify="between" className="mb-2">
                        <span>Account No:</span>
                        D123ER00004
                    </FlexBox>
                    <FlexBox justify="between" className="mb-2">
                        <span>Name:</span>
                        <span>demouser</span>
                    </FlexBox>
                    <FlexBox justify="between" className="mb-2">
                        <span>Email:</span>
                        demouser@gmail.com
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
                            No: 25, stowler street,
                            state,
                            mexico-45    
                        </span>
                    </FlexBox>
                    <FlexBox justify="between" className="mb-2">
                        <span>Mobile No:</span>
                        <span>9912345678</span>
                    </FlexBox>
                </div>
            </Card>
        </>
    )
}
export default BillCustomerInfo;
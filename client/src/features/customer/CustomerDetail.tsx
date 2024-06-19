import { SubmitHandler } from "react-hook-form";
import { Customer } from "./customerSlice";
import { Button } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import AccountDetails from "./components/AccountDetails";
import FeatureHeader from "src/components/structure/FeatureHeader";
import HookForm from "src/components/form/HookForm";
import ContactDetails from "./components/ContactDetails";
import DocumentList from "./components/DocumentList";
import DocumentModalForm from "../document/components/DocumentModalForm";
import { useToggle } from "src/hooks";


const CustomerForm = () => {

    const [ documenModal, toggleDocumentModal ] = useToggle();

    const onSubmitCustomer: SubmitHandler<Customer> = (data) => {
        console.log(data);
    }

    const handleUploadDocument = (data, event) => {
        console.log(data, event);
        toggleDocumentModal();
    }
    
    return (
        <div>
            <DocumentModalForm show={documenModal} onHide={toggleDocumentModal} onSubmit={handleUploadDocument} />
            <HookForm onSubmit={onSubmitCustomer}>
                <FeatureHeader title="Create Customer" className="justify-content-between">
                    <Button variant="primary" type="submit">
                        Create
                    </Button>
                </FeatureHeader>
                <FlexBox>
                    <div>
                        <AccountDetails />
                        <DocumentList showDocumentModal={toggleDocumentModal}/>
                    </div>
                    <div>
                        <ContactDetails/>
                    </div>
                </FlexBox>
            </HookForm>
        </div>
    )
}

export default CustomerForm;
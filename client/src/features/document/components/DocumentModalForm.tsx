import { Button, Modal, ModalProps } from "react-bootstrap"
import { SubmitHandler } from "react-hook-form"
import HookForm from "src/components/form/HookForm"
import Input from "src/components/form/Input"
import { Document } from "../documentSlice"
import DatePickerInput from "src/components/form/DatePickerInput"

interface DocumentModalFormProps extends ModalProps {
    show: boolean | undefined;
    onSubmit: (data: Document, event?: React.BaseSyntheticEvent) => void;
}

const DocumentModalForm = ({ 
    show, 
    onHide, 
    onSubmit,
    ...props
}: DocumentModalFormProps ) => {

    const createForm: SubmitHandler<Document> = onSubmit;

    return (
        <Modal show={show} onHide={onHide} {...props}>
            <Modal.Header closeButton>
                Upload Document
            </Modal.Header>
            <HookForm onSubmit={createForm}>
                <Modal.Body>
                    <Input field={{ title: "Name", state: "name"}}/>
                    <DatePickerInput
                        field={{ title: "Created At", state: "createdAt"}}
                    />
                        -- doc uploader
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit">
                        Upload
                    </Button>
                </Modal.Footer>
            </HookForm>
        </Modal>
    )
}

export default DocumentModalForm;
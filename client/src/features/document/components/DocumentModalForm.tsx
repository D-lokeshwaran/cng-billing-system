import { Modal, ModalProps } from "react-bootstrap"
import { SubmitHandler } from "react-hook-form"
import HookForm from "src/components/form/HookForm"
import Input from "src/components/form/Input"
import { Document } from "../documentSlice"

const DocumentModalForm = ({ ...props }: ModalProps) => {

    const createForm: SubmitHandler<Document> = (data) => {
        console.log(data);
    }  

    return (
        <Modal {...props}>
            <Modal.Header closeButton>
                Create Document
            </Modal.Header>
            <HookForm onSubmit={createForm}>
                <Modal.Body>
                        <Input field={{ title: "Name", state: "name"}}/>
                        -- Date picker
                        -- doc uploader
                </Modal.Body>
                <Modal.Footer>
                    {props.children}
                </Modal.Footer>
            </HookForm>
        </Modal>
    )
}

export default DocumentModalForm;
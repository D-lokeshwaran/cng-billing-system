import { Button, Card, Modal } from "react-bootstrap"
import FlexBox from "src/components/common/FlexBox"
import TanStackTable from "src/components/table/TanStackTable"
import DocumentModalForm from "src/features/document/components/DocumentModalForm"
import documentSlice from "src/features/document/documentSlice"
import {useTableAdapter, useToggle} from "src/hooks"

const DocumentList = ({ showDocumentModal }) => {
    
    const table = useTableAdapter({
        columns: documentSlice.columns,
        _mock: documentSlice._mock
    })

    return (
        <div>
            <Card>
                <Card.Header>
                    <FlexBox className="justify-content-between align-items-center">
                        <h4>Documents</h4>
                        <Button onClick={showDocumentModal}>+</Button>
                    </FlexBox>
                </Card.Header>
                <Card.Body>
                    <TanStackTable table={table}/>
                </Card.Body>
            </Card>
        </div>
    )

}

export default DocumentList
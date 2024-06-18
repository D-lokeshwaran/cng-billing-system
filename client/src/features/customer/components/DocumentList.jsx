import { Button, Card } from "react-bootstrap"
import FlexBox from "src/components/common/FlexBox"
import TanStackTable from "src/components/table/TanStackTable"
import documentSlice from "src/features/document/documentSlice"
import {useTableAdapter} from "src/hooks"

const DocumentList = () => {
    
    const table = useTableAdapter({
        columns: documentSlice.columns,
        _mock: documentSlice._mock
    })

    return (
        <Card>
            <Card.Header>
                <FlexBox className="justify-content-between align-items-center">
                    <h4>Documents</h4>
                    <Button>+</Button>
                </FlexBox>
            </Card.Header>
            <Card.Body>
                <TanStackTable table={table}/>
            </Card.Body>
        </Card>
    )

}

export default DocumentList
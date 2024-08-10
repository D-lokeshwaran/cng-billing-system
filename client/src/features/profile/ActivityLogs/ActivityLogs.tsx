import { useState } from "react";
import { coreApi } from "src/utils/api";
import activityLogSlice from "./activityLogSlice";
import { useTableAdapter } from "src/hooks";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import TanStackTable from "src/components/table/TanStackTable";
import Pagination from "src/components/table/Pagination";
import { formateDate } from "src/utils/date";

const ActivityLogs = () => {

    const { table } = useTableAdapter({ ...activityLogSlice })
    const [ logDetails, setLogDetails ] = useState();
    const getRowProps = (row: any) => {
        return {
            onDoubleClick: () => {
                setLogDetails(row.original);
            }
        }
    }

    const LogDetailRow = ({ label, value, ...props }) => (
        <Row className="mb-3">
            <Col xs={3}>{label}</Col>
            <Col {...props}>{value}</Col>
        </Row>
    )
    const renderChanges = logDetails?.changes?.split(", ").map(val => <div>{val}</div>)

    return (
        <>
            <Modal show={logDetails} onHide={() => setLogDetails(null)} size="lg">
                <Modal.Header closeButton>
                    <h3>Activity Log</h3>
                </Modal.Header>
                <Modal.Body>
                    <LogDetailRow label="Category" value={logDetails?.entityName}/>
                    <LogDetailRow label="Action" value={logDetails?.action}/>
                    <LogDetailRow label="Created At" value={formateDate(logDetails?.createdAt)}/>
                    <LogDetailRow
                        label="Changes"
                        value={renderChanges || "--"}
                        className="border rounded"
                        style={{height: "8rem"}}
                    />
                </Modal.Body>
            </Modal>
            <Card>
                <Card.Header>
                    <FlexBox justify="between">
                        <h3>Activity Logs</h3>
                        <Button variant="ghost">
                            Filter
                        </Button>
                    </FlexBox>
                </Card.Header>
                <Card.Body className="p-0">
                    <TanStackTable table={table} rowProps={getRowProps}/>
                </Card.Body>
                <Card.Footer>
                    <Pagination table={table}/>
                </Card.Footer>
            </Card>
        </>
    )

}

export default ActivityLogs;
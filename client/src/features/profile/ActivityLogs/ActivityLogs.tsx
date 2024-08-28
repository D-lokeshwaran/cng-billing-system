import { useState } from "react";
import { coreApi } from "src/utils/api";
import { formatServerDate } from "src/utils/date";
import activityLogSlice from "./activityLogSlice";
import { useTableAdapter } from "src/hooks";
import { Card, Button, Modal, Row, Col, Dropdown, FormSelect } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import TanStackTable from "src/components/table/TanStackTable";
import HookForm from "src/components/form/HookForm";
import DatePickerInput from "src/components/form/DatePickerInput";
import { ToDateWithValidation } from "./TariffDetails";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { FilterIcon } from "hugeicons-react";
import Input from "src/components/form/Input";
import Pagination from "src/components/table/Pagination";
import { formateDate } from "src/utils/date";

const dateBetweenFilter = (row, id, filterValue) => {
    const rowDate = new Date(row.getValue(id));
    const [ startDate, endDate ] = filterValue;
    return (
        (!startDate || rowDate >= new Date(startDate)) &&
        (!endDate || rowDate <= new Date(endDate))
    );
}

const entityNameFilter = (row, id, filterValue) => {
    const rowEntity = row.getValue(id);
    if (filterValue === "All"){
        return true;
    }
    return filterValue == rowEntity;
}

const ActivityLogs = () => {

    const [ logDetails, setLogDetails ] = useState();
    const [ dateRange, setDateRange ] = useState([null, null]);
    const [ startDate, endDate ] = dateRange;
    const { table, setData, refreshData } = useTableAdapter({
        ...activityLogSlice,
        filterFns: { // add a custom global filter function
            dateBetween: dateBetweenFilter,
            skipAllFilter: entityNameFilter
        },
    })

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
                        <div className="d-flex align-items-center">
                            <DatePicker
                                placeholderText="Search created between..."
                                className="form-control"
                                name="createdBetween"
                                isClearable={true}
                                selectsRange={true}
                                startDate={startDate}
                                endDate={endDate}
                                onChange={(update) => {
                                    setDateRange(update);
                                    table.setColumnFilters([{
                                        id: 'createdAt',
                                        value: update
                                    }]);
                                }}
                            />
                            <div className="ms-3">
                                <FormSelect
                                    field={{state: "category", type: "select"}}
                                    required={false}
                                    onChange={event => table.setColumnFilters([{
                                        id: 'entityName',
                                        value: event.target.value
                                    }])}
                                >
                                    <option>All</option>
                                    <option>Bill</option>
                                    <option>Customer</option>
                                    <option>Tariff</option>
                                </FormSelect>
                            </div>
                        </div>
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
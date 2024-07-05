import { Card, Col, FormControl, Row } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import { FloppyDiskIcon, HelpCircleIcon, PencilEdit01Icon } from "hugeicons-react";
import DatePickerInput from "src/components/form/DatePickerInput";
import { useToggle } from "src/hooks";
import { Bill } from "./billSlice";
import { useFormContext } from "react-hook-form";
import { formateDate } from "src/utils/date";
import moment from "moment";
import { COMMON } from "src/constants/labels";

const DetailsCard = () => {
    const [ editDetails, toggleEditDetails ] = useToggle();
    const { register, watch } = useFormContext<Bill>();

    const watchUnitsConsumed = watch("unitsConsumed");
    const watchBillingDate = watch("billingDate");

    return (
        <Card body>
            <FlexBox justify="between">
                <h3>Details</h3>
                <div onClick={toggleEditDetails}>
                    {editDetails ? <FloppyDiskIcon /> : <PencilEdit01Icon />}
                </div>
            </FlexBox>
            <FlexBox justify="between">
                <span>
                    Units consumed
                </span>
                <span>
                    {editDetails 
                        ? <FormControl
                            {...register("unitsConsumed", {
                                valueAsNumber: true
                            })}
                            size="sm"
                            type="number"
                        />
                        : watchUnitsConsumed || COMMON.NO_DATA
                    }
                </span>
            </FlexBox>
            <hr className="border-style-dotted"/>
            <FlexBox justify="end">
                <div className="w-75">
                    <Row className="justify-content-between mb-2">
                        <Col className="text-end">Billing Date:</Col>
                        <Col className="text-end">
                            {editDetails 
                                ? <DatePickerInput
                                    field={{ title: "Billing Date", state: "billingDate"}}
                                    required={false}
                                    showLabel={false}
                                    className="form-control-sm"
                                />
                                : formateDate(watchBillingDate)
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-between mb-2">
                        <Col className="text-end">
                            <span>Payment Due Date </span>
                            <HelpCircleIcon
                                size={14}
                            />
                        </Col>
                        <Col className="text-end">
                            <FormControl 
                                {...register("dueDate", {
                                    value: moment(watchBillingDate).add(10, 'days').toDate(),
                                    valueAsDate: true
                                })} 
                                hidden
                            />
                            {watchBillingDate 
                                ? formateDate(moment(watchBillingDate).add(10, 'days'))
                                : COMMON.NO_DATA
                            }
                        </Col>
                    </Row>
                    <Row className="justify-content-between mb-2">
                        <Col className="text-end">Rate per unit:</Col>
                        <Col className="text-end">
                            1200
                        </Col>
                    </Row>
                    <Row className="justify-content-between mb-2">
                        <Col className="text-end">Billing Amount:</Col>
                        <Col className="text-end">
                            <FormControl 
                                {...register("amount", {
                                    value: 2000,
                                    valueAsNumber: true
                                })} 
                                hidden
                            />
                            1200
                        </Col>
                    </Row>
                </div>
            </FlexBox>
        </Card>
    )

}

export default DetailsCard;
import { Card, Col, FormControl, Row } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import { FloppyDiskIcon, HelpCircleIcon, PencilEdit01Icon } from "hugeicons-react";
import DatePickerInput from "src/components/form/DatePickerInput";
import { useToggle } from "src/hooks";
import { useEffect, useState } from "react";
import { Bill } from "./billSlice";
import { useFormContext } from "react-hook-form";
import { useBillContext } from "src/context/BillContext"
import { formateDate } from "src/utils/date";
import moment from "moment";
import { COMMON } from "src/constants/labels";

const DetailsCard = ({ tariff }) => {
    const { register, watch, setValue } = useFormContext<Bill>();
    const { billDetails, setBillDetails } = useBillContext()
    const [ editDetails, toggleEditDetails ] = useToggle(billDetails?.editDetails);
    const [ ratePerUnit, setRatePerUnit ] = useState<any>();

    const watchUnitsConsumed = watch("unitsConsumed");
    const watchBillingDate = watch("billingDate");
    const billingAmount = (ratePerUnit * parseInt(watchUnitsConsumed ||
        billDetails?.unitsConsumed)).toFixed(2);

    useEffect(() => {
        setValue("unitsConsumed", billDetails?.unitsConsumed!);
        setValue("billingDate", billDetails?.billingDate || new Date());
    }, [])

    // handle state restoration when navigate;
    useEffect(() => {
        setBillDetails({
            ...billDetails,
            unitsConsumed: watchUnitsConsumed,
            billingDate: watchBillingDate,
            editDetails: editDetails,
        });
    }, [watchUnitsConsumed, watchBillingDate, editDetails])

    useEffect(() => {
        const unitsAndRates = tariff?.unitsAndRates
        const unitsConsumed = parseInt(watchUnitsConsumed) || billDetails?.unitsConsumed;
        if (unitsAndRates) {
            unitsAndRates.forEach(unitAndRate => {
                if (unitAndRate.fromUnit <= unitsConsumed) {
                    if (unitAndRate.toUnit === "above") {
                        setRatePerUnit(unitAndRate.ratePerUnit);
                    } else if (parseInt(unitAndRate.toUnit) >= unitsConsumed) {
                        setRatePerUnit(unitAndRate.ratePerUnit);
                    }
                }
            })
        }
        setValue("billAmount", billingAmount)
    }, [watchUnitsConsumed, tariff])

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
                            {...register("unitsConsumed")}
                            size="sm"
                            type="number"
                            autoFocus
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
                                    field={{ title: "Billing Date", state: "billingDate", defaultValue: new Date()}}
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
                            <span>Payment Due Date: </span>
                        </Col>
                        <Col className="text-end">
                            <FormControl
                                {...register("paymentDueDate", {
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
                            {ratePerUnit || COMMON.NO_DATA}
                        </Col>
                    </Row>
                    <Row className="justify-content-between mb-2">
                        <Col className="text-end">Billing Amount:</Col>
                        <Col className="text-end">
                            <FormControl
                                {...register("billAmount", {
                                    value: ratePerUnit * parseInt(watchUnitsConsumed)
                                })}
                                value={ratePerUnit * parseInt(watchUnitsConsumed)}
                                hidden
                            />
                            {Number(billingAmount) ? billingAmount : COMMON.NO_DATA}
                        </Col>
                    </Row>
                </div>
            </FlexBox>
        </Card>
    )

}

export default DetailsCard;
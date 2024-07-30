import { Card, Col, FormControl, Row } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import { FloppyDiskIcon, HelpCircleIcon, PencilEdit01Icon } from "hugeicons-react";
import DatePickerInput from "src/components/form/DatePickerInput";
import IconButton from "src/components/common/IconButton";
import ErrorMessage from "src/components/form/ErrorMessage";
import Input from "src/components/form/Input";
import { useToggle } from "src/hooks";
import { useEffect, useState } from "react";
import { Bill } from "./billSlice";
import { useFormContext } from "react-hook-form";
import { useBillContext } from "src/context/BillContext"
import { formateDate } from "src/utils/date";
import moment from "moment";
import { COMMON } from "src/constants/labels";

const DetailsCard = ({ tariff }) => {
    const { register, formState:{ errors }, watch, setValue } = useFormContext<Bill>();
    const { billDetails, setBillDetails } = useBillContext()
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
        });
    }, [watchUnitsConsumed, watchBillingDate])

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
            <div className="mb-3">
                <h3 className="mb-0">Details</h3>
                <small className="text-secondary">Change units consumed to calculate bill amount.</small>
            </div>
            <FlexBox justify="between">
                <span>
                    Units consumed <span className="text-danger">*</span>
                </span>
                <span>
                    <FormControl
                        {...register("unitsConsumed", {
                            required: { value: true, message: "Units consume is required"},
                            validate: {
                                positiveNumber: (v) => v > 0 || "Units consumed must be positive"
                            }
                        })}
                        size="sm"
                        type="number"
                        autoFocus
                        isInvalid={errors?.["unitsConsumed"]?.message != undefined}
                    />
                    <ErrorMessage errorMessage={errors?.["unitsConsumed"]?.message} />
                </span>
            </FlexBox>
            <hr className="border-style-dotted"/>
            <FlexBox justify="end">
                <div className="w-75">
                    <Row className="justify-content-between align-items-center mb-2">
                        <Col className="text-end">Billing Date</Col>
                        <Col className="text-end">
                            <DatePickerInput
                                field={{ title: "Billing Date", state: "billingDate", defaultValue: new Date()}}
                                required={false}
                                showLabel={false}
                                isClearable={false}
                                className="form-control-sm"
                            />
                        </Col>
                    </Row>
                    <Row className="justify-content-between mb-2">
                        <Col className="text-end">
                            <span>Payment Due Date </span>
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
                        <Col className="text-end">Rate per unit</Col>
                        <Col className="text-end">
                            {ratePerUnit || COMMON.NO_DATA}
                        </Col>
                    </Row>
                    <Row className="justify-content-between mb-2">
                        <Col className="text-end">Billing Amount</Col>
                        <Col className="text-end">
                            <FormControl
                                {...register("billAmount", {
                                    value: ratePerUnit * parseInt(watchUnitsConsumed),
                                    valueAsNumber: true
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
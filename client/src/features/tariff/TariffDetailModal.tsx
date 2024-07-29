import React, { useMemo, useState }from "react";
import { Button, Col, Modal, ModalProps, Row } from "react-bootstrap";
import { SubmitHandler, useFormContext } from "react-hook-form";
import HookForm from "src/components/form/HookForm";
import { Tariff } from "./tariffSlice";
import DatePickerInput from "src/components/form/DatePickerInput";
import UnitsAndRates from "./UnitsAndRates";
import moment from "moment";
import ErrorMessage from "src/components/form/ErrorMessage";
import { coreApi } from 'src/utils/api';

const defaultTariffUnits = [
   {
       fromUnit: 1,
       toUnit: 100,
       ratePerUnit: 2.43
   }, {
       fromUnit: 101,
       toUnit: 200,
       ratePerUnit: 5.6
   }, {
       fromUnit: 201,
       toUnit: 300,
       ratePerUnit: 9.3
   },
]

const TariffDetailModal = ({ ...props }) => {

    const { onHide, tariff } = props;
    const [ duplicated, setDuplicated ] = useState();

    const handleTariffSubmit: SubmitHandler<Tariff> = async (data) => {
        const { maxUnit, unitRateAboveMax, ...tariff } = data;
        tariff.unitsAndRates.push({
            fromUnit: maxUnit,
            toUnit: "above",
            ratePerUnit: unitRateAboveMax
        })
        const duplicated = await validateDuplicateTariff(tariff);
        if (duplicated === false) {
            const newTariff = await coreApi.post("/cng/tariffs", tariff)
            onHide()
        }
        setDuplicated(duplicated)
    }

    const validateDuplicateTariff = async (tariff) => {
        // formatted because using Rest resource unable to format in server...
        const formattedDate = moment(tariff.fromDate).format("YYYY-MM-DD");
        const duplicateResult = await coreApi.get(
            `/cng/tariffs/search/checkDuplicate?fromDate=${formattedDate}`
        )
        // validate duplicate tariff;
        var duplicate = duplicateResult.data._embedded.tariffs.length > 0;
        return duplicate;
    }

    const tariffDetails = useMemo(() => {
        if (tariff) {
            const filteredUnitsAndRates = tariff.unitsAndRates.filter(rate => rate.toUnit !== "above");
            return { ...tariff, unitsAndRates: filteredUnitsAndRates };
        }
        // default tariff data
        return { unitsAndRates: defaultTariffUnits }
    }, [tariff, tariff?.unitsAndRates])

    const maxUnitRate = useMemo(() => {
        if (!tariff) return;
        const unitsAndRates = tariff.unitsAndRates;
        const aboveRate = unitsAndRates.find(rate => rate.toUnit === "above");
        return aboveRate?.ratePerUnit ?? null;
    }, [tariff, tariff?.unitsAndRates]);

    return (
        <Modal size="lg" {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Create a Tariff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <HookForm onSubmit={handleTariffSubmit} defaultValues={{...tariffDetails}}>
                    <Row className="mb-3">
                        <Col>
                            <DatePickerInput
                                field={{ title: "From date", state: "fromDate"}}
                                validate={{
                                    pastDate: (value: any) => {
                                        let yesterday = moment(new Date()).subtract(1, "d");
                                        let past = moment(yesterday).isBefore(value);
                                        return past || "From Date should not be at past";
                                    }
                                }}
                            />
                        </Col>
                        <Col>
                            <ToDateWithValidation/>
                        </Col>
                    </Row>
                    <UnitsAndRates maxUnitRate={maxUnitRate}/>
                    {duplicated && <ErrorMessage errorMessage="Duplicate Tariff exists for these date's" />}
                    <Modal.Footer className="px-0 pb-0">
                        <Button type="submit">Create</Button>
                    </Modal.Footer>
                </HookForm>
            </Modal.Body>
        </Modal>
    )
}

const ToDateWithValidation = () => {
    const { watch } = useFormContext();
    const fromDate = watch("fromDate");

    return (
        <DatePickerInput
            field={{ title: "To date", state: "toDate"}}
            validate={{
                afterFromDate: (value: any) => {
                    let afterFromDate = moment(value).isAfter(fromDate);
                    return afterFromDate || "To Date should be after from date";
                },

            }}
        />
    )

}

export default TariffDetailModal;
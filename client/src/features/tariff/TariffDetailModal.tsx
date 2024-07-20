import React, { useMemo, useState }from "react";
import { Button, Col, Modal, ModalProps, Row } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";
import HookForm from "src/components/form/HookForm";
import { Tariff } from "./tariffSlice";
import DatePickerInput from "src/components/form/DatePickerInput";
import UnitsAndRates from "./UnitsAndRates";
import { coreApi } from 'src/utils/api';

interface TariffDetailModalProps extends ModalProps {

}

const TariffDetailModal: React.FC<TariffDetailModalProps> = ({ ...props }) => {

    const { onHide, tariff } = props;
    const handleTariffSubmit: SubmitHandler<Tariff> = async (data) => {
        const { maxUnit, unitRateAboveMax, ...tariff } = data;
        tariff.unitsAndRates.push({
            fromUnit: maxUnit,
            toUnit: "above",
            ratePerUnit: unitRateAboveMax
        })
        const newTariff = await coreApi.post("/cng/tariffs", tariff)
        onHide()
    }
    const tariffDetails = useMemo(() => {
        if (tariff) {
            const filteredUnitsAndRates = tariff.unitsAndRates.filter(rate => rate.toUnit !== "above");
            return { ...tariff, unitsAndRates: filteredUnitsAndRates };
        }
        // default tariff data
        return {
            unitsAndRates: [
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
        }
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
                            />
                        </Col>
                        <Col>
                            <DatePickerInput
                                field={{ title: "To date", state: "toDate"}}
                            />
                        </Col>
                    </Row>
                    <UnitsAndRates maxUnitRate={maxUnitRate}/>
                    <Modal.Footer className="px-0 pb-0">
                        <Button type="submit">Create</Button>
                    </Modal.Footer>
                </HookForm>
            </Modal.Body>
        </Modal>
    )
}

export default TariffDetailModal;
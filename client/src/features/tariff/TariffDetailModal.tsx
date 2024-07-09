import React from "react";
import { Button, Col, Modal, ModalProps, Row } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";
import HookForm from "src/components/form/HookForm";
import { Tariff } from "./tariffSlice";
import DatePickerInput from "src/components/form/DatePickerInput";
import UnitAndRateList from "./UnitAndRateList";

interface TariffDetailModalProps extends ModalProps {

}

const TariffDetailModal: React.FC<TariffDetailModalProps> = ({ ...props }) => {

    const handleTariffSubmit: SubmitHandler<Tariff> = (data) => {
        console.log(data);
    }

    return (
        <Modal size="lg" {...props}>
            <Modal.Header closeButton>
                <Modal.Title>Create a Tariff</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <HookForm onSubmit={handleTariffSubmit} defaultValues={{
                    unitsAndRate: [{
                        fromUnit: 1,
                        toUnit: '100',
                        ratePerUnit: 0
                    }]
                }}>
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
                    <UnitAndRateList/>
                    <Modal.Footer className="px-0 pb-0">
                        <Button>Create</Button>
                    </Modal.Footer>
                </HookForm>
            </Modal.Body>
        </Modal>
    )
}

export default TariffDetailModal;
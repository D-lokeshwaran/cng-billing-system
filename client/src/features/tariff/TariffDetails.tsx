import React, { useMemo, useState, useEffect }from "react";
import { Button, Col, Modal, ModalProps, Row, Card } from "react-bootstrap";
import { SubmitHandler, useFormContext } from "react-hook-form";
import { useRouter } from "src/hooks";
import { useParams } from "react-router-dom";
import HookForm from "src/components/form/HookForm";
import { Tariff } from "./tariffSlice";
import DatePickerInput from "src/components/form/DatePickerInput";
import FeatureHeader from "src/components/structure/FeatureHeader";
import { useBillContext } from "src/context/BillContext";
import UnitsAndRates from "./UnitsAndRates";
import moment from "moment";
import ErrorMessage from "src/components/form/ErrorMessage";
import { ACTIONS } from 'src/constants/labels';
import { coreApi } from 'src/utils/api';
import { trackPromise } from 'react-promise-tracker';

const defaultTariffUnits = [
   {
       fromUnit: 1,
       toUnit: 100,
       ratePerUnit: 2.00
   }, {
       fromUnit: 101,
       toUnit: 200,
       ratePerUnit: 5.00
   }, {
       fromUnit: 201,
       toUnit: 300,
       ratePerUnit: 9.00
   },
]

const TariffDetails = () => {

    const [ tariff, setTariff ] = useState();
    const { billDetails } = useBillContext();
    const [ duplicated, setDuplicated ] = useState();
    const { tariffId } = useParams();
    const router = useRouter();

    useEffect(() => {
        if (tariffId && tariffId != "new") {
            retrieveTariff(tariffId);
        } else {
            setTariff(null);
        }
    }, [tariffId])

    const retrieveTariff = async (tariffId: number) => {
        const tariffResult = await trackPromise(coreApi.get(`/cng/tariffs/${tariffId}`))
        let tariff = tariffResult.data;
        setTariff(tariff);
    }

    const handleTariffSubmit: SubmitHandler<Tariff> = async (data) => {
        const { maxUnit, unitRateAboveMax, ...tariff } = data;
        tariff.unitsAndRates.push({
            fromUnit: maxUnit,
            toUnit: "above",
            ratePerUnit: unitRateAboveMax
        })

        const duplicated = await validateDuplicateTariff(tariff);
        if (tariffId > 0 && duplicated) {
            const newTariff = await trackPromise(coreApi.put(`/cng/tariffs/${tariffId}`, tariff))
                .catch(error => console.log("Failed to update tariff:", error))
            if (newTariff) router.back();
            return;
        }
        if (!duplicated) {
            const newTariff = await trackPromise(coreApi.post("/cng/tariffs", tariff))
                .catch(error => console.log("Failed to create tariff:", error))
            if (newTariff) router.back();
        }
        setDuplicated(duplicated);
    }

    const validateDuplicateTariff = async (tariff) => {
        // formatted because using Rest resource unable to format in server...
        const formattedDate = moment(tariff.fromDate).format("YYYY-MM-DD");
        const duplicateResult = await trackPromise(coreApi.get(
            `/cng/tariffs/search/checkDuplicate?fromDate=${formattedDate}`
        ))
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
        <div id="tariff-details">
            <HookForm onSubmit={handleTariffSubmit} defaultValues={{...tariffDetails}} >
                <FeatureHeader
                    title="Create Tariff"
                    className="justify-content-between"
                    breadcrumbs={[
                        { title: `Bill`, path: "/bills", hidden: !billDetails},
                        { title: `${billDetails?.billId ? '#'+billDetails?.billId : 'New'}`, path:`/bills/${billDetails?.billId || "new"}` ,hidden: !billDetails},
                        { title: "Tariff", path: "/tariffs"},
                        {
                            title: tariffId && tariffId !== "new" ? `${tariff?.fromDate} to ${tariff?.toDate}`: "New",
                            disabled: true
                        }
                    ]}
                >
                    <Button variant="primary" type="submit">
                        {tariffId ? ACTIONS.UPDATE : ACTIONS.CREATE}
                    </Button>
                </FeatureHeader>
                <Card body>
                    <div className="mb-3">
                        <Row>
                            <Col>
                                <DatePickerInput
                                    field={{ title: "From date", state: "fromDate"}}
                                    validate={{
                                        pastDate: (value: any) => {
                                            if (!tariffId) {
                                                let yesterday = moment(new Date()).subtract(1, "d");
                                                let past = moment(yesterday).isBefore(value);
                                                return past || "From Date should not be at past";
                                            }
                                            return true;
                                        }
                                    }}
                                    filterDate={(date) => moment(date).add(1, "days").isAfter(new Date()) }
                                    disabled={tariffId}
                                />
                            </Col>
                            <Col>
                                <ToDateWithValidation disabled={tariffId}/>
                            </Col>
                        </Row>
                        {duplicated && <ErrorMessage errorMessage="Duplicate Tariff exists on these date's" />}
                    </div>
                    <UnitsAndRates maxUnitRate={maxUnitRate}/>
                </Card>
            </HookForm>
        </div>
    )
}

export const ToDateWithValidation = ({ disabled, ...props }) => {
    const { watch } = useFormContext();
    const fromDate = watch("fromDate");

    return (
        <DatePickerInput
            field={{ title: "To date", state: "toDate"}}
            disabled={disabled}
            {...props}
            filterDate={(date) => moment(date).add(1, "days").isAfter(fromDate) }
            highlightDates={[fromDate]}
            validate={{
                afterFromDate: (value: any) => {
                    if (!disabled) {
                        let afterFromDate = moment(value).isAfter(fromDate);
                        return afterFromDate || "To Date should be after from date";
                    }
                },
            }}
        />
    )

}

export default TariffDetails;
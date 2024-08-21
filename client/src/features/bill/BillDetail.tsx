import { Badge, Button, Col, Row } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";
import FlexBox from "src/components/common/FlexBox";
import HookForm from "src/components/form/HookForm";
import FeatureHeader from "src/components/structure/FeatureHeader";
import { Bill } from "./billSlice";
import { coreApi } from "src/utils/api";
import { trackPromise } from 'react-promise-tracker';
import DetailsCard from "./DetailsCard";
import BillCustomerInfo from "./BillCustomerInfo";
import CurrentTariffList from "./CurrentTariffList";
import { startCase } from "lodash";
import { useBillContext } from "src/context/BillContext";
import { useParams } from "react-router-dom";
import { useRouter } from "src/hooks";
import { useState, useEffect, useMemo, useCallback } from "react";
import moment from "moment";

const BillDetail = () => {

    const [ billTariff, setBillTariff ] = useState();
    const [ bill, setBill ] = useState();
    const { billDetails, setBillDetails } = useBillContext();
    let canMarkAsPaid = bill?.id && bill?.paymentStatus == "Pending" && billDetails?.tariffId;
    const router = useRouter();
    const { billId } = useParams();

    useEffect(() => {
        retrieveBill();
    }, [billId])

    useEffect(() => {
        setBillDetails({
            ...billDetails,
            billId: bill?.id ,
            customerId: bill?.customerId
        })
    }, [bill])

    const retrieveBill = async () => {
        if (!billId) {
            setBillDetails({ ...billDetails, billId: "new" })
            return;
        };
        const retrievedBill = await trackPromise(coreApi.get(`/cng/bills/${billId}`));
        const bill = retrievedBill.data;
        await trackPromise(coreApi.get(`/cng/bills/${billId}/customer`))
            .then((result) => {
                let customerId = result.data.id;
                bill["customerId"] = customerId;
                setBill(bill);
            })
            .catch(error => {
                console.log("Customer doesn't exists for this bill", error)
            });
    }

    const createOrUpdateBill: SubmitHandler<Bill> = async (data) => {
        const { customerId, ...billData} = data;
        console.log(data);
        const newBill = await trackPromise(coreApi({
            url: bill ? `/cng/bills/${bill.id}` : "/cng/bills",
            method: bill ? "PUT" : "POST",
            data: billData
        })); // create or update bill
        const billId = newBill?.data.id;
        const tariffId = billTariff?.id;
        if (tariffId) {
            await trackPromise(coreApi.put(
                `/cng/bills/${billId}/tariff`,
                `/cng/tariffs/${tariffId}`,
                { headers: { 'Content-Type': 'text/uri-list' } }
            )); // associate tariff in bill with uri-list modern rest-resource method
        }
        if (customerId) {
            await trackPromise(coreApi.put(
                `/cng/bills/${billId}/customer`,
                `/cng/customers/${customerId}`,
                { headers: { 'Content-Type': 'text/uri-list' } }
            ));
        }
        router.push("/bills")
    }
    const handleStatusChange = async (status: string) => {
        const updatedBill = { ...bill, paymentStatus: status }
        const updateResult = await trackPromise(coreApi.put(`/cng/bills/${bill.id}`, updatedBill));
        const newBill = updateResult.data;
        if (billDetails?.customerId) {
            await trackPromise(coreApi.put(
                `/cng/bills/${newBill?.id}/customer`,
                `/cng/customers/${billDetails?.customerId}`,
                { headers: { 'Content-Type': 'text/uri-list' } }
            ));
        }
        router.push("/bills");
    }
    const paymentStatus = useMemo(() => {
        let name = bill?.paymentStatus || "NotBilled";
        let type = ""
        if (name === "Overdue") {
            type = "danger";
        } else if (name === "Completed") {
            type = "success";
        } else if (name === "Pending") {
            type = "warning"
        } else {
            type = "secondary"
        }
        return { name, type };
    }, [bill?.paymentStatus])

    return (
        <div id="cng-bill-details">
            <HookForm onSubmit={createOrUpdateBill} defaultValues={bill}>
                <FeatureHeader title="Bill" className="justify-content-between">
                    <FlexBox className="justify-content-between">
                        <Badge pill bg="" className={`text-${paymentStatus.type} border border-${paymentStatus.type} d-flex align-items-center`}>
                            {startCase(paymentStatus.name)}
                        </Badge>
                        <div>
                            {canMarkAsPaid &&
                            <Button variant="default" type="button" onClick={() => handleStatusChange("Completed")}>
                                Mark as paid
                            </Button>}
                            {bill?.paymentStatus === "Completed" &&
                                <Button variant="default" type="button" onClick={() => handleStatusChange("Pending")}>
                                    Undo Bill
                                </Button>
                            }
                            {!billDetails?.billId && <Button variant="primary" type="submit">
                                { bill ? "Update" : "Create"}
                            </Button>}
                        </div>
                    </FlexBox>
                </FeatureHeader>
                <Row>
                    <Col>
                        <DetailsCard tariff={billTariff} setBillTariff={setBillTariff}/>
                        <CurrentTariffList data={billTariff} />
                    </Col>
                    <Col>
                        <BillCustomerInfo/>
                    </Col>
                </Row>
            </HookForm>
        </div>
    )
}

export default BillDetail;

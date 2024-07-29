import { Badge, Button, Col, Row } from "react-bootstrap";
import { SubmitHandler } from "react-hook-form";
import FlexBox from "src/components/common/FlexBox";
import HookForm from "src/components/form/HookForm";
import FeatureHeader from "src/components/structure/FeatureHeader";
import { Bill } from "./billSlice";
import { coreApi } from "src/utils/api";
import DetailsCard from "./DetailsCard";
import BillCustomerInfo from "./BillCustomerInfo";
import CurrentTariffList from "./CurrentTariffList";
import { useParams } from "react-router-dom";
import { useRouter } from "src/hooks";
import { useState, useEffect, useMemo } from "react";

const BillDetail = () => {

    const [ todayTariff, setTodayTariff ] = useState();
    const [ bill, setBill ] = useState();
    const router = useRouter();
    const { billId } = useParams();

    useEffect(() => {
        retrieveTodayTariff();
        if (billId) {
            retrieveBill();
        }
        return () => setTodayTariff(null);
    }, [])

    const retrieveTodayTariff = async () => {
        const result = await coreApi
            .get("/cng/tariffs/search/findTodayTariff")
            .catch(error => console.log("No tariff for today add one."))
        if (result) {
            setTodayTariff(result.data);
        }
    }

    const retrieveBill = async () => {
        const retrievedBill = await coreApi.get(`/cng/bills/${billId}`);
        const bill = retrievedBill.data;
        const billCustomer = await coreApi.get(`/cng/bills/${billId}/customer`);
        const customer = billCustomer.data;
        bill["customerId"] = customer.id;
        setBill(bill);
    }

    const onSubmitBill: SubmitHandler<Bill> = async (data) => {
        const { customerId, ...billData} = data;
        const newBill = await coreApi({
            url: bill ? `/cng/bills/${bill.id}` : "/cng/bills",
            method: bill ? "PUT" : "POST",
            data: billData
        }); // create or update bill
        const billId = newBill?.data.id;
        const tariffId = todayTariff?.id;
        if (tariffId) {
            await coreApi.put(
                `/cng/bills/${billId}/tariff`,
                `/cng/tariffs/${tariffId}`,
                { headers: { 'Content-Type': 'text/uri-list' } }
            ); // associate tariff in bill with uri-list modern rest-resource method
        }
        if (customerId) {
            await coreApi.put(
                `/cng/bills/${billId}/customer`,
                `/cng/customers/${customerId}`,
                { headers: { 'Content-Type': 'text/uri-list' } }
            );
        }
        router.push("/bills")
    }
    const handleMarkAsPaid = async () => {
        const updateBill = await coreApi.put(`/cng/bills/${bill.id}`, {
            ...bill,
            paymentStatus: "Paid"
        })
        const newBill = updateBill.data;
        setBill(newBill);
        router.push("/bills");
    }
    const paymentStatus = useMemo(() => {
        let status = bill?.paymentStatus;
        if (status === "Pending") {
            return { label: "Pending", type: "warning" };
        } else if (status === "Paid") {
            return { label: "Completed", type: "success" };
        } else if (status === "Overdue"){
            return { label: "Overdue", type: "danger" };
        } else {
            return { label: "Not Billed", type: "secondary" };
        }
    }, [bill?.paymentStatus])

    return (
        <div id="cng-bill-details">
            <HookForm onSubmit={onSubmitBill} defaultValues={bill}>
                <FeatureHeader title="Bill" className="justify-content-between">
                    <FlexBox className="justify-content-between">
                        <Badge pill bg="" className={`text-${paymentStatus.type} border border-${paymentStatus.type} d-flex align-items-center`}>
                            {paymentStatus.label}
                        </Badge>
                        <div>
                            {bill?.id && bill?.paymentStatus != "Paid" && bill?.paymentStatus != "Not_billed" &&
                            <Button variant="default" type="button" onClick={handleMarkAsPaid}>
                                Mark as paid
                            </Button>}
                            <Button variant="primary" type="submit">
                                { bill ? "Update" : "Create"}
                            </Button>
                        </div>
                    </FlexBox>
                </FeatureHeader>
                <Row>
                    <Col>
                        <DetailsCard tariff={todayTariff}/>
                        {todayTariff ? <CurrentTariffList data={todayTariff} /> : <>No Tariff for today</>}
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
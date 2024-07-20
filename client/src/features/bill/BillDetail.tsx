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
import { useState, useEffect } from "react";

const BillDetail = () => {

    const [ todayTariff, setTodayTariff ] = useState();

    useEffect(() => {
        retrieveTodayTariff()
        return () => setTodayTariff(null);
    }, [])

    const retrieveTodayTariff = async () => {
        const result = await coreApi.get("/cng/tariffs/search/findTodayTariff");
        if (result) {
            setTodayTariff(result.data);
        }
    }

    const onSubmitBill: SubmitHandler<Bill> = async (data) => {
        const { customerId, ...bill} = data;
        const newBill = await coreApi.post("/cng/bills", bill); // create bill
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
    }

    /*
     /bills/11/tariff
     package com.cng_billing_system.core_api.tariff;

     import com.cng_billing_system.core_api.bill.Bill;
     import jakarta.persistence.*;
     import lombok.Getter;
     import lombok.Setter;

     import java.math.BigDecimal;
     import java.util.Date;
     import java.util.List;

     @Entity
     @Table(name = "tariffs")
     @Getter
     @Setter
     public class Tariff {

         @Id
         @GeneratedValue(strategy = GenerationType.IDENTITY)
         @Column(name = "id", nullable = false)
         private Long id;

         private Date fromDate;

         private Date toDate;

         @ElementCollection
         private List<UnitsAndRate> unitsAndRates;

         @OneToMany(mappedBy = "tariff")
         private List<Bill> bills;

     }
     this is my tairff entity and above is my url to trigger I am using axios how to pass the value and i am using restRepsitory

     */

    return (
        <div id="cng-bill-details">
            <HookForm onSubmit={onSubmitBill}>
                <FeatureHeader title="Bill" className="justify-content-between">
                    <FlexBox className="justify-content-between">
                        <Badge pill bg="" className="text-success border border-success d-flex align-items-center">
                            Completed
                        </Badge>
                        <Button variant="primary" type="submit">
                            Create
                        </Button>
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
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

const BillDetail = () => {

    const onSubmitBill: SubmitHandler<Bill> = async (data) => {
        const { customerId, ...bill} = data;
        console.log(data);
    }

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
                        <DetailsCard/>
                        <CurrentTariffList/>
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
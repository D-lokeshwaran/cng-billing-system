import { Link } from "react-router-dom";
import FlexBox from "src/components/common/FlexBox"
import moment from "moment";
import { Dropdown, Badge, Row, Col } from "react-bootstrap";
import { Calendar04Icon, UserMultiple02Icon, Invoice01Icon, CouponPercentIcon } from "hugeicons-react";
import { useRouter } from "src/hooks";

const SearchResultItems = ({ searchResult, closeMenu, entities }: { searchResult: any }) => {
    const router = useRouter()

    const ResultMenuItem = ({ to, icon: HugeIcon, title, date, description }) => (
        <Dropdown.Item
            as={Link}
            to={to}
            className="text-truncate fs-5 py-2"
            onClick={closeMenu}
        >
            <Row>
                <Col xs={1}>
                    <HugeIcon size="20"/>
                </Col>
                <Col xs={8}>
                    <div className="text-truncate">{title}</div>
                    {description &&
                        <div className="text-truncate text-gray-600">
                            {description}
                        </div>
                    }
                </Col>
                <Col xs={3} className="text-end">
                    <small className="text-secondary">
                        {moment(date).format("DD MMM")}
                        <Calendar04Icon size="15" className="ms-2"/>
                    </small>
                </Col>
            </Row>
        </Dropdown.Item>
    )

    const customerSearchResult = searchResult?.customers?.map(customer =>
        <ResultMenuItem
            key={customer.accountNumber}
            icon={UserMultiple02Icon}
            to={`/customers/${customer.id}`}
            title={customer.fullName}
            date={customer.createdAt}
            description={`email-${customer.emailAddress}, Contact No-${customer.contactNumber}`}
        />
    )
    const billSearchResult = searchResult?.bills?.map(bill =>
        <ResultMenuItem
            key={bill.id}
            icon={Invoice01Icon}
            to={`/bills/${bill.id}`}
            title={bill.paymentStatus}
            date={bill.createdAt}
            description={`units-${bill.unitsConsumed}, amount-${bill.billAmount}`}
        />
    )

    const tariffSearchResult = searchResult?.tariffs?.map(tariff =>
        <ResultMenuItem
            key={tariff.fromDate}
            icon={CouponPercentIcon}
            to={`/tariffs/${tariff.id}`}
            title={`From: ${tariff.fromDate}, To: ${tariff.toDate}`}
            date={tariff.createdAt}
            description={`Max rate per unit: ${tariff.unitsAndRates[tariff.unitsAndRates.length -1]?.ratePerUnit}`}
        />
    )

    if (searchResult && Object.values(searchResult).every(res => res.length == 0)) {
        return (
            <Dropdown.ItemText>
                No results found!
            </Dropdown.ItemText>
        )
    }
    return (
        <>
            {billSearchResult}
            {customerSearchResult}
            {tariffSearchResult}
        </>
    )
}
export default SearchResultItems;
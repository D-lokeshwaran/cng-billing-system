import { Calendar04Icon } from 'hugeicons-react';
import { Link } from "react-router-dom";
import FlexBox from "src/components/common/FlexBox"
import moment from "moment";
import { Dropdown, Badge } from "react-bootstrap";
import { useRouter } from "src/hooks";

const SearchResultItems = ({ searchResult }: { searchResult: any }) => {
    const router = useRouter()

    const customerSearchResult = (
        <>
            {searchResult?.customers.length > 0 && <Dropdown.ItemText>
                CUSTOMERS
            </Dropdown.ItemText>}
            {searchResult?.customers?.map(customer =>
                <Dropdown.Item
                    key={customer.accountNumber}
                    as={Link}
                    to={`/customers/${customer.id}`}
                    className="text-truncate"
                >
                    <FlexBox justify="between nav-item">
                        {customer.fullName}
                        <small className="text-secondary">
                            {moment(customer.createdAt).format("DD MMM")}
                            <Calendar04Icon size="15" className="ms-2"/>
                        </small>
                    </FlexBox>
                    <small className="text-secondary">email-{customer.emailAddress}, Contact No-{customer.contactNumber}</small>
                </Dropdown.Item>
            )}
        </>
    )
    const billSearchResult = (
        <>
            {searchResult?.bills.length > 0 && <Dropdown.ItemText>
                BILLS
            </Dropdown.ItemText>}
            {searchResult?.bills?.map(bill =>
                <Dropdown.Item
                    key={bill.id}
                    as={Link}
                    to={`/bills/${bill.id}`}
                    className="text-truncate"
                >
                    <FlexBox justify="between">
                        {bill.paymentStatus}
                        <small className="text-secondary">
                            {moment(bill.createdAt).format("DD MMM")}
                            <Calendar04Icon size="15" className="ms-2"/>
                        </small>
                    </FlexBox>
                    <small className="text-secondary">units-{bill.unitsConsumed}, amount-{bill.billAmount}</small>
                </Dropdown.Item>
            )}
        </>
    )

    const tariffSearchResult = (
        <>
            {searchResult?.tariffs.length > 0 && <Dropdown.ItemText>
                TARIFFS
            </Dropdown.ItemText>}
            {searchResult?.tariffs?.map(tariff =>
                <Dropdown.Item
                    key={tariff.fromDate}
                    as={Link}
                    to={`/tariffs/${tariff.id}`}
                    className="text-truncate"
                >
                    <FlexBox justify="between">
                        From: {tariff.fromDate}, To: {tariff.toDate}
                        <small className="text-secondary">
                            {moment(tariff.createdAt).format("DD MMM")}
                            <Calendar04Icon size="15" className="ms-2"/>
                        </small>
                    </FlexBox>
                </Dropdown.Item>
            )}
        </>
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
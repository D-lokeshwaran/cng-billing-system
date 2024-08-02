import React from "react";
import { Dropdown, Badge } from "react-bootstrap";
import FlexBox from "src/components/common/FlexBox";
import { Link } from "react-router-dom";

const SearchMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy, value, addons }, ref) => {

    return (
        <div
            ref={ref}
            style={style}
            className={className}
            aria-labelledby={labeledBy}
        >
            {!value ?
                <>
                    <div className="px-3">
                        <small className="text-secondary">RECENT SEARCH</small>
                        <div>no recent searches</div>
                    </div>
                    <hr/>
                    <div className="px-3">
                        <small className="text-secondary">QUICK LINKS</small>
                        <Dropdown.Item as={Link} to="/customers">
                            <Badge className="bg-light text-warning">Customers:</Badge>
                            <span>All customers list</span>
                        </Dropdown.Item>
                        <Dropdown.Item as={Link} to={`/bills/new`}>
                            <Badge className="bg-light text-success">Bill:</Badge>
                            <span>Create new bill</span>
                        </Dropdown.Item>
                        {addons?.todayTariffId ?
                            <Dropdown.Item as={Link} to={`/tariffs/${addons?.todayTariffId}`}>
                                <Badge className="bg-light text-primary">Tariff:</Badge>
                                <span>View today Tariff</span>
                            </Dropdown.Item>
                        :   <Dropdown.Item as={Link} to="/tariffs/new">
                                <Badge className="bg-light text-primary">Tariff:</Badge>
                                <span>Create today Tariff</span>
                            </Dropdown.Item>
                        }
                    </div>
                </>
            :   <ul className="list-unstyled">
                    {children}
                </ul>
            }
        </div>
    )
});

export default SearchMenu;
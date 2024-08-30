import { Dropdown, Badge } from "react-bootstrap";
import React from "react";
import FlexBox from "src/components/common/FlexBox";
import { UserMultiple02Icon, Invoice01Icon, CouponPercentIcon } from "hugeicons-react";
import { Link } from "react-router-dom";

const SearchInitialItems =  ({ children, className, addons, setLookingFor, closeMenu }) => {

    const MenuItem = ({ to, icon: HugeIcon, action, title }) => (
        <Dropdown.Item as={Link} to={to} onClick={closeMenu} className="py-2 fs-5 btn-reveal-trigger">
            <HugeIcon size="20"/>
            <span className="px-3">
                <span className="text-secondary">
                    {action === "view" ?  "Go-to:" :
                        action === "create" ? "Create:" : action
                    }
                </span>
                <span className="mx-1">{title}</span>
            </span>
        </Dropdown.Item>
    )

    return (
        <div className="w-100 m-0 rounded-top-0 border-0">
            <div>
                <Dropdown.Header>
                    <div className="mb-0 text-md">Quick Actions</div>
                </Dropdown.Header>
                <MenuItem to="/customers" icon={UserMultiple02Icon} action="view" title="Customer List"/>
                <MenuItem to="/bills/new" icon={Invoice01Icon} action="create" title="New Bill"/>

                {addons?.todayTariffId ?
                        <MenuItem to={`/tariffs/${addons?.todayTariffId}`} icon={CouponPercentIcon} action="view" title="Today Tariff"/>
                    :   <MenuItem to={`/tariffs/new`} icon={CouponPercentIcon} action="create" title="Tariff for Today"/>
                }
            </div>
        </div>
    )
};

export default SearchInitialItems;
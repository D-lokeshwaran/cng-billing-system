import { Notification02Icon, TickDouble02Icon } from "hugeicons-react"
import { Dropdown, Modal } from "react-bootstrap";
import IconButton from "../common/IconButton";
import FlexBox from "../common/FlexBox";

const Notification = (props) => {
    return (
        <Dropdown>
            <Dropdown.Toggle as="div">
                <IconButton icon={Notification02Icon} {...props}/>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="p-3">
                <FlexBox justify="between">
                    Notifications
                    <TickDouble02Icon size="20"/>
                </FlexBox>
                <div>
                    <div>Customer Alisha paid $300 for bill #1002 </div>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Notification;
import {
    UserSharingIcon,
    UserIcon,
    Settings02Icon,
    LeftToRightListBulletIcon,
    Logout03Icon
 } from "hugeicons-react"
import IconButton from "../common/IconButton";
import { Dropdown } from "react-bootstrap";
import FlexBox from "../common/FlexBox";

const Profile = () => {

    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="p-2">
                <FlexBox className="cursor-pointer">
                    <span className="me-2">John doe</span>
                    <UserSharingIcon/>
                </FlexBox>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
                <Dropdown.Item>
                    <UserIcon size="18" className="me-2"/> Profile
                </Dropdown.Item>
                <Dropdown.Item>
                    <Settings02Icon size="18" className="me-2"/> Settings
                </Dropdown.Item>
                <Dropdown.Item>
                    <LeftToRightListBulletIcon size="18" className="me-2"/> Activity log
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item>
                    <Logout03Icon size="18" className="me-2"/> Logout
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default Profile;
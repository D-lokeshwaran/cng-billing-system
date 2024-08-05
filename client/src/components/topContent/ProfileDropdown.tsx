import {
    UserSharingIcon,
    UserIcon,
    Settings02Icon,
    LeftToRightListBulletIcon,
    Logout03Icon
 } from "hugeicons-react"
import IconButton from "../common/IconButton";
import { Dropdown, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "src/context/AuthContext";
import { useRouter } from "src/hooks";
import FlexBox from "../common/FlexBox";

const ProfileDropdown = () => {

    const { logOut } = useAuth();
    const router = useRouter();

    const _handleLogout = () => {
        logOut(); // api call logOut
        router.push("/login");
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="p-2">
                <FlexBox className="cursor-pointer">
                    <span className="me-2">John doe</span>
                    <UserSharingIcon/>
                </FlexBox>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
                <Dropdown.Item as={Link} to="/profile">
                    <UserIcon size="18" className="me-2"/> My Profile
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/profile/settings">
                    <Settings02Icon size="18" className="me-2"/> Settings
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/profile/activity-log">
                    <LeftToRightListBulletIcon size="18" className="me-2"/> Activity log
                </Dropdown.Item>
                <Dropdown.Divider/>
                <Dropdown.Item onClick={_handleLogout}>
                    <Logout03Icon size="18" className="me-2"/> Logout
                </Dropdown.Item>
            </Dropdown.Menu>
            <Offcanvas show={false} placement="end">
                 <Offcanvas.Header closeButton>
                 </Offcanvas.Header>
                 <Offcanvas.Body>
                      Some text as placeholder. In real life you can have the elements you
                      have chosen. Like, text, images, lists, etc.
                 </Offcanvas.Body>
            </Offcanvas>
        </Dropdown>
    )
}

export default ProfileDropdown;
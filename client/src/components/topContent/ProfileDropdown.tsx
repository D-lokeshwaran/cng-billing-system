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
import { useUserContext } from "src/context/UserContext";
import { useRouter } from "src/hooks";
import FlexBox from "../common/FlexBox";

const ProfileDropdown = () => {

    const { isCustomer, logOut } = useAuth();
    const { userDetails } = useUserContext();
    const router = useRouter();

    const _handleLogout = () => {
        logOut(); // api call logOut
        router.push("/login");
    }

    return (
        <Dropdown>
            <Dropdown.Toggle as="div" className="py-2">
                <FlexBox className="cursor-pointer border-start border-2 ps-3">
                    <span className="me-2">{userDetails?.profile?.fullName}</span>
                    {userDetails?.avatar ?
                        <img
                            src={userDetails.avatar}
                            height={32}
                            width={32}
                            className="border rounded-2 overflow-hidden"
                        />
                        :   <UserSharingIcon size="30"/>
                    }
                </FlexBox>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end" className="animated--grow-in">
                {!isCustomer && <Dropdown.Item as={Link} to="/profile">
                    <UserIcon size="18" className="me-2"/> My Profile
                </Dropdown.Item>}
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
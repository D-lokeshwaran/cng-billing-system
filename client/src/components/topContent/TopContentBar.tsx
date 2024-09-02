import FlexBox from "src/components/common/FlexBox";
import GlobalSearchBox from "./globalSearch";
import ToggleTheme from "./ToggleTheme";
import Notification from "./Notification";
import SideBarCollapse from "./SideBarCollapse";
import ProfileDropdown from "./ProfileDropdown";
import { Navbar, Container } from "react-bootstrap";
import { useAuth } from "src/context/AuthContext";

const TopContentBar = () => {
    const auth = useAuth();

    return (
        <Navbar sticky="top" className="justify-content-between bg-glass py-3">
            <Container fluid className="px-3">
                <FlexBox id="left">
                    <SideBarCollapse/>
                    {!auth?.isCustomer && <GlobalSearchBox />}
                </FlexBox>
                <FlexBox id="right">
                    <ToggleTheme/>
                    <Notification className="mx-2"/>
                    <ProfileDropdown/>
                </FlexBox>
            </Container>
        </Navbar>
    )
}

export default TopContentBar;
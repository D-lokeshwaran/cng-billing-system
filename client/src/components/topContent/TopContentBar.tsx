import FlexBox from "src/components/common/FlexBox";
import GlobalSearchBox from "./globalSearch";
import ToggleTheme from "./ToggleTheme";
import Notification from "./Notification";
import ProfileDropdown from "./ProfileDropdown";
import { Navbar, Container } from "react-bootstrap";

const TopContentBar = () => {

    return (
        <Navbar sticky="top" className="justify-content-between bg-glass py-3">
            <Container fluid>
                <div id="left">
                    <GlobalSearchBox />
                </div>
                <FlexBox id="right">
                    <ToggleTheme/>
                    <Notification/>
                    <div className="px-2 border-1">|</div>
                    <ProfileDropdown/>
                </FlexBox>
            </Container>
        </Navbar>
    )
}

export default TopContentBar;
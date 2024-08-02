import FlexBox from "src/components/common/FlexBox";
import GlobalSearchBox from "./globalSearch";
import ToggleTheme from "./ToggleTheme";
import Notification from "./Notification";
import Profile from "./Profile";
import { Navbar } from "react-bootstrap";

const TopContentBar = () => {

    return (
        <Navbar sticky="top" className="justify-content-between">
            <div id="left">
                <GlobalSearchBox />
            </div>
            <FlexBox id="right">
                <ToggleTheme/>
                <Notification/>
                <div className="px-2 border-1">|</div>
                <Profile/>
            </FlexBox>
        </Navbar>
    )
}

export default TopContentBar;
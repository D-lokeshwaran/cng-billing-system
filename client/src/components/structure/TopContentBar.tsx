import FlexBox from "src/components/common/FlexBox";
import GlobalSearchBox from "src/components/common/globalSearch";
import { Navbar } from "react-bootstrap";

const TopContentBar = () => {

    return (
        <Navbar sticky="top" className="bg-light justify-content-between">
            <div id="left">
                <GlobalSearchBox />
            </div>
            <div id="right">
                theme, notification, profile
            </div>
        </Navbar>
    )
}

export default TopContentBar;
import IconButton from 'src/components/common/IconButton';
import { Menu02Icon } from "hugeicons-react";
import { Offcanvas } from "react-bootstrap";
import SideBar from "src/components/structure/SideBar";
import { useToggle } from "src/hooks";

const SideBarCollapse = () => {
    const [ showMenu, toggleSidebar ] = useToggle();

    return (
        <div className="sidebar-collapse">
            <IconButton
                icon={Menu02Icon}
                className="collapse-button me-2"
                onClick={toggleSidebar}
            />
            <Offcanvas show={showMenu} onHide={toggleSidebar} responsive="sm" className="w-75">
                <Offcanvas.Body className="p-0">
                    <SideBar onNavClick={() => toggleSidebar()}/>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}

export default SideBarCollapse;
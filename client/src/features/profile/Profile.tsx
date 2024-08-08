import { Card, Tabs, Tab, Nav, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import FlexBox from "src/components/common/FlexBox";
import { useRouter } from "src/hooks";
import Overview from "./Overview";
import { Settings } from "./Settings";
import profileCover from "src/assets/img/profile-cover.svg";
import { useUserContext } from "src/context/UserContext";
import user from "./user.jpg"

const Profile = ({ pageId }) => {
    const { profileTab } = useParams();
    const { userDetails } = useUserContext();
    const router = useRouter();

    return (
        <Tab.Container
            id="right-down-tabs"
            defaultActiveKey="overview"
            activeKey={pageId}
            onSelect={(pageId) => router.push(`/profile/${pageId}`)}
        >
            <Card className="position-relative">
                <Card.Img variant="top" src={profileCover} height={140} className="object-fit-cover"/>
                <Card.Body className="p-0 pb-3">
                    <FlexBox
                        id="avatar-profile"
                        className="ms-4 position-absolute"
                        style={{top:"30%"}}
                    >
                        <img
                            src={userDetails?.avatar}
                            height={100}
                            width={100}
                            className="border rounded-4"
                        />
                        <div className="m-4 mt-0 ms-3">
                            <Card.Title className="mb-0">{userDetails?.profile.fullName}</Card.Title>
                            <Card.Subtitle as="small" className="mb-2 text-muted">{userDetails?.role["Admin"] && "ADMIN"}</Card.Subtitle>
                        </div>
                    </FlexBox>
                    <Nav variant="tabs" className="justify-content-end mt-3 me-2">
                        <Nav.Item>
                            <Nav.Link eventKey="overview">Overview</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="settings">Settings</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="activity-log">Activity log</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Card.Body>
            </Card>
            <Tab.Content className="mt-4 mb-3">
                <Tab.Pane eventKey="overview"><Overview/></Tab.Pane>
                <Tab.Pane eventKey="settings"><Settings/></Tab.Pane>
                <Tab.Pane eventKey="activity-log">Activity log tab</Tab.Pane>
            </Tab.Content>
        </Tab.Container>
    )
}

export default Profile
import { Card, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { supportApi } from "src/utils/api";
import { useEffect } from "react";
import { useUserContext } from "src/context/UserContext";
import { AccountSettingsType } from "../type";

const AccountSettings = () => {

    const { userDetails, setUserDetails } = useUserContext();
    const { register, watch } = useForm<AccountSettingsType>({
        values: userDetails?.accountSettings
    });

    const onChangeSettings = async () => {
        const watchAccountSettings = watch();
        await supportApi.put("/user/johnDoe02@gmail.com/accountSettings", watchAccountSettings)
            .then(result => setUserDetails(result.data));
    }

    const registerSetting = (field: string) => register(field, {
        onChange: onChangeSettings
    });

    return (
        <Card>
            <Card.Header className="fs-4">Account Settings</Card.Header>
            <Card.Body>
                <div className="mb-3">
                    Who can see your Profile?
                    <Form.Check
                        type="radio"
                        {...registerSetting("whoCanView")}
                        value="everyone"
                        label="Everyone"
                    />
                    <Form.Check
                        type="radio"
                        {...registerSetting("whoCanView")}
                        value="myCustomers"
                        label="My Customers"
                    />
                    <Form.Check
                        type="radio"
                        {...registerSetting("whoCanView")}
                        value="onlyMe"
                        label="Only me"
                    />
                </div>
                <div>
                    Allowed Communication ways?
                    <Form.Check
                        type="checkbox"
                        {...registerSetting("communicateViaEmail")}
                        label="Email address"
                    />
                    <Form.Check
                        type="checkbox"
                        {...registerSetting("communicateViaPhoneNumber")}
                        label="Phone number"
                    />
                </div>
                <hr/>
                <Form.Check
                    className="mb-2"
                    type="checkbox"
                    {...registerSetting("allowDeleteLogs")}
                    label="Delete Activity logs after 30 days"
                />
                <Form.Check
                    type="checkbox"
                    {...registerSetting("showAboutMe")}
                    label="Allow user to show your About me."
                />
            </Card.Body>
        </Card>
    )
}

export default AccountSettings;
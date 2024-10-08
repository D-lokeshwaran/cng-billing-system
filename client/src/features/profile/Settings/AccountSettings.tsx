import { Card, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { supportApi } from "src/utils/api";
import { trackPromise } from 'react-promise-tracker';
import { useEffect } from "react";
import { useUserContext } from "src/context/UserContext";
import { useAuth } from "src/context/AuthContext";
import { AccountSettingsType } from "../type";

const AccountSettings = ({ readonly, readonlyUser }) => {

    const { userDetails, setUserDetails } = useUserContext();
    const { user } = useAuth();
    const { register, watch } = useForm<AccountSettingsType>({
        values: userDetails?.accountSettings
    });

    const onChangeSettings = async () => {
        const watchAccountSettings = watch();
        await trackPromise(supportApi.put(`/user/${user.emailAddress}/accountSettings`, watchAccountSettings))
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
                        disabled={readonly}
                    />
                    <Form.Check
                        type="radio"
                        {...registerSetting("whoCanView")}
                        value="myCustomers"
                        label="My Customers"
                        disabled={readonly}
                    />
                    <Form.Check
                        type="radio"
                        {...registerSetting("whoCanView")}
                        value="onlyMe"
                        label="Only me"
                        disabled={readonly}
                    />
                </div>
                <div>
                    Allowed Communication ways?
                    <Form.Check
                        type="checkbox"
                        {...registerSetting("communicateViaEmail")}
                        label="Email address"
                        disabled={readonly}
                    />
                    <Form.Check
                        type="checkbox"
                        {...registerSetting("communicateViaPhoneNumber")}
                        label="Phone number"
                        disabled={readonly}
                    />
                </div>
                <hr/>
                <Form.Check
                    className="mb-2"
                    type="checkbox"
                    {...registerSetting("allowDeleteLogs")}
                    label="Delete Activity logs after 30 days"
                    disabled={readonly}
                />
                <Form.Check
                    type="checkbox"
                    {...registerSetting("showAboutMe")}
                    label="Allow user to show your About me."
                    disabled={readonly}
                />
            </Card.Body>
        </Card>
    )
}

export default AccountSettings;
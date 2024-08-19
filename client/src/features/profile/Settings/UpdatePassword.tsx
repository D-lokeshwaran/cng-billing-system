import { Card, Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import { useAuth } from "src/context/AuthContext";
import { supportApi } from "src/utils/api";
import { useRef } from "react"

const UpdatePassword = () => {

    const { user } = useAuth();

    const handleUpdatePassword = async (data, event) => {
        const { oldPassword, newPassword } = data;
        await supportApi.put(`/user/${user.emailAddress}/updatePassword`, {
            oldPassword, newPassword
        }).catch(err => console.log(err))
    }

    return (
        <Card>
            <HookForm onSubmit={handleUpdatePassword}>
                <Card.Header className="fs-4">Update Password</Card.Header>
                <Card.Body>
                    <Input
                        field={{state: "oldPassword", title: "Old Password", type: "password"}}
                        required={false}
                    />
                    <Input
                        field={{state: "newPassword", title: "New Password", type: "password"}}
                        required={false}
                    />
                    <ConfirmPassword/>
                </Card.Body>
                <Card.Footer className="d-grid ">
                    <Button size="sm" className="d-block" type="submit">Update Password</Button>
                </Card.Footer>
            </HookForm>
        </Card>
    )
}

const ConfirmPassword = () => {
    const { watch } = useFormContext();
    const watchNewPassword = watch("newPassword");
    return (
        <Input
            field={{state: "confirmPassword", title: "Confirm Password", type: "password"}}
            required={false}
            validate={{
                validConfirm: (v) => v === watchNewPassword || "Mismatch Confirm password."
            }}
        />
    )
}

export default UpdatePassword;
import { Card, Button } from "react-bootstrap";
import { useFormContext } from "react-hook-form";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import { supportApi } from "src/utils/api";

const UpdatePassword = () => {

    const handleUpdatePassword = async (data, event) => {
        const { oldPassword, newPassword } = data;
        await supportApi.put("/user/johnDoe02@gmail.com/updatePassword", {
            oldPassword, newPassword
        })
        .catch(err => alert(err))
    }

    return (
        <Card>
            <HookForm onSubmit={handleUpdatePassword}>
                <Card.Header className="fs-4">Update Password</Card.Header>
                <Card.Body>
                    <Input
                        field={{state: "oldPassword", title: "Old Password"}}
                        required={false}
                    />
                    <Input
                        field={{state: "newPassword", title: "New Password"}}
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
            field={{state: "confirmPassword", title: "Confirm Password"}}
            required={false}
            validate={{
                validConfirm: (v) => v === watchNewPassword || "Mismatch Confirm password."
            }}
        />
    )
}

export default UpdatePassword;
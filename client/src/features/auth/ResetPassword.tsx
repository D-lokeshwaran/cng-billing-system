import AuthLayout from "src/layouts/AuthLayout"
import { Helmet } from 'react-helmet-async';
import { Button } from "react-bootstrap";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import { useRouter } from "src/hooks";
import { useSearchParams } from "react-router-dom";
import { supportApi } from "src/utils/api";

const ResetPassword = () => {

    const [params, setParams] = useSearchParams();
    const router = useRouter();

    const handleSendEmail = async (data) => {
        await supportApi({
            url: '/reset-password',
            method: "POST",
            params: {
                user: params.get("user")
            },
            data: {
                password: data.password
            }
        })
        .then(res => alert(res.data))
        .catch(err => console.log(err));
        router.push("/login");

    }

    return (
        <>
            <Helmet>
                <title>CNG Reset password </title>
            </Helmet>
            <AuthLayout>
                <HookForm onSubmit={handleSendEmail} className="d-grid">
                    <h3 className="mb-0">Reset Password</h3>
                    <p className="text-secondary">
                        setup your new password
                    </p>
                    <Input
                        field={{state: "password", title: ""}}
                        required={false}
                        style={{margin: "0px"}}
                    />
                    <Button size="sm" type="submit">Set Password</Button>
                </HookForm>
            </AuthLayout>
        </>
    )

}
export default ResetPassword;
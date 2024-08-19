import AuthLayout from "src/layouts/AuthLayout"
import { Helmet } from 'react-helmet-async';
import { Button } from "react-bootstrap";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import { useAuth } from "src/context/AuthContext";
import { supportApi } from "src/utils/api";
import { useRouter } from "src/hooks";
import { Link } from "react-router-dom";
import { getDefaultRoute } from "src/utils/navigation";

const UpdatePassword = () => {

    const { user: { emailAddress, role } } = useAuth();
    const router = useRouter();

    const handleUpdatePassword = async (data) => {
        const result = await supportApi.post('/update-password', {
            newPassword: data.newPassword,
            emailAddress: emailAddress
        }).catch(err => console.log(err));
        router.push(getDefaultRoute(role));
    }

    return (
        <>
            <Helmet>
                <title>CNG Enter Password </title>
            </Helmet>
            <AuthLayout>
                <HookForm onSubmit={handleUpdatePassword} className="d-grid">
                    <h3 className="mb-0">Enter your Password</h3>
                    <Input field={{state: "newPassword", title: "New Password"}} />
                    <Input field={{state: "confirmPassword", title: "Confirm Password"}} />
                    <Button size="sm" type="submit">Update and Login</Button>
                </HookForm>
                <Link to="/login" className="d-block text-center mt-3 text-decoration-underline cursor-pointer"
                >{"<- Back to login"}</Link>
            </AuthLayout>
        </>
    )

}
export default UpdatePassword
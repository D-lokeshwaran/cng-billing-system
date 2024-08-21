import AuthLayout from "src/layouts/AuthLayout"
import { Helmet } from 'react-helmet-async';
import { Button } from "react-bootstrap";
import HookForm from "src/components/form/HookForm";
import Input from "src/components/form/Input";
import { supportApi } from "src/utils/api";
import { trackPromise } from 'react-promise-tracker';
import { Link } from "react-router-dom";

const RecoverPassword = () => {

    const handleSendEmail = async (data) => {
        await trackPromise(supportApi.post('/recover-password', {
            emailAddress: data.emailAddress
        }))
    }

    return (
        <>
            <Helmet>
                <title>CNG Recover password </title>
            </Helmet>
            <AuthLayout>
                <HookForm onSubmit={handleSendEmail} className="d-grid">
                    <h3 className="mb-0">Password Recovery</h3>
                    <Input
                        field={{state: "emailAddress", title: ""}}
                        required={false}
                        style={{margin: "0px"}}
                    />
                    <p className="text-secondary" style={{marginTop: "-10px"}}>
                        Enter your email address and we will send you a link to reset your password.
                    </p>
                    <Button size="sm" type="submit">Send Email</Button>
                </HookForm>
                <Link to="/login" className="d-block text-center mt-3 text-decoration-underline cursor-pointer"
                >{"<- Back to login"}</Link>
            </AuthLayout>
        </>
    )

}
export default RecoverPassword
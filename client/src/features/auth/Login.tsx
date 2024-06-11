import LoginForm from "./LoginForm"
import AuthLayout from "src/layouts/AuthLayout"
import { Helmet } from 'react-helmet-async';

const Login = () => {
    return (
        <>        
            <Helmet>
                <title>CNG Authentication </title>
            </Helmet>
            <AuthLayout>
                <LoginForm/>
            </AuthLayout>
        </>
    )

}
export default Login
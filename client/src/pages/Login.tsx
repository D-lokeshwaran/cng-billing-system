import LoginForm from "src/components/login/LoginForm"
import AuthLayout from "src/layouts/AuthLayout"
import { Helmet } from 'react-helmet-async';

const Login = () => {
    return (
        <>        
            <Helmet>
                <title>CNG Auth Login</title>
            </Helmet>
            <AuthLayout>
                <LoginForm/>
            </AuthLayout>
        </>
    )

}
export default Login
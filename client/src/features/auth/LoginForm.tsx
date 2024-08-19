import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from 'src/context/AuthContext';

type LoginInputs = {
  emailAddress: string,
  password: string
}

export const LoginForm: React.FC = () => {

  const { user, logIn } = useAuth();
  const navigateTo = useNavigate();
  const { 
    register, 
    handleSubmit,
    formState: { isValid }
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
      const nextPath = await logIn(data.emailAddress, data.password)
      if (nextPath) {
        navigateTo(nextPath);
      }
  }

  return <>
    <h4 className='fw-bold text-left'>
      Time to Login
    </h4>
    <div className='mt-5'>
      <Form onSubmit={handleSubmit(onSubmit)} className='d-grid gap-4'>

        <Form.Group>
          <Form.Label aria-label='emailAddress'>Email Address</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="John doe"
            autoComplete='off'
            tabIndex={1}
            {...register('emailAddress', {required: true})}/>
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label aria-label='password & recover password' className="d-flex-between">
              <span>Password</span>
              <Link 
                className='text-black focus-ring'
                to="/recover-password"
                tabIndex={4}
              >
                Forget password?
              </Link>
          </Form.Label>
          <Form.Control 
            type="password"
            tabIndex={2}
            autoComplete='off'
            {...register('password', {required: true}) }
             />
        </Form.Group>

        <Button 
          className="mt-2"
          tabIndex={3}
          disabled={!isValid}
          type="submit"
        >
            Login
        </Button>
      </Form>
    </div>
  </>;
};

export default LoginForm;

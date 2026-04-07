import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../../../components/PasswordInput';
import { useDispatch } from "react-redux";
import { loginUser } from "../authSlice";
import './LoginForm.css';
import { toast } from "react-toastify";
// Schema Validation using Yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
  setIsLoading(true);
  setLoginError('');

  try {
    const resultAction = await dispatch(loginUser(data));

    
    if (loginUser.rejected.match(resultAction)) {
      setLoginError("Invalid email or password");
      toast.error("Invalid email or password");
      return;
    }

    toast.success("Login successful!");
    navigate('/');
  } catch (error) {
    setLoginError("Something went wrong. Try again.");
    toast.error("Something went wrong. Try again.");
  } finally {
    setIsLoading(false);
  }
  };

  return (
    <>
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Welcome Back!</h2>
            <p>Please enter your details to sign in.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {loginError && <div className="error-message global-error">{loginError}</div>}
            
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className={`form-input ${errors.email ? 'input-error' : ''}`}
                {...register('email')}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter password"
            register={register}
            error={errors.password?.message}
          />

            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password-link">Forgot password?</Link>
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="login-footer">
            <p>Don't have an account? <Link to="/register" className="register-link">Sign up</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../../../components/PasswordInput';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, resetLoginStatus } from "../authSlice";
import { toast } from "react-toastify";
import './LoginForm.css';

// Schema Validation using Yup
const schema = yup.object().shape({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loginStatus, loginError } = useSelector(state => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  // Toast & redirect based on Redux status
  useEffect(() => {
    if (loginStatus === "succeeded") {
      toast.success("Login successful!");
      dispatch(resetLoginStatus());
      navigate('/');
    } else if (loginStatus === "failed") {
      toast.error(loginError || "Login failed");
      dispatch(resetLoginStatus());
    }
  }, [loginStatus, loginError, dispatch, navigate]);

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome Back!</h2>
          <p>Please enter your details to sign in.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="login-form">
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

          <button type="submit" className="btn-submit" disabled={loginStatus === "loading"}>
            {loginStatus === "loading" ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <Link to="/register" className="register-link">Sign up</Link></p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
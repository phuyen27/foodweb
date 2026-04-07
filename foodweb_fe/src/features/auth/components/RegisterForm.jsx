import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import PasswordInput from '../../../components/PasswordInput';
import { useDispatch } from 'react-redux';
import {loginUser, registerUser} from '../authSlice';
import { uploadToCloudinary } from '../../../utils/cloudinary';
import './LoginForm.css';
import { toast } from "react-toastify";

const schema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

const RegisterForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [registerError, setRegisterError] = useState('');
  const [avatarFile, setAvatarFile] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setRegisterError('');
    
    try {
      let avatarUrl = '';
      if (avatarFile) {
        avatarUrl = await uploadToCloudinary(avatarFile);
      }


     const registerResult = await dispatch(registerUser({
      name: data.name,
      email: data.email,
      password: data.password,
      avatarUrl: avatarUrl,
     }));

     if (registerUser.rejected.match(registerResult)) {
      setRegisterError(registerResult.payload || "Registration failed");
      toast.error("Registration failed");
      return;
    }

     const loginResult = await dispatch(loginUser({
      email: data.email,
      password: data.password,
     }));

     if(loginUser.rejected.match(loginResult)) {
      setRegisterError("Login failed after registration. Please try logging in.");
      toast.error("Login failed after registration. Please try logging in.");
      return;
     }

     toast.success("Registration and login successful!");
     navigate('/');

    } catch (error) {
     console.error("ERROR:", error);
  setRegisterError(error.message || 'Registration failed');
      toast.error("Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>    
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2>Create an Account</h2>
            <p>Join us to discover delicious food.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            {registerError && <div className="error-message global-error">{registerError}</div>}
            
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your full name"
                className={`form-input ${errors.name ? 'input-error' : ''}`}
                {...register('name')}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>

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
              placeholder="Enter your password"
              register={register}
              error={errors.password}
            />

            <PasswordInput
              label="Confirm Password"
              name="confirmPassword"
              placeholder="Confirm your password"
              register={register}
              error={errors.confirmPassword}
            />

           

            <div className="form-group">
              <label htmlFor="avatar">Avatar</label>
              <input
                id="avatar"
                type="file"
                accept="image/*"
                onChange={(e) => setAvatarFile(e.target.files[0])}
              />
            </div>

            <button type="submit" className="btn-submit" disabled={isLoading} style={{ marginTop: '0.5rem' }}>
              {isLoading ? 'Creating account...' : 'Sign Up'}
            </button>
          </form>

          <div className="login-footer">
            <p>Already have an account? <Link to="/login" className="register-link">Sign in</Link></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
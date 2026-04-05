import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar';
import { useDispatch } from 'react-redux';
import {loginUser, registerUser} from '../authSlice';
import './LoginForm.css'; 

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
      return;
    }

     const loginResult = await dispatch(loginUser({
      email: data.email,
      password: data.password,
     }));

     if(loginUser.rejected.match(loginResult)) {
      setRegisterError("Login failed after registration. Please try logging in.");
      return;
     }

     navigate('/');

    } catch (error) {
     console.error("ERROR:", error);
  setRegisterError(error.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };


 const uploadToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append(
    'upload_preset',
    import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
  );

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await res.json();
  console.log("Cloudinary response:", data);

  if (!res.ok) {
    throw new Error(data.error?.message || 'Upload failed');
  }

  return data.secure_url;
};

  return (
    <>
      <Navbar />
      
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

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Create a password"
                className={`form-input ${errors.password ? 'input-error' : ''}`}
                {...register('password')}
              />
              {errors.password && <span className="error-message">{errors.password.message}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                className={`form-input ${errors.confirmPassword ? 'input-error' : ''}`}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
            </div>

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
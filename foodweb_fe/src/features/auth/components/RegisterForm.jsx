import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import PasswordInput from '../../../components/PasswordInput';
import { loginUser, registerUser } from '../authSlice';
import { uploadToCloudinary } from '../../../utils/cloudinary';

import { toast } from "react-toastify";
import './LoginForm.css';


// validation schema
const schema = yup.object().shape({
  name: yup
    .string()
    .required('Full name is required'),

  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),

  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),

  confirmPassword: yup
    .string()
    .oneOf(
      [yup.ref('password'), null],
      'Passwords must match'
    )
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

      // upload avatar nếu có
      if (avatarFile) {
        avatarUrl = await uploadToCloudinary(
          avatarFile
        );
      }


      // REGISTER
      const registerResult =
        await dispatch(
          registerUser({
            name: data.name,
            email: data.email,
            password: data.password,
            avatarUrl: avatarUrl,
          })
        );


      // nếu register fail
      if (registerUser.rejected.match(registerResult)) {

        const errorMsg =
          registerResult.payload ||
          "Registration failed";

        setRegisterError(errorMsg);

        toast.error(errorMsg);

        return;
      }



      // LOGIN sau khi register
      const loginResult =
        await dispatch(
          loginUser({
            email: data.email,
            password: data.password,
          })
        );


      // nếu login fail
      if (loginUser.rejected.match(loginResult)) {

        const errorMsg =
          loginResult.payload ||
          "Login failed after registration";

        setRegisterError(errorMsg);

        toast.error(errorMsg);

        return;
      }


      // SUCCESS
      toast.success(
        "Registration and login successful!"
      );

      navigate('/');


    } catch (error) {

      console.error("REGISTER ERROR:", error);

      const errorMsg =
        error.message ||
        "Registration failed";

      setRegisterError(errorMsg);

      toast.error(errorMsg);

    } finally {

      setIsLoading(false);

    }
  };



  return (
    <div className="login-container">

      <div className="login-card">

        <div className="login-header">
          <h2>Create an Account</h2>
          <p>Join us to discover delicious food.</p>
        </div>



        <form
          onSubmit={handleSubmit(onSubmit)}
          className="login-form"
        >

          {registerError && (
            <div className="error-message global-error">
              {registerError}
            </div>
          )}



          {/* NAME */}

          <div className="form-group">

            <label htmlFor="name">
              Full Name
            </label>

            <input
              id="name"
              type="text"
              placeholder="Enter your full name"
              className={`form-input ${
                errors.name ? 'input-error' : ''
              }`}
              {...register('name')}
            />

            {errors.name && (
              <span className="error-message">
                {errors.name.message}
              </span>
            )}

          </div>



          {/* EMAIL */}

          <div className="form-group">

            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              className={`form-input ${
                errors.email ? 'input-error' : ''
              }`}
              {...register('email')}
            />

            {errors.email && (
              <span className="error-message">
                {errors.email.message}
              </span>
            )}

          </div>



          {/* PASSWORD */}

          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            register={register}
            error={errors.password}
          />


          {/* CONFIRM PASSWORD */}

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            placeholder="Confirm your password"
            register={register}
            error={errors.confirmPassword}
          />



          {/* AVATAR */}

          <div className="form-group">

            <label htmlFor="avatar">
              Avatar
            </label>

            <input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setAvatarFile(
                  e.target.files[0]
                )
              }
            />

          </div>



          {/* BUTTON */}

          <button
            type="submit"
            className="btn-submit"
            disabled={isLoading}
            style={{ marginTop: '0.5rem' }}
          >

            {isLoading
              ? 'Creating account...'
              : 'Sign Up'}

          </button>

        </form>



        <div className="login-footer">

          <p>
            Already have an account?{' '}

            <Link
              to="/login"
              className="register-link"
            >
              Sign in
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};


export default RegisterForm;
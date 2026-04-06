import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./PasswordInput.css";
const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  register // optional (react-hook-form)
}) => {

  const [showPassword, setShowPassword] = useState(false);

  // nếu có register → dùng react-hook-form
  const inputProps = register
    ? register(name)
    : {
        name,
        value,
        onChange
      };

  return (

    <div className="form-group">

      {label && (
        <label htmlFor={name}>
          {label}
        </label>
      )}

      <div className="password-wrapper">

        <input
          id={name}
          type={showPassword ? "text" : "password"}
          placeholder={placeholder}
          className={`form-input ${
            error ? "input-error" : ""
          }`}
          {...inputProps}
        />

        <span
          className="eye-icon"
          onClick={() =>
            setShowPassword(!showPassword)
          }
        >
          {showPassword
            ? <FaEyeSlash />
            : <FaEye />}
        </span>

      </div>

      {error && (
        <p className="error-text">
          {error}
        </p>
      )}

    </div>

  );

};

export default PasswordInput;
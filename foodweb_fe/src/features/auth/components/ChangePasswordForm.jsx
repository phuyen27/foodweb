import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changePassword } from "../authSlice";
import PasswordInput from "../../../components/PasswordInput";


const ChangePasswordForm = () => {

  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [errors, setErrors] = useState({});

  // ✅ realtime validation
  const validateField = (name, value) => {

    let error = "";

    if (name === "newPassword") {

      if (value.length < 6) {
        error = "Password must be at least 6 characters";
      }

    }

    if (name === "confirmPassword") {

      if (value !== formData.newPassword) {
        error = "Passwords do not match";
      }

    }

    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

  };

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    validateField(name, value);

  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      errors.newPassword ||
      errors.confirmPassword
    ) return;

    dispatch(changePassword({
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    }));

    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    });

  };

  return (

    <form onSubmit={handleSubmit} className="profile-form">

      {/* OLD PASSWORD */}

      <PasswordInput
        label="Current Password"
        name="oldPassword"
        value={formData.oldPassword}
        onChange={handleChange}
        placeholder="Enter current password"
      />

      {/* NEW PASSWORD */}

      <PasswordInput
        label="New Password"
        name="newPassword"
        value={formData.newPassword}
        onChange={handleChange}
        placeholder="Enter new password"
        error={errors.newPassword}
      />

      {/* CONFIRM PASSWORD */}

      <PasswordInput
        label="Confirm New Password"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={handleChange}
        placeholder="Confirm password"
        error={errors.confirmPassword}
      />

      <button
        type="submit"
        className="btn-submit"
        disabled={status === "loading"}
      >

        {status === "loading"
          ? "Updating password..."
          : "Update Password"}

      </button>

    </form>

  );

};

export default ChangePasswordForm;
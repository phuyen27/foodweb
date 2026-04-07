import React, { useState, useEffect } from 'react';

import {useDispatch,useSelector} from 'react-redux';
import { updateProfile }
from '../authSlice';


const ProfileForm = () => {
  const dispatch = useDispatch();
  const {
    user,
    profileStatus
  } = useSelector(
    (state) => state.auth
  );
  const [formData, setFormData] =
    useState({
      name: ''
    });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || ''
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } =
      e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value}));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile({
      name: formData.name
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="profile-form">

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          value={user?.email || ''}
          readOnly
          disabled
        />
      </div>

      <div className="form-group">
        <label>Your Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />

      </div>
      <button type="submit"
        className="btn-submit"
        disabled={ profileStatus === 'loading'}>
        {profileStatus === 'loading' ? 'Updating...': 'Save Changes'}
      </button>
    </form>
  );
};

export default ProfileForm;
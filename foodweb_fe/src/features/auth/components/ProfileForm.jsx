import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile, resetProfileStatus } from '../authSlice';
import { toast } from 'react-toastify';
const ProfileForm = () => {
  const dispatch = useDispatch();
  const { user, profileStatus } = useSelector((state) => state.auth);
  
  const [formData, setFormData] = useState({
    name: '',
    avtUrl: '',
    
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        avtUrl: user.avtUrl || ''
      });

      toast.success("Profile loaded successfully");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProfile(formData));
  };

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      <div className="form-group">
        <label htmlFor="email">Email (No can be changed)</label>
        <input 
          type="email" 
          id="email" 
          value={user?.email || user?.username || ''} 
          readOnly 
          disabled 
        />
      </div>
      <div className="form-group">
        <label htmlFor="fullName">Your Name</label>
        <input 
          type="text" 
          id="fullName" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Enter your full name"
        />
      </div>
     
      <button 
        type="submit" 
        className="btn-submit" 
        disabled={profileStatus === 'loading'}
      >
        {profileStatus === 'loading' ? 'Updating...' : 'Save Changes'}
      </button>
    </form>
  );
};

export default ProfileForm;

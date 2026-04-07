import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../components/ProfileForm';
import ChangePasswordForm from '../components/ChangePasswordForm';
import { updateProfile } from '../authSlice';
import { uploadToCloudinary } from '../../../utils/cloudinary';
import './ProfilePage.css';

const ProfilePage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('profile');
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setIsUploading(true);
        const url = await uploadToCloudinary(file);
        dispatch(updateProfile({ name: user.name, avatarUrl: url, avtUrl: url }));
      } catch (error) {
        console.error("Avatar upload failed:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;


  const formatDate = (dateString) => {

  if (!dateString) return "";

  const date = new Date(dateString);

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

};

  return (
    <div className="profile-container">
      <aside className="profile-sidebar">
        <div className="user-info-brief">
          <div 
            className="avatar-placeholder"
            onClick={() => !isUploading && fileInputRef.current?.click()}
            style={{ cursor: isUploading ? 'wait' : 'pointer', position: 'relative' }}
            title="Click to update avatar"
          >
            {isUploading && (
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.7)', borderRadius: '50%' }}>
                <span>...</span>
              </div>
            )}
            {user.avatarUrl ? (
              <img src={user.avatarUrl} alt="User Avatar" className="avatar-image" />
            ) : (
              <div className="avatar-initials">
                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}

           
            <input 
              type="file" 
              ref={fileInputRef} 
              style={{ display: 'none' }} 
              accept="image/*"
              onChange={handleAvatarChange} 
            />
          </div>
          <h3>{user.name ||  'User'}</h3>

           <p className="created-date">
            Joined: {formatDate(user.createdAt)}
          </p>
        </div>
        <button 
          className={`profile-tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('profile')}
        >
          Profile Information
        </button>
        <button 
          className={`profile-tab ${activeTab === 'password' ? 'active' : ''}`}
          onClick={() => setActiveTab('password')}
        >
          Change Password
        </button>
      </aside>
      
      <main className="profile-content">
        {activeTab === 'profile' && (
          <div className="fade-in">
            <h2 className="profile-title">My Profile</h2>
            <p className="profile-subtitle">
              Manage your profile information to keep your account secure
            </p>
            <ProfileForm />
          </div>
        )}

        {activeTab === 'password' && (
          <div className="fade-in">
            <h2 className="profile-title">Change Password</h2>
            <p className="profile-subtitle">
              To keep your account secure, please do not share your password with others
            </p>
            <ChangePasswordForm />
          </div>
        )}
      </main>
    </div>
  );
};

export default ProfilePage;

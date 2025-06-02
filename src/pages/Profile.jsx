import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import './../assets/css/style.css';
import defaultImage from './../assets/img/pic-icon.png';
import axiosInstance from '../utils/axiosInstance';

function Profile() {
  const [profileTab, setProfileTab] = useState(true);
  const [settingTab, setSettingTab] = useState(false);
  const [userData, setUserData] = useState({});
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userUsername: '',
    userGender: '',
    userPhoneNumber: '',
    profileImage: null
  });
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    repeatPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    oldPassword: false,
    newPassword: false,
    repeatPassword: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get('/user/profile');
        const data = res.data?.data;
        setUserData(data);
        setFormData({
          userName: data.userName || '',
          userEmail: data.userEmail || '',
          userUsername: data.userUsername || '',
          userGender: data.userGender || '',
          userPhoneNumber: data.userPhoneNumber || '',
          profileImage: null
        });
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };

    fetchProfile();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'profileImage') {
      setFormData({ ...formData, profileImage: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handlePasswordChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords({ ...showPasswords, [field]: !showPasswords[field] });
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      console.log('formData sebelum hantar:', formData);

      const form = new FormData();
      form.append('userName', formData.userName);
      form.append('userUsername', formData.userUsername);
      form.append('userGender', formData.userGender);
      form.append('userPhoneNumber', formData.userPhoneNumber);
      if (formData.profileImage instanceof File) {
        form.append('userProfileImage', formData.profileImage);
      }

      for (let pair of form.entries()) {
        console.log(pair[0]+ ': ' + pair[1]);
      }

      await axiosInstance.patch('/user/profile', form);
      alert('Profile updated successfully.');
    } catch (err) {
      console.error('Profile update failed:', err);
    }
  };

  const changePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.repeatPassword) {
      return alert("New password and confirmation don't match.");
    }
    try {
      const payload = {
        oldPassword: passwords.oldPassword,
        newPassword: passwords.newPassword,
        retypePassword: passwords.repeatPassword
      };
      const res = await axiosInstance.patch('/user/profile/password', payload);
      alert(res.data?.message || 'Password changed successfully.');
    } catch (err) {
      console.error('Password change failed:', err);
      alert('Failed to change password.');
    }
  };

  return (
    <Main>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="bg-white p-4 rounded shadow-sm">
              <ul className="nav nav-tabs mb-4 d-flex flex-column flex-md-row">
                <li className="nav-item flex-fill">
                  <a className={`nav-link cursor-pointer ${profileTab ? "active" : ""}`} onClick={() => { setProfileTab(true); setSettingTab(false); }} style={{ textAlign: "center", fontWeight: "bold" }}>
                    Profile
                  </a>
                </li>
                <li className="nav-item flex-fill">
                  <a className={`nav-link cursor-pointer ${settingTab ? "active" : ""}`} onClick={() => { setProfileTab(false); setSettingTab(true); }} style={{ textAlign: "center", fontWeight: "bold" }}>
                    Settings
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className={`tab-pane fade ${profileTab ? "show active" : ""}`} id="profileTab">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <p className="fw-bold">Account Information</p>
                      <label htmlFor="profileImageInput" className="profile-image-container">
                        <div
                          className="profile-pic mx-auto mb-3"
                          style={{
                            backgroundImage: `url(${defaultImage})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            position: "relative"
                          }}
                        >
                          <div className="change-image-text">Change Image</div>
                        </div>
                      </label>
                      <input
                        type="file"
                        id="profileImageInput"
                        name="profileImage"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFormChange}
                      />
                    </div>

                    <div className="col-md-8">
                      <form onSubmit={updateProfile}>
                        <div className="mb-3">
                          <div className="form-control-plaintext">{formData.userEmail}</div>
                        </div>
                        <div className="mb-3">
                          <input type="text" className="form-control" name="userName" placeholder="Fullname" value={formData.userName} onChange={handleFormChange} />
                        </div>
                        <div className="mb-3">
                          <input type="text" className="form-control" name="userUsername" placeholder="Username" value={formData.userUsername} onChange={handleFormChange} />
                        </div>
                        <div className="mb-3">
                          <select className="form-select" name="userGender" value={formData.userGender} onChange={handleFormChange}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                          </select>
                        </div>
                        <div className="mb-3">
                          <input type="tel" className="form-control" name="userPhoneNumber" placeholder="Phone Number" value={formData.userPhoneNumber} onChange={handleFormChange} />
                        </div>
                        <div className="text-end">
                          <button type="submit" className="btn btn-success px-4">Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className={`tab-pane fade ${settingTab ? "show active" : ""}`} id="settingTab">
                  <div className="row">
                    <div className="col-12">
                      <p className="fw-bold">Change Password</p>
                      <form onSubmit={changePassword}>
                        {['oldPassword', 'newPassword', 'repeatPassword'].map((field, index) => (
                          <div className="mb-3 position-relative" key={index}>
                            <input
                              type={showPasswords[field] ? "text" : "password"}
                              className="form-control"
                              name={field}
                              placeholder={{
                                oldPassword: "Old Password",
                                newPassword: "New Password",
                                repeatPassword: "Repeat Password"
                              }[field]}
                              value={passwords[field]}
                              onChange={handlePasswordChange}
                            />
                            <span
                              className="position-absolute top-50 end-0 translate-middle-y me-3"
                              style={{ cursor: "pointer" }}
                              onClick={() => togglePasswordVisibility(field)}
                            >
                              <i className={`bi ${showPasswords[field] ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </span>
                          </div>
                        ))}
                        <div className="text-end">
                          <button type="submit" className="btn btn-success px-4">Save</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default Profile;

import React, { useState, useEffect } from 'react';
import Main from '../components/Main';
import './../assets/css/style.css';
import defaultImage from './../assets/img/pic-icon.png';
import axiosInstance from '../utils/axiosInstance';

function Profile() {
  const [profileTab, setProfileTab] = useState(true);
  const [settingTab, setSettingTab] = useState(false);
  const [userData, setUserData] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    userEmail: '',
    userUsername: '',
    userGender: '',
    userPhoneNumber: '',
    nric: '',
    profileImage: null
  });
  const [formErrors, setFormErrors] = useState({});
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
  const [showRequestButton, setShowRequestButton] = useState(false);

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
          userGender: data.userGender ? data.userGender.charAt(0).toUpperCase() + data.userGender.slice(1).toLowerCase() : '',
          userPhoneNumber: data.userPhoneNumber || '',
          nric: data.nric || '',
          profileImage: data.userProfileImage || null
        });
        
        if (
          data.userRole?.roleName.toLowerCase() !== 'student' &&
          !data.isLecturerRequest &&
          !data.isAdminApprove
        ) {
          setShowRequestButton(false);
        } else {
          setShowRequestButton(false);
        }
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };
    fetchProfile();
  }, []);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormErrors({ ...formErrors, [name]: '' });
    if (name === 'profileImage') {
      const file = files[0];
      setFormData({ ...formData, profileImage: file });
      setPreviewImage(URL.createObjectURL(file));
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

  const validateForm = () => {
    const errors = {};
    if (!formData.userName) errors.userName = "Please enter your full name.";
    if (!formData.userUsername) errors.userUsername = "Please enter a username.";
    if (!formData.userGender) errors.userGender = "Please select your gender.";
    if (!formData.userPhoneNumber) errors.userPhoneNumber = "Please enter your phone number.";
    return errors;
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    const form = new FormData();
    form.append('userName', formData.userName);
    form.append('userUsername', formData.userUsername);
    form.append('userGender', formData.userGender);
    form.append('userPhone', formData.userPhoneNumber);
    form.append('nric', formData.nric);
    if (formData.profileImage instanceof File) {
      form.append('userProfileImage', formData.profileImage);
    }
    try {
      await axiosInstance.patch('/user/profile', form);
      alert('Profile updated successfully.');
      if (
        userData.userRole?.roleName.toLowerCase() !== 'student' &&
        !userData.isLecturerRequest &&
        !userData.isAdminApprove
      ) {
        setShowRequestButton(true);
      }
    } catch (err) {
      console.log("ERROR: ", err);
      const errors = err.response?.data?.errors || [];
      const newErrors = {};
      errors.forEach((e) => {
        newErrors[e.field] = e.message;
      });
      setFormErrors(newErrors);
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
      alert('Failed to change password.');
    }
  };

  const handleRequestRole = async () => {
    try {
      const res = await axiosInstance.patch(`/users/${userData.userId}/lecturers?request=true`);
      alert(res.data.message || "Request has been sent to the admin.");
      setShowRequestButton(false);
      setUserData(prev => ({ ...prev, isLecturerRequest: true }));
    } catch (error) {
      alert("Failed to send request. Please try again.");
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
                  <a
                    className={`nav-link cursor-pointer ${profileTab ? "active" : ""}`}
                    onClick={() => {
                      setProfileTab(true);
                      setSettingTab(false);
                    }}
                    style={{ textAlign: "center", fontWeight: "bold" }}>
                    Profile
                  </a>
                </li>
                <li className="nav-item flex-fill">
                  <a
                    className={`nav-link cursor-pointer ${settingTab ? "active" : ""}`}
                    onClick={() => {
                      setProfileTab(false);
                      setSettingTab(true);
                    }}
                    style={{ textAlign: "center", fontWeight: "bold" }}>
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
                            backgroundImage: `url(${previewImage ? previewImage : typeof formData.profileImage === "string" ? formData.profileImage : defaultImage})`,

                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            width: "150px",
                            height: "150px",
                            borderRadius: "50%",
                            cursor: "pointer",
                            position: "relative",
                          }}>
                          <div className="change-image-text">Change Image</div>
                        </div>
                      </label>
                      <input type="file" id="profileImageInput" name="profileImage" accept="image/*" style={{ display: "none" }} onChange={handleFormChange} />
                      {showRequestButton && !userData.isLecturerRequest && !userData.isAdminApprove && (
                        <div className="text-center mt-3">
                          <button className="btn btn-primary" onClick={handleRequestRole}>
                            Request
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="col-md-8">
                      <form onSubmit={updateProfile}>
                        <div className="mb-3">
                          <input type="text" className="form-control" placeholder="Email" value={formData.userEmail} readOnly/>
                        </div>
                        <div className="mb-3">
                          <input type="text" className="form-control" name="userName" placeholder="Fullname" value={formData.userName} onChange={handleFormChange} />
                          {formErrors.userName && <div style={{ color: "red" }}>{formErrors.userName}</div>}
                        </div>
                        <div className="mb-3">
                          <input type="text" className="form-control" name="userUsername" placeholder="Username" value={formData.userUsername} onChange={handleFormChange} />
                          {formErrors.userUsername && <div style={{ color: "red" }}>{formErrors.userUsername}</div>}
                        </div>
                        <div className="mb-3">
                          <input type="number" className="form-control" name="nric" placeholder="NRIC / IC Number" value={formData.nric} onChange={handleFormChange} />
                          {formErrors.nric && <div style={{ color: "red" }}>{formErrors.nric}</div>}
                        </div>
                        <div className="mb-3">
                          <select className="form-select" name="userGender" value={formData.userGender} onChange={handleFormChange}>
                            <option value="">Select Gender</option>
                            {["Male", "Female"].map((g, i) => (
                              <option key={i} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                          {formErrors.userGender && <div style={{ color: "red" }}>{formErrors.userGender}</div>}
                        </div>
                        <div className="mb-3">
                          <input type="tel" className="form-control" name="userPhoneNumber" placeholder="Phone Number" value={formData.userPhoneNumber} onChange={handleFormChange} />
                          {formErrors.userPhoneNumber && <div style={{ color: "red" }}>{formErrors.userPhoneNumber}</div>}
                        </div>
                        <div className="text-end">
                          <button type="submit" className="btn btn-success px-4">
                            Save
                          </button>
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
                        {["oldPassword", "newPassword", "repeatPassword"].map((field, index) => (
                          <div className="mb-3 position-relative" key={index}>
                            <input
                              type={showPasswords[field] ? "text" : "password"}
                              className="form-control"
                              name={field}
                              placeholder={
                                {
                                  oldPassword: "Old Password",
                                  newPassword: "New Password",
                                  repeatPassword: "Repeat Password",
                                }[field]
                              }
                              value={passwords[field]}
                              onChange={handlePasswordChange}
                            />
                            <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onClick={() => togglePasswordVisibility(field)}>
                              <i className={`bi ${showPasswords[field] ? "bi-eye-slash" : "bi-eye"}`}></i>
                            </span>
                          </div>
                        ))}
                        <div className="text-end">
                          <button type="submit" className="btn btn-success px-4">
                            Save
                          </button>
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

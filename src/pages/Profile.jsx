import React, { useState } from 'react';
import Main from '../components/Main';
import "./../assets/css/style.css";
import danial from "./../assets/img/WhatsApp Image 2025-04-23 at 23.23.29_8da8da99.jpg";

function Profile() {
  const [profileTab, setProfileTab] = useState(true);
  const [settingTab, setSettingTab] = useState(false);

  const showProfileTab = () => {
    setProfileTab(true);
    setSettingTab(false);
  };

  const showSettingTab = () => {
    setProfileTab(false);
    setSettingTab(true);
  };

  return (
    <Main>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="bg-white p-4 rounded shadow-sm">
              <ul className="nav nav-tabs mb-4 d-flex flex-column flex-md-row">
                <li className="nav-item flex-fill">
                  <a className={`nav-link cursor-pointer ${profileTab ? "active" : ""}`} onClick={showProfileTab} style={{ textAlign: "center", fontWeight: "bold" }}>
                    Profile
                  </a>
                </li>
                <li className="nav-item flex-fill">
                  <a className={`nav-link cursor-pointer ${settingTab ? "active" : ""}`} onClick={showSettingTab} style={{ textAlign: "center", fontWeight: "bold" }}>
                    Tetapan
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div className={`tab-pane fade ${profileTab ? "show active" : ""}`} id="profileTab">
                  <div className="row">
                    <div className="col-md-4 text-center">
                      <p className="fw-bold">Maklumat akaun</p>
                      <label htmlFor="profileImageInput" className="profile-image-container">
                        <div
                          className="profile-pic mx-auto mb-3"
                          style={{
                            backgroundImage: `url(${danial})`,
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
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file) {
                            const imageUrl = URL.createObjectURL(file);
                            document.querySelector(".profile-pic").style.backgroundImage = `url(${imageUrl})`;
                          }
                        }}
                      />
                    </div>

                    <div className="col-md-8">
                      <form>
                        <div className="mb-3">
                          <input type="text" className="form-control" placeholder="Nickname" />
                        </div>
                        <div className="mb-3">
                          <input type="email" className="form-control" placeholder="Email" />
                        </div>
                        <div className="mb-3">
                          <input type="text" className="form-control" placeholder="Username" />
                        </div>
                        <div className="mb-3">
                          <input type="text" className="form-control" placeholder="Jantina" />
                        </div>
                        <div className="mb-3">
                          <input type="tel" className="form-control" placeholder="Phone Number" />
                        </div>
                        <div className="text-end">
                          <button type="submit" className="btn btn-success px-4">Simpan</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                <div className={`tab-pane fade ${settingTab ? "show active" : ""}`} id="settingTab">
                  <div className="row">
                    <div className="col-12">
                      <p className="fw-bold">Ubah Kata Laluan</p>
                      <form>
                        {["oldPassword", "newPassword", "repeatPassword"].map((field, index) => {
                          const [show, setShow] = useState(false);
                          const placeholder = {
                            oldPassword: "Kata Laluan Lama",
                            newPassword: "Kata Laluan",
                            repeatPassword: "Ulang Kata Laluan"
                          }[field];

                          return (
                            <div className="mb-3 position-relative" key={index}>
                              <input
                                type={show ? "text" : "password"}
                                className="form-control"
                                id={field}
                                placeholder={placeholder}
                              />
                              <span
                                className="position-absolute top-50 end-0 translate-middle-y me-3"
                                style={{ cursor: "pointer" }}
                                onClick={() => setShow(!show)}
                              >
                                <i className={`bi ${show ? "bi-eye-slash" : "bi-eye"}`}></i>
                              </span>
                            </div>
                          );
                        })}
                        <div className="text-end">
                          <button type="submit" className="btn btn-success px-4">Simpan</button>
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

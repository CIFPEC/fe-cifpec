import React from 'react'
import Main from '../components/Main'
import "./../assets/css/style.css";
import danial from "./../assets/img/WhatsApp Image 2025-04-23 at 23.23.29_8da8da99.jpg";

function Profile() {
  const [profileTab, setProfileTab] = React.useState(true);
  const [settingTab, setSettingTab] = React.useState(false);

  function showProfileTab() {
    setProfileTab(true);
    setSettingTab(false);
  }
  function showSettingTab() {
    setProfileTab(false);
    setSettingTab(true);
  }

  return (
    <Main>
      <div className="container">
        <div className="d-flex justify-content-between mt-5">
          <div className="col-lg-8 col-md-10">
            <div className="container bg-white p-4 rounded shadow-sm">
              {/* <!-- Tabs --> */}
              <ul className="nav nav-tabs mb-4">
                <li className="nav-item">
                  <a className={`nav-link cursor-pointer ${profileTab ? "active" : ""}`} onClick={showProfileTab}>
                    Profile
                  </a>
                </li>
                <li className="nav-item">
                  <a className={`nav-link cursor-pointer ${settingTab ? "active" : ""}`} onClick={showSettingTab}>
                    Tetapan
                  </a>
                </li>
              </ul>

              {/* <!-- Tab Content --> */}
              <div className="tab-content">
                {/* <!-- Profile Tab --> */}
                <div className={`tab-pane fade ${profileTab ? "show active" : ""}`} id="profileTab">
                  <div className="row">
                    {/* <!-- Gambar Profil --> */}
                    <div className="col-md-4 text-center">
                      <p className="fw-bold">Maklumat akaun</p>
                      <div className="profile-pic mx-auto mb-3" style={{ backgroundImage: `url(${danial})` }}></div>
                    </div>

                    {/* <!-- Borang --> */}
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
                          <button type="submit" className="btn btn-success px-4">
                            Simpan
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>

                {/* <!-- Tetapan Tab --> */}
                <div className={`tab-pane fade ${settingTab ? "show active" : ""}`} id="settingTab">
                  <div className="row">
                    <div className="col-12">
                      <p className="fw-bold">Ubah Kata Laluan</p>
                      <form>
                        {/* <!-- Input Kata Laluan Lama --> */}
                        <div className="mb-3 position-relative">
                          <input type="password" className="form-control" id="oldPassword" placeholder="Kata Laluan Lama" />
                          <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onclick="togglePassword(this)" data-target="oldPassword">
                            <i className="bi bi-eye"></i>
                          </span>
                        </div>

                        {/* <!-- Input Kata Laluan Baharu --> */}
                        <div className="mb-3 position-relative">
                          <input type="password" className="form-control" id="newPassword" placeholder="Kata Laluan" />
                          <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onclick="togglePassword(this)" data-target="newPassword">
                            <i className="bi bi-eye"></i>
                          </span>
                        </div>

                        {/* <!-- Input Ulang Kata Laluan --> */}
                        <div className="mb-3 position-relative">
                          <input type="password" className="form-control" id="repeatPassword" placeholder="Ulang Kata Laluan" />
                          <span className="position-absolute top-50 end-0 translate-middle-y me-3" style={{ cursor: "pointer" }} onclick="togglePassword(this)" data-target="repeatPassword">
                            <i className="bi bi-eye"></i>
                          </span>
                        </div>

                        {/* <!-- Butang simpan di bawah semua input dan di penjuru kanan --> */}
                        <div className="text-end">
                          <button type="submit" className="btn btn-success px-4">
                            Simpan
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

export default Profile

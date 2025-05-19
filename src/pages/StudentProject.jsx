import React, { useState } from 'react';
import Main from '../components/Main';

function StudentProject() {
    const [activeTab, setActiveTab] = useState('kumpulan');

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    return (
        <Main>
            <div className="col-lg-7 col-md-4 mt-3 ms-0" style={{ backgroundColor: "#f5f5f5", borderRadius: "15px", padding: "20px" }}>
                <nav>
                    {/* Tabs (Responsive with Equal Width) */}
                    <ul className="nav nav-tabs mb-4 d-flex">
                        <li className="nav-item flex-fill">
                            <a
                                className={`nav-link cursor-pointer ${activeTab === 'kumpulan' ? 'active' : ''}`}
                                onClick={() => setActiveTab('kumpulan')}
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    backgroundColor: activeTab === 'kumpulan' ? "#007bff" : "transparent",
                                    color: activeTab === 'kumpulan' ? "#ffffff" : "#ff0066",
                                    borderRadius: "10px 10px 0 0",
                                    marginBottom: "-1px"
                                }}
                            >
                                Kumpulan
                            </a>
                        </li>
                        <li className="nav-item flex-fill">
                            <a
                                className={`nav-link cursor-pointer ${activeTab === 'projek' ? 'active' : ''}`}
                                onClick={() => setActiveTab('projek')}
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                    backgroundColor: activeTab === 'projek' ? "#007bff" : "transparent",
                                    color: activeTab === 'projek' ? "#ffffff" : "#ff0066",
                                    borderRadius: "10px 10px 0 0",
                                    marginBottom: "-1px"
                                }}
                            >
                                Projek
                            </a>
                        </li>
                    </ul>
                </nav>


                <div className="tab-content" id="nav-tabContent">
                    {/* Bina Kumpulan Tab */}
                    {activeTab === 'kumpulan' && (
                        <div className="tab-pane fade show active shadow p-4" style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
                            <h5 className="fw-bold">Bina Kumpulan</h5>
                            <form>
                                <div className="mb-3">
                                    <input type="text" className="form-control" placeholder="Nama Projek" />
                                </div>
                                <p>Nama Kumpulan</p>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <select className="form-select">
                                            <option value="" disabled selected>Pilih User</option>
                                            <option value="user1">User 1</option>
                                            <option value="user2">User 2</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <select className="form-select">
                                            <option value="" disabled selected>Pilih User</option>
                                            <option value="user1">User 1</option>
                                            <option value="user2">User 2</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12 mb-3">
                                        <select className="form-select">
                                            <option value="" disabled selected>Pilih User</option>
                                            <option value="user1">User 1</option>
                                            <option value="user2">User 2</option>
                                        </select>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-success px-4">Simpan</button>
                            </form>
                        </div>
                    )}

                    {/* Maklumat Projek Tab */}
                    {activeTab === 'projek' && (
                        <div className="tab-pane fade show active shadow p-4" style={{ backgroundColor: "#ffffff", borderRadius: "15px" }}>
                            <h5 className="fw-bold">Maklumat Projek</h5>
                            <form>
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" placeholder="Nama Projek" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <select className="form-select">
                                            <option value="">Kursus</option>
                                            <option value="kursus1">Automatif</option>
                                            <option value="kursus2"></option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" placeholder="Nama Ahli 1" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <select className="form-select">
                                            <option value="" disabled selected>Bidang</option>
                                            <option value="bidang1">Bidang 1</option>
                                            <option value="bidang2">Bidang 2</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" placeholder="Nama Ahli 2" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" placeholder="Nama Penyelia" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" placeholder="Nama Ahli 3" />
                                    </div>
                                    <div className="slide-poster-row">
                                        <div className="upload-group">
                                            <label className="form-label fw-bold">Slide</label>
                                            <div className="input-group">
                                                <button className="btn btn-secondary" type="button">Upload</button>
                                                <input type="file" className="form-control" accept=".pdf" />
                                            </div>
                                            <small className="text-muted fst-italic">Sila upload slide anda dalam bentuk PDF</small>
                                        </div>

                                        <div className="upload-group">
                                            <label className="form-label fw-bold">Poster</label>
                                            <div className="input-group">
                                                <button className="btn btn-secondary" type="button">Upload</button>
                                                <input type="file" className="form-control" accept=".pdf" />
                                            </div>
                                            <small className="text-muted fst-italic">Sila upload poster anda dalam bentuk PDF</small>
                                        </div>
                                    </div>
                                </div>
                                <div className="submit-button">
                                    <button type="submit" className="btn btn-success px-4">Submit</button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </Main>
    );
}

export default StudentProject;

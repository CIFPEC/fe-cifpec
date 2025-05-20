import React, { useState } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';

function SetupBatch() {
  const navigate = useNavigate();

  const [batchName, setBatchName] = useState('');
  const [course, setCourse] = useState('');
  const [status, setStatus] = useState('active');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBatch = {
      name: batchName,
      course: course,
      status: status
    };

    // Simpan dalam sessionStorage
    sessionStorage.setItem('newBatch', JSON.stringify(newBatch));

    // Navigate ke Batch tanpa guna state
    navigate('/dashboard/batch');
  };

    return (
        <Main>
            <div className="container-fluid py-4">
                <div className="row">
                    <div className="col-12">
                        <div className="card">
                            <div className>
                                <div className="p-3">
                                    <h6 className="mb-3">Setup Project Requirement</h6>

                                    <form onSubmit={handleSubmit}>
                                        {/* <!-- Batch Name and Course Name --> */}
                                        <div className="row mb-3">
                                            <div className="col-md-6">
                                                <label className="form-label">Batch Name</label>
                                                <input type="text" className="form-control" placeholder="Enter batch name"
                                                    value={batchName}
                                                    onChange={(e) => setBatchName(e.target.value)}
                                                />
                                            </div>
                                            <div className="col-md-6">
                                                <label className="form-label">Course Name</label>
                                                <select className="form-select"
                                                    value={course}
                                                    onChange={(e) => setCourse(e.target.value)}
                                                >
                                                    <option>Select course</option>
                                                    <option value="IT">IT</option>
                                                    <option value="Meka">Meka</option>
                                                    <option value="Puan">Puan</option>
                                                </select>
                                            </div>
                                        </div>

                                        {/* <!-- Advance Optional --> */}
                                        <div className="mb-3 d-flex align-items-center">
                                            <label className="form-label me-2">Advance (Optional)</label>
                                            <input type="checkbox" className="form-check-input me-2" id="advanceToggle" />
                                            <label htmlFor="advanceToggle" className="form-check-label">Enable</label>
                                        </div>

                                        {/* <!-- Date Last Update --> */}
                                        <div className="mb-3">
                                            <label className="form-label">Date - Last Update</label>
                                            <input type="date" className="form-control" />
                                        </div>

                                        {/* <!-- Project Requirement Fields --> */}
                                        <div id="project-requirements">

                                            {/* Project Name */}
                                            <div className="row mb-2 align-items-center">
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" value="Project name" readOnly />
                                                </div>
                                                <div className="col-md-2">
                                                    <input type="text" className="form-control" value="text" readOnly />
                                                </div>
                                                <div className="col-md-1 text-center">
                                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Required</label>
                                                </div>
                                                <div className="col-md-1">
                                                    <button className="btn btn-outline-danger btn-sm">−</button>
                                                </div>
                                            </div>

                                            {/* Slide */}
                                            <div className="row mb-2 align-items-center">
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" value="Slide" readOnly />
                                                </div>
                                                <div className="col-md-2">
                                                    <input type="text" className="form-control" value="file" readOnly />
                                                </div>
                                                <div className="col-md-1 text-center">
                                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Required</label>
                                                </div>
                                                <div className="col-md-1">
                                                    <button className="btn btn-outline-danger btn-sm">−</button>
                                                </div>
                                            </div>

                                            {/* Poster */}
                                            <div className="row mb-2 align-items-center">
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" value="Poster" readOnly />
                                                </div>
                                                <div className="col-md-2">
                                                    <input type="text" className="form-control" value="file" readOnly />
                                                </div>
                                                <div className="col-md-1 text-center">
                                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Required</label>
                                                </div>
                                                <div className="col-md-1">
                                                    <button className="btn btn-outline-danger btn-sm">−</button>
                                                </div>
                                            </div>

                                            {/* Penyelia */}
                                            <div className="row mb-3 align-items-center">
                                                <div className="col-md-4">
                                                    <input type="text" className="form-control" value="Penyelia" readOnly />
                                                </div>
                                                <div className="col-md-2">
                                                    <input type="text" className="form-control" value="text" readOnly />
                                                </div>
                                                <div className="col-md-1 text-center">
                                                    <input className="form-check-input" type="checkbox" defaultChecked />
                                                </div>
                                                <div className="col-md-2">
                                                    <label>Required</label>
                                                </div>
                                                <div className="col-md-1">
                                                    <button className="btn btn-outline-danger btn-sm">−</button>
                                                </div>
                                            </div>

                                            {/* Add new requirement row */}
                                            <div className="text-end mb-3">
                                                <button type="button" className="btn btn-outline-primary btn-sm">＋</button>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="d-flex justify-content-between">
                                            <button type="reset" className="btn btn-secondary">Reset Default</button>
                                            <div>
                                                <button type="button" className="btn btn-outline-light me-2">Preview</button>
                                                <button type="submit" className="btn btn-primary">Save</button>
                                            </div>
                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Main>
    )
}

export default SetupBatch

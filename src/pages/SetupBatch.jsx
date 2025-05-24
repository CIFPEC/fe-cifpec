import React, { useState } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

function SetupBatch() {
  const navigate = useNavigate();

  const [batchName, setBatchName] = useState('');
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState('active');
  const [isAdvanceEnabled, setIsAdvanceEnabled] = useState(false);
  const [lastUpdate, setLastUpdate] = useState('');
  const [showAdvance, setShowAdvance] = useState(false);
  const [requirements, setRequirements] = useState([]);

  const courseOptions = [
    { value: 'IT', label: 'IT' },
    { value: 'Meka', label: 'Meka' },
    { value: 'Pembuatan', label: 'Pembuatan' },
    { value: 'Automotif', label: 'Automotif' },
    { value: 'Telekomunikasi', label: 'Telekomunikasi' }
  ];

  const handleAddRequirement = () => {
    setRequirements([
      ...requirements,
      { name: '', type: 'text', required: false }
    ]);
  };

  const handleRemoveRequirement = (index) => {
    const updated = [...requirements];
    updated.splice(index, 1);
    setRequirements(updated);
  };

  const handleRequirementChange = (index, field, value) => {
    const updated = [...requirements];
    updated[index][field] = value;
    setRequirements(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBatch = {
      name: batchName,
      course: courses,
      status: status,
      lastUpdate: isAdvanceEnabled ? lastUpdate : null,
      requirements: requirements,
    };

    sessionStorage.setItem('newBatch', JSON.stringify(newBatch));
    navigate('/dashboard/batch');
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="card">
              <div className="p-3">
                <h6 className="mb-3">Setup Project Requirement</h6>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label className="form-label">Batch Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter batch name"
                        value={batchName}
                        onChange={(e) => setBatchName(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Course Name</label>
                      <Select
                        isMulti
                        options={courseOptions}
                        value={courseOptions.filter(opt => courses.includes(opt.value))}
                        onChange={(selected) => setCourses(selected.map(item => item.value))}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <div
                      className="d-flex justify-content-between align-items-center bg-light p-2 rounded"
                      style={{ cursor: 'pointer' }}
                      onClick={() => setShowAdvance(!showAdvance)}
                    >
                      <strong>Advance Settings (Optional)</strong>
                      <span>{showAdvance ? '−' : '+'}</span>
                    </div>

                    {showAdvance && (
                      <div className="mt-3 px-2">
                        <div className="form-check form-switch mb-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="advanceToggle"
                            checked={isAdvanceEnabled}
                            onChange={(e) => setIsAdvanceEnabled(e.target.checked)}
                          />
                          <label className="form-check-label" htmlFor="advanceToggle">
                            {isAdvanceEnabled ? 'Enabled' : 'Disabled'}
                          </label>
                        </div>
                        {isAdvanceEnabled && (
                          <div className="mb-3">
                            <label className="form-label">Date - Last Update</label>
                            <input
                              type="date"
                              className="form-control form-control-sm w-100 w-md-25"
                              value={lastUpdate}
                              onChange={(e) => setLastUpdate(e.target.value)}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div id="project-requirements" className="mb-4 ms-1">
                    {requirements.length === 0 ? (
                      <>
                        <p className="text-muted">No requirement fields available</p>
                        <button
                          type="button"
                          className="btn btn-outline-primary btn-sm"
                          onClick={handleAddRequirement}
                        >
                          ＋ Add Requirement
                        </button>
                      </>
                    ) : (
                      requirements.map((req, index) => (
                        <div key={index} className="row mb-2 align-items-center">
                          <div className="col-md-4">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Requirement name"
                              value={req.name}
                              onChange={(e) => handleRequirementChange(index, 'name', e.target.value)}
                            />
                          </div>
                          <div className="col-md-2">
                            <select
                              className="form-select"
                              value={req.type}
                              onChange={(e) => handleRequirementChange(index, 'type', e.target.value)}
                            >
                              <option value="text">text</option>
                              <option value="file">file</option>
                            </select>
                          </div>
                          <div className="col-md-2">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`requiredToggle-${index}`}
                                checked={req.required}
                                onChange={(e) => handleRequirementChange(index, 'required', e.target.checked)}
                              />
                              <label className="form-check-label" htmlFor={`requiredToggle-${index}`}>
                                {req.required ? 'Required' : 'Optional'}
                              </label>
                            </div>
                          </div>
                          <div className="col-md-2 d-flex gap-2">
                            <button
                              type="button"
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleRemoveRequirement(index)}
                            >
                              −
                            </button>
                            {index === requirements.length - 1 && (
                              <button
                                type="button"
                                className="btn btn-outline-primary btn-sm"
                                onClick={handleAddRequirement}
                              >
                                ＋
                              </button>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="d-flex justify-content-end">
                    <div>
                      <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default SetupBatch;

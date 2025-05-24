import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';

function StudentProject() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [course, setCourse] = useState('');
  const [groupMembers, setGroupMembers] = useState(['', '', '']);
  const [supervisor, setSupervisor] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [requirementValues, setRequirementValues] = useState({});

  useEffect(() => {
    const kumpulanData = JSON.parse(sessionStorage.getItem('kumpulanData'));
    if (kumpulanData) {
      setProjectName(kumpulanData.projectName || '');
      setGroupMembers(kumpulanData.groupMembers || ['', '', '']);
      setSupervisor(kumpulanData.supervisor || '');
    }
    const batchData = JSON.parse(sessionStorage.getItem('newBatch'));
    if (batchData && batchData.requirements) {
      setRequirements(batchData.requirements);
    }
  }, []);

  const handleRequirementChange = (label, value) => {
    setRequirementValues(prev => ({ ...prev, [label]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectList = JSON.parse(sessionStorage.getItem('projectList')) || [];
    const newProject = {
      projectName,
      course,
      groupMembers,
      supervisor,
      requirements: requirementValues,
      status: 'Dalam Proses'
    };
    projectList.push(newProject);
    sessionStorage.setItem('projectList', JSON.stringify(projectList));
    sessionStorage.removeItem('kumpulanData');
    setIsSubmitted(true);
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="tab-pane fade show active shadow p-4 rounded bg-white">
              <h5 className="fw-bold">Maklumat Projek</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Projek"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      readOnly={isSubmitted}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <select
                      className="form-select"
                      value={course}
                      onChange={(e) => setCourse(e.target.value)}
                      disabled={isSubmitted}
                    >
                      <option value="">Kursus</option>
                      <option value="Automotif">Automotif</option>
                      <option value="IT">IT</option>
                      <option value="Meka">Meka</option>
                      <option value="Pembuatan">Pembuatan</option>
                      <option value="Telekomunikasi">Telekomunikasi</option>
                    </select>
                  </div>
                  {groupMembers.map((member, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Nama Ahli ${index + 1}`}
                        value={member}
                        onChange={(e) => {
                          const updated = [...groupMembers];
                          updated[index] = e.target.value;
                          setGroupMembers(updated);
                        }}
                        readOnly={isSubmitted}
                      />
                    </div>
                  ))}
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Penyelia"
                      value={supervisor}
                      onChange={(e) => setSupervisor(e.target.value)}
                      readOnly={isSubmitted}
                    />
                  </div>
                </div>

                {/* Dynamic Requirement Fields */}
                {requirements.length > 0 && (
                  <div className="mt-4">
                    <h6 className="fw-bold">Maklumat Tambahan</h6>
                    {requirements.map((req, index) => (
                      <div className="mb-3" key={index}>
                        <label className="form-label fw-bold">{req.name}</label>
                        {req.type === 'text' ? (
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`Isi ${req.name}`}
                            value={requirementValues[req.name] || ''}
                            onChange={(e) => handleRequirementChange(req.name, e.target.value)}
                            readOnly={isSubmitted}
                          />
                        ) : (
                          <input
                            type="file"
                            className="form-control"
                            accept=".pdf"
                            onChange={(e) => handleRequirementChange(req.name, e.target.files[0])}
                            disabled={isSubmitted}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="d-flex justify-content-between">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => navigate('/dashboard/projectlist')}>
                    Back to Project List
                  </button>
                  <button type="submit" className="btn btn-success px-4" disabled={isSubmitted}>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Main>
  );
}

export default StudentProject;

import React, { useEffect, useState } from 'react';
import Main from '../components/Main';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function StudentProject() {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState('');
  const [courseName, setCourseName] = useState('');
  const [groupMembers, setGroupMembers] = useState(['', '', '']);
  const [supervisor, setSupervisor] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [requirements, setRequirements] = useState([]);
  const [requirementValues, setRequirementValues] = useState({});

  const token = localStorage.getItem('accessToken');
  const decoded = token ? jwtDecode(token) : {};
  const courseId = decoded?.courseId;

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

    const courseList = {
      1: 'Web Development',
      2: 'Networking',
      3: 'Game Development',
      4: 'Automotive',
      5: 'Mechatronic',
      6: 'Manufacturing'
    };
    setCourseName(courseList[courseId] || '');
  }, [courseId]);

  const handleRequirementChange = (label, value) => {
    setRequirementValues(prev => ({ ...prev, [label]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectList = JSON.parse(sessionStorage.getItem('projectList')) || [];
    const newProject = {
      projectName,
      course: courseName,
      groupMembers,
      supervisor,
      requirements: requirementValues,
      status: 'Dalam Proses'
    };
    projectList.push(newProject);
    sessionStorage.setItem('projectList', JSON.stringify(projectList));
    sessionStorage.removeItem('kumpulanData');
    setIsSubmitted(true);
    navigate('/dashboard/projectlist');
  };

  return (
    <Main>
      <div className="container-fluid py-4">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="tab-pane fade show active shadow p-4 rounded bg-white">
              <h5 className="fw-bold">Update Projek</h5>
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
                    <input
                      type="text"
                      className="form-control"
                      value={courseName}
                      readOnly
                    />
                  </div>
                  {groupMembers.map((member, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Nama Ahli ${index + 1}`}
                        value={member}
                        readOnly
                      />
                    </div>
                  ))}
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Nama Penyelia"
                      value={supervisor}
                      readOnly
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
